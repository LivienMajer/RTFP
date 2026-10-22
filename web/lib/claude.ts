import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { pdfUrl } from "./arxiv";
import { config } from "./config";
import type { Intro, Level, Paper, QuizQuestion } from "./db";

const client = new Anthropic();

// Shared by every call so the system prompt + paper PDF form a stable,
// cacheable prefix; only the task text after the document changes.
const SYSTEM = `Du bist der Lesebegleiter von RTFP, einer Gruppe von Informatik-Studierenden, die täglich ein wissenschaftliches Paper lesen.
Die Leser*innen sind keine Expert*innen im Fachgebiet des Papers und lesen Englisch als Fremdsprache.
Antworte immer auf Deutsch, einfach und konkret, ohne Fachbegriffe vorauszusetzen. Halte dich an den Inhalt des Papers und erfinde nichts dazu.`;

export class ClaudeError extends Error {}

function schemaFor(schema: z.ZodType) {
  const json = z.toJSONSchema(schema) as Record<string, unknown>;
  delete json.$schema;
  return json;
}

async function ask<T>(
  paper: Paper,
  task: string,
  schema: z.ZodType<T>,
  effort: "low" | "medium",
): Promise<T> {
  let response;
  try {
    response = await client.beta.messages.create({
      model: config.model,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort, format: { type: "json_schema", schema: schemaFor(schema) } },
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "url", url: pdfUrl(paper.id) },
              title: paper.title,
              cache_control: { type: "ephemeral" },
            },
            { type: "text", text: task },
          ],
        },
      ],
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      throw new ClaudeError("Kein gültiger Claude-API-Key. Prüfe ANTHROPIC_API_KEY in web/.env.local.");
    }
    if (err instanceof Anthropic.RateLimitError) {
      throw new ClaudeError("Claude ist gerade ausgelastet. Versuch es gleich nochmal.");
    }
    if (err instanceof Anthropic.APIError) {
      throw new ClaudeError(`Claude-Fehler ${err.status}: ${err.message}`);
    }
    // Connection problems, or no credentials at all (the SDK throws a plain Error then)
    const message = err instanceof Error ? err.message : String(err);
    throw new ClaudeError(`Claude ist nicht erreichbar oder nicht eingerichtet (${message}). Siehe web/.env.example.`);
  }

  if (response.stop_reason === "refusal") {
    throw new ClaudeError("Claude hat diese Anfrage abgelehnt.");
  }
  if (response.stop_reason === "max_tokens") {
    throw new ClaudeError("Die Antwort war zu lang und wurde abgeschnitten. Bitte nochmal versuchen.");
  }
  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  const parsed = schema.safeParse(JSON.parse(text));
  if (!parsed.success) throw new ClaudeError("Claude hat ein unerwartetes Format geliefert.");
  return parsed.data;
}

const IntroSchema = z.strictObject({
  worumGehts: z.string(),
  warumWichtig: z.string(),
  wasIstNeu: z.string(),
  voraussetzungen: z.array(z.string()),
  lesezeitMinuten: z.number().int(),
  schwierigkeit: z.number().int(),
  fachbegriffe: z.array(z.strictObject({ begriff: z.string(), erklaerung: z.string() })),
});

export async function generateIntro(paper: Paper): Promise<Intro> {
  const intro = await ask(
    paper,
    `Schreib eine verständliche Einführung zu diesem Paper, die leichter zu lesen ist als das Abstract:
- worumGehts: 2–3 einfache Sätze, worum es geht.
- warumWichtig: welches Problem gelöst wird und warum das relevant ist.
- wasIstNeu: der zentrale Beitrag im Vergleich zu vorher.
- voraussetzungen: 2–4 Dinge, die man vorher grob kennen sollte.
- lesezeitMinuten: geschätzte Zeit, um das ganze Paper aufmerksam zu lesen.
- schwierigkeit: 1 (leicht) bis 5 (sehr schwer) für Informatik-Studierende im Bachelor.
- fachbegriffe: die 5–8 wichtigsten Fachbegriffe aus dem Paper mit je einer kurzen Erklärung.`,
    IntroSchema,
    "medium",
  );
  return { ...intro, schwierigkeit: Math.min(5, Math.max(1, intro.schwierigkeit)) };
}

const ExplainSchema = z.strictObject({ erklaerung: z.string(), uebersetzung: z.string() });

export async function explainTerm(paper: Paper, term: string, context: string) {
  return ask(
    paper,
    `Erkläre den Begriff oder die Stelle „${term}“ so, wie sie in diesem Paper gemeint ist.${
      context ? `\nDie Stelle, an der ich hängen geblieben bin: „${context}“` : ""
    }
- erklaerung: 2–4 Sätze, verständlich, mit einem kleinen Beispiel wenn hilfreich.
- uebersetzung: falls es ein englisches Wort oder eine Wendung ist, die deutsche Übersetzung; sonst ein leerer String.`,
    ExplainSchema,
    "low",
  );
}

const QuizSchema = z.strictObject({
  fragen: z.array(
    z.strictObject({
      frage: z.string(),
      optionen: z.array(z.string()),
      richtigeAntwort: z.number().int(),
      erklaerung: z.string(),
    }),
  ),
});

export const QUIZ_SIZE: Record<Level, number> = { kurz: 3, ganz: 5 };
export const QUIZ_PASS: Record<Level, number> = { kurz: 2, ganz: 4 };

export async function generateQuiz(paper: Paper, level: Level): Promise<QuizQuestion[]> {
  const scope =
    level === "kurz"
      ? "Die Fragen prüfen nur die Kernaussage, das Problem und den Hauptbeitrag. Man muss sie nach dem Lesen von Einführung und Abstract beantworten können."
      : "Die Fragen prüfen, ob das ganze Paper gelesen und verstanden wurde: Methode, wichtige Designentscheidungen und Ergebnisse. Keine Fragen nach einzelnen Zahlen oder Tabellenwerten.";
  const { fragen } = await ask(
    paper,
    `Erstelle ein Quiz mit genau ${QUIZ_SIZE[level]} Multiple-Choice-Fragen zu diesem Paper.
${scope}
- Jede Frage hat genau 4 Optionen, genau eine ist richtig, die falschen sind plausibel.
- richtigeAntwort: Index (0–3) der richtigen Option. Verteile die richtigen Antworten auf verschiedene Positionen.
- erklaerung: 1–2 Sätze, warum die richtige Antwort stimmt.`,
    QuizSchema,
    "medium",
  );
  const valid = fragen.filter(
    (f) => f.optionen.length === 4 && f.richtigeAntwort >= 0 && f.richtigeAntwort < 4,
  );
  if (valid.length < QUIZ_SIZE[level]) throw new ClaudeError("Das Quiz war unvollständig. Bitte nochmal versuchen.");
  return valid.slice(0, QUIZ_SIZE[level]);
}
