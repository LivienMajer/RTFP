import fs from "node:fs/promises";
import {
  Client,
  Events,
  GatewayIntentBits,
  MessageFlags,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";

// RTFP Discord bot: the daily trigger (B7) and the group's accountability.
// It reads everything from the web app's /api/bot/status endpoint.

const env = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") throw new Error(`Missing env var ${name} (see .env.example)`);
  return value;
};

const cfg = {
  discordToken: env("DISCORD_TOKEN"),
  guildId: env("DISCORD_GUILD_ID"),
  channelId: env("DISCORD_CHANNEL_ID"),
  webUrl: env("RTFP_URL", "http://localhost:3000").replace(/\/$/, ""),
  botToken: env("RTFP_BOT_TOKEN"),
  reminderTime: env("REMINDER_TIME", "18:00"),
  lateReminderTime: env("LATE_REMINDER_TIME", "21:30"),
  timeZone: env("RTFP_TIMEZONE", "Europe/Berlin"),
  // "Livien:1234,Daniel:5678" maps RTFP names to Discord user IDs for mentions
  discordIds: Object.fromEntries(
    (process.env.DISCORD_USER_IDS ?? "")
      .split(",")
      .map((pair) => pair.split(":").map((s) => s.trim()))
      .filter((p) => p.length === 2 && p[0] && p[1]),
  ) as Record<string, string>,
};

type UserProgress = {
  user: string;
  readToday: boolean;
  streak: number;
  thisWeek: number;
  weeklyGoal: number;
  current: { arxivId: string; title: string; position: number } | null;
  pathLength: number;
};

type Status = {
  date: string;
  path: string;
  users: UserProgress[];
  reads: { user: string; paperId: string; title: string; level: string; score: number; total: number; at: string; streak: number }[];
};

type State = { lastReadAt: string; remindedOn: string; lateRemindedOn: string };

const STATE_FILE = new URL("../state.json", import.meta.url);

async function loadState(): Promise<State> {
  try {
    return JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
  } catch {
    // First start: don't replay old reads.
    return { lastReadAt: new Date().toISOString(), remindedOn: "", lateRemindedOn: "" };
  }
}

async function saveState(state: State) {
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

async function fetchStatus(since = ""): Promise<Status> {
  const res = await fetch(`${cfg.webUrl}/api/bot/status?since=${encodeURIComponent(since)}`, {
    headers: { authorization: `Bearer ${cfg.botToken}` },
  });
  if (!res.ok) throw new Error(`RTFP web app answered ${res.status}: ${await res.text()}`);
  return res.json() as Promise<Status>;
}

const mention = (user: string) => (cfg.discordIds[user] ? `<@${cfg.discordIds[user]}>` : `**${user}**`);

function nowHHMM(): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: cfg.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function statusLines(status: Status): string {
  return status.users
    .map((u) => {
      const icon = u.readToday ? "✅" : "⏳";
      const paper = u.current
        ? `[${u.current.title}](${cfg.webUrl}/paper/${u.current.arxivId}) (${u.current.position}/${u.pathLength})`
        : "Pfad fertig 🎉";
      return `${icon} **${u.user}** · ${u.streak} 🔥 · ${u.thisWeek}/${u.weeklyGoal} diese Woche · ${paper}`;
    })
    .join("\n");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function channel() {
  const ch = await client.channels.fetch(cfg.channelId);
  if (!ch?.isSendable()) throw new Error("DISCORD_CHANNEL_ID is not a text channel the bot can post in");
  return ch;
}

async function tick(state: State) {
  const status = await fetchStatus(state.lastReadAt);
  const ch = await channel();

  for (const r of status.reads) {
    await ch.send(
      `✅ ${mention(r.user)} hat **${r.title}** gelesen (${r.level === "ganz" ? "ganz" : "kurz"}, Quiz ${r.score}/${r.total}) · ${r.streak} 🔥`,
    );
    if (r.at > state.lastReadAt) state.lastReadAt = r.at;
  }

  const now = nowHHMM();
  if (now >= cfg.reminderTime && state.remindedOn !== status.date) {
    const open = status.users.filter((u) => !u.readToday && u.current);
    await ch.send(
      `📄 **Lesezeit!** ${open.map((u) => mention(u.user)).join(" ")}\n${statusLines(status)}\n\n👉 ${cfg.webUrl}`,
    );
    state.remindedOn = status.date;
  }
  if (now >= cfg.lateReminderTime && state.lateRemindedOn !== status.date) {
    const open = status.users.filter((u) => !u.readToday && u.current);
    if (open.length > 0) {
      await ch.send(
        `⏰ Noch nicht gelesen: ${open.map((u) => mention(u.user)).join(" ")}. Die Kurz-Variante reicht für heute, ca. 10 Minuten. ${cfg.webUrl}`,
      );
    }
    state.lateRemindedOn = status.date;
  }
  await saveState(state);
}

const commands = [new SlashCommandBuilder().setName("heute").setDescription("Wer hat heute schon gelesen?")];

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== "heute") return;
  try {
    const status = await fetchStatus(new Date().toISOString());
    await interaction.reply(`**${status.path}**\n${statusLines(status)}`);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "Die RTFP-Web-App ist gerade nicht erreichbar.", flags: MessageFlags.Ephemeral });
  }
});

client.once(Events.ClientReady, async (c) => {
  console.log(`RTFP bot online as ${c.user.tag}`);
  await new REST().setToken(cfg.discordToken).put(Routes.applicationGuildCommands(c.user.id, cfg.guildId), {
    body: commands.map((cmd) => cmd.toJSON()),
  });

  const state = await loadState();
  const run = () => tick(state).catch((err) => console.error("tick failed:", err.message));
  await run();
  setInterval(run, 60_000);
});

await client.login(cfg.discordToken);
