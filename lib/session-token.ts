import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "piccolo_admin_session";
export const SESSION_DURATION = 60 * 60 * 24 * 7;
export type AdminRole = "super_admin" | "admin";
export type SessionPayload = JWTPayload & { userId: string; email: string; role: AdminRole; name: string };

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw new Error("JWT_SECRET doit contenir au moins 32 caractères");
  return new TextEncoder().encode(value);
}

export async function createSessionToken(user: { _id: { toString(): string }; email: string; role: AdminRole; name: string }) {
  return new SignJWT({ userId: user._id.toString(), email: user.email, role: user.role, name: user.name })
    .setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(`${SESSION_DURATION}s`).setIssuer("piccolo-admin").setAudience("piccolo-dashboard").sign(secret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret(), { issuer: "piccolo-admin", audience: "piccolo-dashboard" });
  return payload as SessionPayload;
}
