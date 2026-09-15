"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import type { Spectacle } from "@/lib/spectacles";

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3.5"><span className="h-px w-[46px] bg-accent" /><span className="text-[11px] uppercase tracking-[.28em] text-muted">{children}</span></div>
);

const Field = ({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) => (
  <label className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[.18em] text-muted">{label}</span><input name={name} type={type} placeholder={placeholder} className="min-h-[46px] border border-foreground/15 bg-foreground/[.04] px-3.5 py-3 text-[15px] text-foreground outline-none transition focus:border-accent focus:bg-foreground/[.07]" /></label>
);

export function SpectaclePage({ spectacle }: { spectacle: Spectacle }) {
  const posterWrap = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [firstPart, setFirstPart] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [venue, setVenue] = useState("");
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("inscription");
      const rect = form?.getBoundingClientRect();
      setSticky(window.scrollY >= window.innerHeight * .7 && !(rect && rect.top < window.innerHeight * .85 && rect.bottom > 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !poster.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - .5) * -9;
    const ry = ((event.clientX - rect.left) / rect.width - .5) * 11;
    poster.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
    poster.current.dataset.active = "true";
  };
  const untilt = () => { if (poster.current) { poster.current.style.transform = "none"; delete poster.current.dataset.active; } };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("lieu");
    setVenue(typeof value === "string" ? value.trim() : "");
    
    const data = {
      spectacleId: spectacle._id,
      lieu: formData.get("lieu"),
      ville: formData.get("ville"),
      jauge: formData.get("jauge"),
      contact: formData.get("contact"),
      email: formData.get("email"),
      slot,
      firstPart,
      plateau: formData.get("plateau"),
    };

    try {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSent(true);
      else alert("Une erreur est survenue.");
    } catch {
      alert("Une erreur est survenue.");
    }
  };
  const reset = () => { setSent(false); setSlot(null); setFirstPart(null); setVenue(""); };
  const ticker = [spectacle.title, "Une soirée, deux plateaux", spectacle.season, "Vos artistes en première partie", "12 lieux partenaires"];

  return <div className="overflow-x-clip bg-[#050505] text-[#F3EFE9]">
    <section className="relative overflow-hidden pb-[clamp(50px,8vh,90px)] pt-[clamp(140px,19vh,210px)]">
      <div aria-hidden className="spectacle-gate absolute inset-0 bg-[radial-gradient(70%_55%_at_76%_32%,rgba(239,47,41,.20),transparent_62%),radial-gradient(120%_90%_at_50%_0%,rgba(243,239,233,.06),transparent_55%)]" />
      <div aria-hidden className="absolute inset-0 overflow-hidden">{Array.from({ length: 14 }, (_, i) => <span key={i} className="spectacle-dust absolute rounded-full bg-foreground/60" style={{ left: `${(6 + i * 6.7) % 94}%`, top: `${40 + (i * 17) % 55}%`, width: `${1.5 + i % 3}px`, height: `${1.5 + i % 3}px`, animationDuration: `${9 + i % 5 * 2.4}s`, animationDelay: `${i * .83}s` }} />)}</div>
      <div className="site-container relative z-[3]">
        <Link href="/#spectacles" className="mb-[30px] inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[.18em] text-muted transition hover:text-accent">← Retour aux spectacles</Link>
        <div className="grid items-end gap-[clamp(30px,4.5vw,74px)] min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(280px,.75fr)]">
          <div><div className="mb-[18px] flex flex-wrap items-center gap-3.5"><span className="font-mono text-[11.5px] tracking-[.2em] text-accent">SPECTACLE · {spectacle.season}</span><span className="h-px w-[46px] bg-accent" /><span className="text-[11px] uppercase tracking-[.28em] text-muted">{spectacle.audienceLabel}</span></div>
            <h1 className="font-display text-[clamp(44px,8.6vw,152px)] font-normal leading-[.92] tracking-[-.03em]">{spectacle.titleLines[0]}<br /><em className="font-normal text-accent">{spectacle.titleLines[1]}</em></h1>
            <p data-reveal className="mb-[clamp(30px,4.4vh,50px)] mt-[clamp(28px,4vh,44px)] max-w-[54ch] text-[clamp(16px,1.2vw,19px)] leading-[1.8] text-muted">{spectacle.description}</p>
            <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties} className="flex flex-wrap items-center gap-3.5"><a href="#inscription" className="bg-accent px-[30px] py-[17px] text-xs uppercase tracking-[.16em] text-accent-foreground transition hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(239,47,41,.32)]">Inscrire mon lieu</a><a href="#dispositif" className="border border-foreground/25 px-[30px] py-[17px] text-xs uppercase tracking-[.16em] transition hover:-translate-y-[3px] hover:border-foreground">Le dispositif</a><span className="font-mono text-[11px] tracking-[.16em] text-muted">{spectacle.deadline}</span></div>
          </div>
          <div ref={posterWrap} data-reveal onMouseMove={tilt} onMouseLeave={untilt} className="relative max-w-[360px] [perspective:1200px] min-[900px]:max-w-none">
            <div ref={poster} className="spectacle-poster relative aspect-[3/4] overflow-hidden border border-foreground/15 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"><Image src={spectacle.image} alt={spectacle.title} fill priority sizes="(max-width:899px) 360px, 35vw" className="spectacle-poster-image scale-[1.04] object-cover brightness-50 contrast-110 transition duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/20 via-[58%] to-transparent" /><div className="absolute inset-x-0 bottom-0 p-[clamp(18px,2vw,28px)]"><p className="mb-2.5 font-mono text-[10px] tracking-[.2em] text-accent">{spectacle.creation}</p><p className="font-display text-[clamp(22px,2vw,32px)] leading-[1.08]">Mise en scène<br /><em>{spectacle.director}</em></p></div></div>
          </div>
        </div>
      </div>
    </section>

    <div className="overflow-hidden border-y border-foreground/10 py-[18px]"><div className="spectacle-ticker flex w-max">{[...ticker, ...ticker].map((word, i) => <span key={`${word}-${i}`} className={`flex items-center gap-[clamp(20px,3vw,44px)] whitespace-nowrap pr-[clamp(20px,3vw,44px)] font-display text-[clamp(17px,1.6vw,25px)] ${i % 2 ? "text-foreground/55" : "text-foreground"}`}>{word}<i className="h-[5px] w-[5px] rounded-full bg-accent" /></span>)}</div></div>
    <section className="border-b border-foreground/[.08] bg-[#0A0A0A] py-[clamp(46px,7vh,80px)]"><div className="site-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[clamp(22px,3vw,50px)]">{spectacle.facts.map(f => <div key={f.label} data-reveal><p className="mb-3 font-mono text-[11px] uppercase tracking-[.18em] text-accent">{f.label}</p><p className="font-display text-[clamp(19px,1.7vw,27px)] leading-[1.3]">{f.value}</p></div>)}</div></section>

    <section id="dispositif" className="scroll-mt-28 py-[clamp(70px,11vh,130px)]"><div className="site-container"><Kicker>Le dispositif</Kicker><h2 data-reveal className="mb-[clamp(38px,5.5vh,64px)] mt-5 max-w-[30ch] font-display text-[clamp(30px,4.2vw,60px)] leading-[1.05] tracking-[-.015em]">Une soirée en deux plateaux : <em>le vôtre, puis le nôtre</em></h2><div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(14px,1.8vw,26px)]">{spectacle.plateaux.map(p => <article key={p.num} data-reveal className={`border border-foreground/10 p-[clamp(24px,2.6vw,38px)] transition duration-500 hover:-translate-y-2 hover:border-accent/45 ${p.accent ? "bg-accent/[.06]" : "bg-foreground/[.025]"}`}><p className="mb-4 font-mono text-[10.5px] tracking-[.2em] text-accent">{p.num} · {p.time}</p><h3 className="mb-3.5 font-display text-[clamp(23px,2.2vw,34px)] leading-[1.1]">{p.title}</h3><p className="text-[14.5px] leading-[1.8] text-muted">{p.description}</p></article>)}</div></div></section>

    <section className="border-t border-foreground/[.08] bg-[#0A0A0A] py-[clamp(70px,11vh,130px)]"><div className="site-container grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(36px,5vw,84px)]">{[
      { kicker: "Ce que nous apportons", title: <>Un spectacle clé en main, <em className="text-accent">une équipe avec</em></>, items: spectacle.provides, red: true },
      { kicker: "Ce que votre lieu apporte", title: <>Une salle, un public, <em>et votre plateau</em></>, items: spectacle.venueProvides, red: false },
    ].map(col => <div key={col.kicker}><Kicker>{col.kicker}</Kicker><h2 data-reveal className="mb-[26px] mt-6 font-display text-[clamp(28px,3.6vw,52px)] leading-[1.06] tracking-[-.015em]">{col.title}</h2>{col.items.map(item => <div key={item} data-reveal className="flex items-baseline gap-4 border-b border-foreground/[.09] py-3.5"><i className={`h-1.5 w-1.5 shrink-0 rounded-full ${col.red ? "bg-accent" : "bg-foreground/50"}`} /><span className="text-[15px] leading-[1.75]">{item}</span></div>)}</div>)}</div></section>

    <section id="dates" className="scroll-mt-28 py-[clamp(70px,11vh,130px)]"><div className="site-container"><Kicker>Fenêtres de tournée</Kicker><h2 data-reveal className="mb-[clamp(32px,4.5vh,52px)] mt-5 font-display text-[clamp(28px,3.8vw,54px)] leading-[1.05]">Choisissez votre <em>créneau</em></h2><div className="border-b border-foreground/10">{spectacle.dates.map(date => <div key={date.window} className="group relative overflow-hidden border-t border-foreground/10 py-[clamp(22px,2.8vw,36px)] transition-[padding] duration-500 hover:pl-[clamp(12px,2vw,34px)]"><i className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 group-hover:w-full" /><div className="grid items-baseline gap-[clamp(12px,2vw,36px)] [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]"><p className="font-display text-[clamp(22px,2.4vw,36px)] leading-[1.1]">{date.window}</p><p className="text-sm leading-7 text-muted">{date.zone}</p><p className={`font-mono text-[11.5px] uppercase tracking-[.14em] ${date.available ? "text-accent" : "text-[#8f8b88]"}`}>{date.status}</p><div><a href="#inscription" onClick={() => setSlot(date.window.replace("2026", "26").replace("2027", "27"))} className="inline-block min-h-11 border border-foreground/25 px-[22px] py-[13px] text-[11.5px] uppercase tracking-[.16em] transition hover:border-accent hover:bg-accent hover:text-[#050505]">Demander ce créneau</a></div></div></div>)}</div></div></section>

    <section className="border-t border-foreground/[.08] bg-[#0A0A0A] py-[clamp(60px,9vh,110px)]"><div className="site-container"><Kicker>Fiche technique — l&apos;essentiel</Kicker><div className="mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(18px,2.4vw,34px)]">{spectacle.technique.map(item => <div key={item.label} data-reveal className="border-l border-foreground/15 pl-[18px]"><p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[.18em] text-muted">{item.label}</p><p className="text-[15.5px] leading-[1.65]">{item.value}</p></div>)}</div></div></section>

    <section id="inscription" className="relative scroll-mt-24 overflow-hidden py-[clamp(80px,12vh,150px)]"><div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(239,47,41,.15),transparent_62%)]" /><div className="site-container relative grid items-start gap-[clamp(34px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"><div><Kicker>Inscription — professionnels</Kicker><h2 data-reveal className="mb-[22px] mt-[22px] font-display text-[clamp(30px,4.6vw,68px)] leading-[1.03] tracking-[-.02em]">Inscrivez votre <em className="text-accent">maison de culture</em></h2><p data-reveal className="mb-[30px] max-w-[48ch] text-[clamp(15px,1.1vw,17.5px)] leading-[1.8] text-muted">Un formulaire, cinq minutes. Nous revenons vers vous sous dix jours ouvrables avec une proposition de dates, un budget et la fiche technique complète.</p>{spectacle.steps.map(step => <div key={step.num} data-reveal className="grid grid-cols-[auto_minmax(0,1fr)] gap-[18px] border-b border-foreground/[.09] py-4"><span className="font-mono text-[11px] tracking-[.16em] text-accent">{step.num}</span><span className="text-[14.5px] leading-[1.75] text-muted">{step.text}</span></div>)}</div>
      <div data-reveal className="border border-foreground/15 bg-[#0A0A0A]/85 p-[clamp(24px,3vw,44px)]">{sent ? <div className="flex min-h-[420px] flex-col justify-center gap-4"><i className="h-px w-[46px] bg-accent" /><h3 className="font-display text-[clamp(26px,2.6vw,40px)] leading-[1.1]">Candidature <em className="text-accent">enregistrée</em></h3><p className="max-w-[40ch] text-[15px] leading-[1.8] text-muted">Merci — le dossier de {venue || "votre lieu"} est arrivé au bureau de diffusion.{slot ? ` Créneau noté : ${slot}.` : ""} Vous recevez dates, budget et fiche technique sous dix jours ouvrables.</p><button type="button" onClick={reset} className="mt-2 self-start border border-foreground/25 px-6 py-[13px] text-[11.5px] uppercase tracking-[.16em] transition hover:border-foreground">Inscrire un autre lieu</button></div> : <form onSubmit={submit} className="flex flex-col gap-[18px]"><p className="font-mono text-[10.5px] uppercase tracking-[.2em] text-accent">Dossier d&apos;accueil</p><Field label="Nom du lieu" name="lieu" placeholder="Maison de la Culture de…" /><div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[18px]"><Field label="Ville" name="ville" placeholder="Namur" /><Field label="Jauge de la salle" name="jauge" placeholder="320 places" /></div><div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[18px]"><Field label="Contact" name="contact" placeholder="Prénom, nom, fonction" /><Field label="E-mail professionnel" name="email" type="email" placeholder="programmation@…" /></div><ChipGroup label="Créneau souhaité" values={spectacle.slots} active={slot} onChange={setSlot} mono /><ChipGroup label="Votre première partie" values={spectacle.firstParts} active={firstPart} onChange={setFirstPart} /><label className="flex flex-col gap-2"><span className="text-[11px] uppercase tracking-[.18em] text-muted">Décrivez votre plateau</span><textarea name="plateau" rows={4} placeholder="Forme, durée, nombre d'interprètes, besoins particuliers…" className="resize-y border border-foreground/15 bg-foreground/[.04] px-3.5 py-3 text-[15px] leading-[1.7] outline-none transition focus:border-accent focus:bg-foreground/[.07]" /></label><button type="submit" className="mt-1.5 min-h-[52px] bg-accent px-[30px] py-[17px] text-xs uppercase tracking-[.16em] text-[#050505] transition hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(239,47,41,.32)]">Envoyer ma candidature</button><p className="text-xs leading-[1.7] text-[#8f8b88]">Réservé aux structures culturelles. Réponse sous 10 jours ouvrables.</p></form>}</div></div></section>

    <section className="border-t border-foreground/[.08] bg-[#0A0A0A] py-[clamp(60px,9vh,110px)]"><div className="mx-auto max-w-[1100px] px-[clamp(18px,4vw,60px)]"><Kicker>Questions des programmateurs</Kicker><div className="mt-[30px] border-b border-foreground/10">{spectacle.faq.map(item => <article key={item.question} data-reveal className="border-t border-foreground/10 py-[clamp(20px,2.4vw,30px)]"><h3 className="mb-3 font-display text-[clamp(19px,1.8vw,27px)] leading-[1.15]">{item.question}</h3><p className="max-w-[64ch] text-[14.5px] leading-[1.8] text-muted">{item.answer}</p></article>)}</div></div></section>

    <div className={`fixed inset-x-0 bottom-0 z-[55] border-t border-foreground/10 bg-[#050505]/95 backdrop-blur-[14px] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${sticky ? "translate-y-0" : "translate-y-[120%]"}`}><div className="site-container flex flex-wrap items-center justify-between gap-3.5 py-3.5"><div className="flex flex-wrap items-baseline gap-3.5"><span className="font-display text-[clamp(17px,1.5vw,23px)]">{spectacle.title}</span><span className="font-mono text-[11px] tracking-[.14em] text-muted">{spectacle.partnerCount}</span></div><a href="#inscription" className="inline-flex min-h-11 items-center bg-accent px-6 py-[13px] text-[11.5px] uppercase tracking-[.16em] text-[#050505]">Inscrire mon lieu</a></div></div>
  </div>;
}

function ChipGroup({ label, values, active, onChange, mono = false }: { label: string; values: readonly string[]; active: string | null; onChange: (value: string) => void; mono?: boolean }) {
  return <div className="flex flex-col gap-2.5"><span className="text-[11px] uppercase tracking-[.18em] text-muted">{label}</span><div className="flex flex-wrap gap-2.5">{values.map(value => <button key={value} type="button" aria-pressed={active === value} onClick={() => onChange(value)} className={`min-h-11 border px-[18px] py-[11px] text-[11.5px] tracking-[.12em] transition ${mono ? "font-mono" : ""} ${active === value ? "border-accent bg-accent text-[#050505]" : "border-foreground/20 bg-foreground/[.04] text-foreground hover:border-foreground/45"}`}>{value}</button>)}</div></div>;
}
