"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ClaudeError,
  QUIZ_PASS,
  explainTerm,
  generateIntro,
  generateQuiz,
} from "@/lib/claude";
import { config } from "@/lib/config";
import { dayKey } from "@/lib/dates";
import { readDb, updateDb, type GlossaryEntry, type Intro, type Level, type Paper } from "@/lib/db";
import { USER_COOKIE, requireUser } from "@/lib/session";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function knownPaper(paperId: string): Promise<Paper> {
  const paper = (await readDb()).papers[paperId];
  if (!paper) throw new Error("Unbekanntes Paper");
  return paper;
}

// Server Actions mask thrown errors in production, so Claude errors are
// returned as values the UI can show.
async function guard<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    if (err instanceof ClaudeError) return { ok: false, error: err.message };
    console.error(err);
    return { ok: false, error: "Da ist etwas schiefgegangen. Details stehen im Server-Log." };
  }
}

export async function login(formData: FormData) {
  const name = String(formData.get("user") ?? "");
  if (!config.users.includes(name)) redirect("/login");
  (await cookies()).set(USER_COOKIE, name, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect("/");
}

export async function logout() {
  (await cookies()).delete(USER_COOKIE);
  redirect("/login");
}

export async function loadIntro(paperId: string): Promise<Result<Intro>> {
  await requireUser();
  return guard(async () => {
    const paper = await knownPaper(paperId);
    if (paper.intro) return paper.intro;
    const intro = await generateIntro(paper);
    await updateDb((db) => {
      db.papers[paperId].intro = intro;
    });
    return intro;
  });
}

export async function explain(
  paperId: string,
  term: string,
  context: string,
): Promise<Result<GlossaryEntry>> {
  const user = await requireUser();
  return guard(async () => {
    const paper = await knownPaper(paperId);
    const cleanTerm = term.trim().slice(0, 200);
    if (!cleanTerm) throw new ClaudeError("Bitte einen Begriff eingeben.");
    const { erklaerung, uebersetzung } = await explainTerm(paper, cleanTerm, context.trim().slice(0, 1000));
    const entry: GlossaryEntry = {
      term: cleanTerm,
      explanation: erklaerung,
      translation: uebersetzung,
      paperId,
      at: new Date().toISOString(),
    };
    await updateDb((db) => {
      (db.glossary[user] ??= []).push(entry);
    });
    revalidatePath("/glossar");
    return entry;
  });
}

export type QuizView = { frage: string; optionen: string[] }[];

export async function loadQuiz(paperId: string, level: Level): Promise<Result<QuizView>> {
  await requireUser();
  return guard(async () => {
    const paper = await knownPaper(paperId);
    let questions = paper.quizzes?.[level];
    if (!questions) {
      const generated = await generateQuiz(paper, level);
      questions = generated;
      await updateDb((db) => {
        (db.papers[paperId].quizzes ??= {})[level] = generated;
      });
    }
    // Answers stay on the server until the quiz is submitted.
    return questions.map(({ frage, optionen }) => ({ frage, optionen }));
  });
}

export type QuizResult = {
  score: number;
  total: number;
  passed: boolean;
  needed: number;
  details: { correct: boolean; richtigeAntwort: number; erklaerung: string }[];
};

export async function submitQuiz(
  paperId: string,
  level: Level,
  answers: number[],
): Promise<Result<QuizResult>> {
  const user = await requireUser();
  return guard(async () => {
    const questions = (await knownPaper(paperId)).quizzes?.[level];
    if (!questions) throw new ClaudeError("Quiz nicht gefunden. Bitte neu laden.");
    const details = questions.map((q, i) => ({
      correct: answers[i] === q.richtigeAntwort,
      richtigeAntwort: q.richtigeAntwort,
      erklaerung: q.erklaerung,
    }));
    const score = details.filter((d) => d.correct).length;
    const passed = score >= QUIZ_PASS[level];
    if (passed) {
      await updateDb((db) => {
        db.reads.push({
          user,
          paperId,
          date: dayKey(),
          level,
          score,
          total: questions.length,
          at: new Date().toISOString(),
        });
      });
      revalidatePath("/", "layout");
    }
    return { score, total: questions.length, passed, needed: QUIZ_PASS[level], details };
  });
}

export async function saveNote(paperId: string, formData: FormData) {
  const user = await requireUser();
  await knownPaper(paperId);
  await updateDb((db) => {
    (db.notes[user] ??= {})[paperId] = {
      takeaway: String(formData.get("takeaway") ?? "").slice(0, 2000),
      question: String(formData.get("question") ?? "").slice(0, 1000),
      updatedAt: new Date().toISOString(),
    };
  });
  revalidatePath(`/paper/${paperId}`);
  revalidatePath("/bibliothek");
}
