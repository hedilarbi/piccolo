"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

const links = [
  { label: "Tableau de bord", href: "/admin/tableau-de-bord", icon: "grid" },
  { label: "Spectacles", href: "/admin/spectacles", icon: "stage" },
  { label: "Candidatures", href: "/admin/candidatures", icon: "spark" },
  { label: "Événements", href: "/admin/evenements", icon: "calendar" },
  { label: "Actualités", href: "/admin/actualites", icon: "news" },
  { label: "Réservations", href: "/admin/reservations", icon: "news" },
] as const;


export function AdminShell({ user, children }: { user: { name: string; email: string; role: string }; children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false); const [loggingOut, setLoggingOut] = useState(false);
  async function logout() { setLoggingOut(true); await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/connexion"); router.refresh(); }
  return <div className="min-h-dvh bg-[#F4F1EC] text-[#171717]"><button type="button" onClick={() => setOpen(!open)} className="fixed right-5 top-5 z-[80] border border-black/10 bg-white p-3 shadow-sm lg:hidden" aria-label="Ouvrir le menu"><Icon name="menu" /></button>{open ? <button className="fixed inset-0 z-[60] bg-black/45 lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer le menu" /> : null}<aside className={`fixed inset-y-0 left-0 z-[70] flex w-[280px] flex-col bg-[#0A0A0A] text-[#F3EFE9] transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="border-b border-white/[.08] px-7 py-6"><Image src="/piccolo.png" width={383} height={324} alt="Piccolo Teatro" className="h-[62px] w-auto" /></div><nav className="flex-1 space-y-1 overflow-y-auto px-4 py-7">{links.map(link => { const active = pathname === link.href || pathname.startsWith(`${link.href}/`); return <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`group flex items-center gap-3.5 px-4 py-3.5 text-[13px] transition ${active ? "bg-[#EF2F29] text-[#050505]" : "text-[#A6A19C] hover:bg-white/[.06] hover:text-white"}`}><Icon name={link.icon} /><span>{link.label}</span>{active ? <i className="ml-auto h-1.5 w-1.5 rounded-full bg-[#050505]" /> : null}</Link>; })}</nav><div className="border-t border-white/[.08] p-5"><div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EF2F29] font-display text-lg text-[#050505]">{user.name.charAt(0).toUpperCase()}</span><div className="min-w-0"><p className="truncate text-sm">{user.name}</p><p className="truncate text-[11px] text-[#77736F]">{user.email}</p></div></div><button disabled={loggingOut} onClick={logout} className="flex w-full items-center gap-3 border border-white/[.12] px-4 py-3 text-[11px] uppercase tracking-[.14em] text-[#AAA6A3] transition hover:border-[#EF2F29] hover:text-[#EF2F29] disabled:opacity-50"><Icon name="logout" />{loggingOut ? "Déconnexion…" : "Se déconnecter"}</button></div></aside><div className="min-h-dvh lg:pl-[280px]"><main className="px-[clamp(20px,4vw,60px)] py-[clamp(28px,5vw,56px)]">{children}</main></div></div>;
}

function Icon({ name }: { name: string }) { const paths: Record<string, ReactNode> = { grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>, stage: <><path d="M4 4h16v13H4z"/><path d="M8 21h8M12 17v4M4 8c3 0 5-2 5-4M20 8c-3 0-5-2-5-4"/></>, brush: <><path d="m14 5 5-2 2 2-2 5-9 9H5v-5z"/><path d="m13 6 5 5"/></>, spark: <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z"/>, calendar: <><rect x="3" y="5" width="18" height="16"/><path d="M7 3v4M17 3v4M3 10h18"/></>, news: <><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></>, logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/></>, menu: <path d="M4 7h16M4 12h16M4 17h16"/> }; return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px] shrink-0">{paths[name]}</svg>; }
