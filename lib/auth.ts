import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { SESSION_COOKIE, verifySessionToken, type AdminRole } from "@/lib/session-token";
export { createSessionToken, SESSION_COOKIE, SESSION_DURATION } from "@/lib/session-token";
export type AdminUser = { _id: ObjectId; email: string; passwordHash: string; name: string; role: AdminRole; active: boolean; createdAt: Date; updatedAt: Date };

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = await verifySessionToken(token);
    if (!ObjectId.isValid(payload.userId)) return null;
    const user = await (await getDb()).collection<AdminUser>("users").findOne({ _id: new ObjectId(payload.userId), active: true }, { projection: { passwordHash: 0 } });
    if (!user || user.email !== payload.email || user.role !== payload.role) return null;
    return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
  } catch { return null; }
}
