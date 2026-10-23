import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "./config";

// Prototype "login": pick your name. No passwords, so only run this for a
// trusted group (see README) until real auth exists.
export const USER_COOKIE = "rtfp_user";

export async function currentUser(): Promise<string | null> {
  const name = (await cookies()).get(USER_COOKIE)?.value;
  return name && config.users.includes(name) ? name : null;
}

export async function requireUser(): Promise<string> {
  const user = await currentUser();
  if (!user) redirect("/login");
  return user;
}
