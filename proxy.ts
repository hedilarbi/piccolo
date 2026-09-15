import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/connexion";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let valid = false;
  if (token) { try { await verifySessionToken(token); valid = true; } catch { valid = false; } }
  if (!valid && !isLogin) {
    const url = new URL("/admin/connexion", request.url);
    return NextResponse.redirect(url);
  }
  if (valid && isLogin) return NextResponse.redirect(new URL("/admin/tableau-de-bord", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
