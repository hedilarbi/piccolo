import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_DURATION, type AdminUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= 5) return NextResponse.json({ message: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });

  let body: { email?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Requête invalide." }, { status: 400 }); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password || email.length > 254 || password.length > 128) return NextResponse.json({ message: "E-mail et mot de passe requis." }, { status: 400 });

  const user = await (await getDb()).collection<AdminUser>("users").findOne({ email, active: true });
  if (!user || !(await compare(password, user.passwordHash))) {
    attempts.set(key, { count: (current?.resetAt && current.resetAt > now ? current.count : 0) + 1, resetAt: now + 15 * 60_000 });
    return NextResponse.json({ message: "Identifiants incorrects." }, { status: 401 });
  }
  attempts.delete(key);
  const response = NextResponse.json({ user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role } });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(user), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_DURATION, priority: "high" });
  return response;
}
