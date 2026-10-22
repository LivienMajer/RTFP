import { timingSafeEqual } from "node:crypto";
import { config } from "@/lib/config";

export function botUnauthorized(request: Request): Response | null {
  if (!config.botToken) return new Response("RTFP_BOT_TOKEN not configured", { status: 503 });
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${config.botToken}`);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}
