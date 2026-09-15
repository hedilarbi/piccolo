import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function requireAdmin(superAdmin = false) {
  const session = await getSession();
  if (!session) return { response: NextResponse.json({ message: "Non authentifié." }, { status: 401 }) };
  if (superAdmin && session.role !== "super_admin") return { response: NextResponse.json({ message: "Accès réservé au super administrateur." }, { status: 403 }) };
  return { session };
}
