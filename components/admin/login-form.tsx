"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const result = await response.json();
      if (!response.ok) { setError(result.message || "Connexion impossible."); return; }
      router.replace("/admin/tableau-de-bord"); router.refresh();
    } catch { setError("Le serveur est momentanément inaccessible."); } finally { setLoading(false); }
  }
  return <section className="relative z-10 w-full max-w-[470px] border border-white/[.12] bg-[#0D0D0D]/90 p-[clamp(28px,5vw,54px)] shadow-[0_40px_100px_rgba(0,0,0,.6)] backdrop-blur-xl"><Image src="/piccolo.png" alt="Piccolo Teatro" width={383} height={324} priority className="mb-9 h-[72px] w-auto" /><p className="mb-3 text-[10px] uppercase tracking-[.3em] text-[#EF2F29]">Espace sécurisé</p><h1 className="font-display text-[clamp(38px,6vw,58px)] leading-none">Administration</h1><p className="mb-9 mt-4 text-sm leading-6 text-[#96928E]">Connectez-vous pour gérer l’activité du Piccolo Teatro.</p><form onSubmit={submit} className="space-y-5"><LoginField label="Adresse e-mail" name="email" type="email" autoComplete="username" placeholder="admin@piccolo.tn" /><LoginField label="Mot de passe" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />{error ? <p role="alert" className="border-l-2 border-[#EF2F29] bg-[#EF2F29]/10 px-3 py-2 text-[13px] text-[#F1A5A2]">{error}</p> : null}<button disabled={loading} className="flex min-h-[52px] w-full items-center justify-center bg-[#EF2F29] px-6 text-xs font-medium uppercase tracking-[.18em] text-[#050505] transition hover:bg-[#F3EFE9] disabled:cursor-wait disabled:opacity-60">{loading ? "Connexion…" : "Se connecter"}</button></form><Link href="/" className="mt-7 inline-flex text-[11px] uppercase tracking-[.15em] text-[#77736F] transition hover:text-[#F3EFE9]">← Retour au site</Link></section>;
}

function LoginField(props: { label: string; name: string; type: string; autoComplete: string; placeholder: string }) {
  return <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-[#AAA6A3]">{props.label}</span><input required {...props} className="min-h-[50px] w-full border border-white/[.14] bg-white/[.035] px-4 text-[15px] text-[#F3EFE9] outline-none transition placeholder:text-[#555] focus:border-[#EF2F29] focus:bg-white/[.06]" /></label>;
}
