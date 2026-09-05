"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const palette = [
  { name: "Ocre", hex: "#D98A2B" }, { name: "Cobalt", hex: "#2F5BD8" }, { name: "Vermillon", hex: "#EF2F29" },
  { name: "Viridien", hex: "#1F7A5C" }, { name: "Magenta", hex: "#C0308A" }, { name: "Prune", hex: "#7A3FB0" },
] as const;
const topics = [
  { title: "Les couleurs", description: "Mélanges, contrastes, nuances : comprendre comment une couleur en appelle une autre.", color: "#D98A2B" },
  { title: "Les formes", description: "Observer, cadrer, composer — construire une image avant de la peindre.", color: "#2F5BD8" },
  { title: "Les techniques", description: "Acrylique, gouache, aquarelle : les gestes de base, du trait au aplat.", color: "#1F7A5C" },
  { title: "Les approches", description: "Figuratif, abstrait, matière : trouver la démarche qui vous ressemble.", color: "#C0308A" },
] as const;
const publics = [
  { title: "Enfants", description: "Découvrir la matière et la couleur en jouant, à son rythme.", color: "#D98A2B", image: "photo-1499892477393-f675706cbe6e" },
  { title: "Adolescents", description: "Affirmer un univers personnel et gagner en technique.", color: "#2F5BD8", image: "photo-1460661419201-fd4cecdf8a8b" },
  { title: "Adultes", description: "Un temps pour soi, la concentration et le plaisir de peindre.", color: "#1F7A5C", image: "photo-1541961017774-22349e4a1262" },
] as const;
const infos = [
  ["Public", "Enfants, adolescents, adultes"], ["Niveau", "Débutant à confirmé"],
  ["Techniques", "Couleurs, formes, approches artistiques"], ["On développe", "Créativité, concentration, expression"],
] as const;
const dripSizes = [["52%", "26px"], ["30%", "58px"], ["64%", "14px"], ["22%", "78px"], ["46%", "34px"], ["34%", "66px"], ["58%", "20px"], ["26%", "48px"], ["44%", "30px"]] as const;

function Kicker({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-3.5 text-[11px] uppercase tracking-[.28em] text-[#8a827a] before:h-[3px] before:w-[46px] before:bg-[var(--paint-accent)]">{children}</p>;
}

function PaintTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const dots = Array.from(layerRef.current?.children ?? []) as HTMLElement[];
    const positions = dots.map(() => ({ x: -100, y: -100 }));
    let mouseX = -100, mouseY = -100, frame = 0;
    const move = (event: PointerEvent) => { mouseX = event.clientX; mouseY = event.clientY; };
    const tick = () => {
      let previousX = mouseX, previousY = mouseY;
      dots.forEach((dot, index) => {
        const ease = 0.34 - index * 0.015;
        positions[index].x += (previousX - positions[index].x) * ease;
        positions[index].y += (previousY - positions[index].y) * ease;
        const size = 26 - index * 1.6;
        dot.style.transform = `translate3d(${positions[index].x - size / 2}px,${positions[index].y - size / 2}px,0)`;
        previousX = positions[index].x; previousY = positions[index].y;
      });
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55] mix-blend-screen">{Array.from({ length: 12 }, (_, index) => <span key={index} className="absolute left-0 top-0 rounded-full" style={{ width: 26 - index * 1.6, height: 26 - index * 1.6, background: palette[index % 5].hex, opacity: 0.34 - index * 0.02, transform: "translate3d(-100px,-100px,0)" }} />)}</div>;
}

export function PaintingWorkshop() {
  const [selected, setSelected] = useState(2);
  const accent = palette[selected];
  const letterColors = Array.from({ length: 8 }, (_, index) => palette[(selected + index) % palette.length].hex);

  return (
    <div className="relative overflow-x-clip bg-[#0E0D0C] text-[#F2EBDD]" style={{ "--paint-accent": accent.hex, "--accent": accent.hex } as CSSProperties}>
      <PaintTrail />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] opacity-55 bg-[repeating-linear-gradient(0deg,rgba(242,235,221,.05)_0_1px,transparent_1px_3px),repeating-linear-gradient(90deg,rgba(242,235,221,.05)_0_1px,transparent_1px_3px)]" />

      <section className="relative z-[2] flex min-h-[92svh] items-end overflow-hidden pb-[clamp(40px,6vh,70px)] pt-[clamp(120px,17vh,190px)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 blur-[70px]">
          <span className="paint-blob absolute left-[4%] top-[14%] h-[34vw] w-[34vw] rounded-full bg-[radial-gradient(circle,#D98A2B_0%,rgba(217,138,43,0)_68%)]" />
          <span className="paint-blob absolute right-[2%] top-[6%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(circle,#2F5BD8_0%,rgba(47,91,216,0)_68%)] [animation-duration:24s] [animation-direction:reverse]" />
          <span className="paint-blob absolute bottom-[-8%] left-[34%] h-[28vw] w-[38vw] rounded-full bg-[radial-gradient(circle,#EF2F29_0%,rgba(239,47,41,0)_66%)] [animation-duration:27s]" />
          <span className="paint-blob absolute bottom-[4%] right-[22%] h-[24vw] w-[24vw] rounded-full bg-[radial-gradient(circle,#1F7A5C_0%,rgba(31,122,92,0)_68%)] [animation-duration:21s] [animation-direction:reverse]" />
        </div>
        <div className="site-container relative z-[3]">
          <Link href="/#ateliers" className="mb-6 inline-flex text-[11.5px] uppercase tracking-[.18em] text-[#8a827a] hover:text-[var(--paint-accent)]">← Retour aux ateliers</Link>
          <div className="mb-3.5 flex items-center gap-3.5"><span className="font-mono text-xs tracking-[.2em] text-[var(--paint-accent)]">03</span><span className="h-[3px] w-[46px] bg-[var(--paint-accent)]" /><span className="text-xs uppercase tracking-[.28em] text-[#8a827a]">Atelier</span></div>
          <h1 className="mb-2.5 flex flex-wrap font-display text-[clamp(52px,12.5vw,215px)] font-normal leading-[.9] tracking-[-.03em]">
            {"Peinture".split("").map((letter, index) => <span key={index} className="relative transition-colors duration-500" style={{ color: letterColors[index] }}>{letter}{index === 0 && <i className="paint-drip absolute left-[52%] top-[96%] h-[clamp(20px,3vw,52px)] w-[5px] origin-top rounded-b-md bg-current after:absolute after:-bottom-[9px] after:-left-[3px] after:h-[11px] after:w-[11px] after:rounded-full after:bg-current" />}{index === 4 && <i className="paint-drip-late absolute left-[44%] top-[94%] h-[clamp(14px,2.2vw,38px)] w-1 origin-top rounded-b-md bg-current after:absolute after:-bottom-2 after:-left-[3px] after:h-2.5 after:w-2.5 after:rounded-full after:bg-current" />}</span>)}
          </h1>
          <p data-reveal className="mt-[26px] max-w-[50ch] text-[clamp(16px,1.2vw,19px)] leading-[1.8] text-[#a09890]">Un espace artistique où l’imagination prend la main. Enfants, adolescents, adultes : chacun peint à sa mesure.</p>
          <div data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties} className="mt-[34px] flex flex-wrap gap-3.5"><Link href="/#contact" className="bg-[var(--paint-accent)] px-7 py-4 text-xs uppercase tracking-[.16em] text-[#F2EBDD] transition hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(0,0,0,.6)]">Rejoindre l’atelier</Link><Link href="#pratique" className="border border-[rgba(242,235,221,.3)] px-7 py-4 text-xs uppercase tracking-[.16em] transition hover:-translate-y-[3px] hover:border-[#F2EBDD]">Infos pratiques</Link></div>
        </div>
      </section>

      <section className="relative z-[2] pb-[clamp(70px,10vh,120px)]"><div className="site-container"><div className="mb-4 flex flex-wrap items-center justify-between gap-5"><span className="text-[11px] uppercase tracking-[.28em] text-[#8a827a]">Nuancier — choisissez une couleur</span><span className="font-display text-[clamp(18px,1.7vw,26px)] italic">{accent.name}</span></div><div className="flex h-[clamp(74px,9vw,130px)] border border-[rgba(242,235,221,.14)]">{palette.map((color, index) => <button key={color.name} type="button" title={color.name} aria-pressed={selected === index} onClick={() => setSelected(index)} className="min-w-0 flex-1 cursor-pointer transition-[flex-grow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:grow-[2.1]" style={{ background: color.hex }} />)}</div></div></section>

      <section className="relative z-[2] pb-[clamp(80px,12vh,140px)] pt-[clamp(50px,8vh,90px)]"><div className="site-container grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(40px,6vw,96px)]"><div data-reveal data-parallax="0.10" className="relative mb-10"><div className="-rotate-[1.6deg] bg-[#1A1817] p-[clamp(14px,1.4vw,22px)] shadow-[0_34px_80px_rgba(0,0,0,.55)]"><div className="relative aspect-[4/5] overflow-hidden bg-[#242120]"><Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=1200&fit=crop&q=75" alt="Atelier de peinture" fill sizes="(max-width:800px) 100vw,50vw" className="object-cover" /></div></div><div className="absolute -bottom-[9%] -right-[6%] w-[44%] rotate-[3.2deg] bg-[#1A1817] p-2.5 shadow-[0_24px_56px_rgba(0,0,0,.55)]"><div className="relative aspect-square overflow-hidden bg-[#242120]"><Image src="https://images.unsplash.com/photo-1452802447250-470a88ac82bc?w=700&h=700&fit=crop&q=75" alt="Pinceaux et palette" fill sizes="25vw" className="object-cover" /></div></div></div><div><Kicker>Présentation</Kicker><h2 data-reveal className="mb-7 mt-6 font-display text-[clamp(32px,4.2vw,62px)] leading-[1.04] tracking-[-.015em]">Laisser libre cours à son <em className="font-normal text-[var(--paint-accent)]">imagination</em></h2><p data-reveal className="mb-[22px] max-w-[56ch] text-[clamp(15.5px,1.15vw,18px)] leading-[1.85] text-[#a09890]">L’atelier permet de découvrir les techniques de base de la peinture, les couleurs, les formes et différentes approches artistiques.</p><p data-reveal className="max-w-[56ch] text-[clamp(15.5px,1.15vw,18px)] italic leading-[1.85]">Un cadre où l’on encourage la créativité, la concentration et l’expression personnelle — sans jugement, sans niveau requis.</p></div></div></section>

      <section className="relative z-[2] bg-[#141312] py-[clamp(70px,10vh,120px)]"><div className="site-container"><div className="mb-11"><Kicker>Ce que l’on explore</Kicker></div><div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(14px,1.6vw,24px)]">{topics.map((topic) => <article key={topic.title} data-reveal className="group relative overflow-hidden bg-[#1A1817] px-[clamp(22px,2.4vw,32px)] py-[clamp(28px,3.2vw,44px)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(0,0,0,.55)]"><span className="absolute inset-x-0 bottom-0 h-0 transition-[height] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-full" style={{ background: topic.color }} /><div className="relative"><span className="mb-5 block h-[clamp(30px,3vw,42px)] w-[clamp(30px,3vw,42px)] rounded-full" style={{ background: topic.color }} /><h3 className="mb-2.5 font-display text-[clamp(21px,1.7vw,29px)] transition-colors group-hover:text-[#0E0D0C]">{topic.title}</h3><p className="text-[14.5px] leading-[1.7] text-[#a09890] transition-colors group-hover:text-[rgba(14,13,12,.82)]">{topic.description}</p></div></article>)}</div></div></section>

      <section className="relative z-[2] py-[clamp(80px,12vh,140px)]"><div className="site-container"><div className="mb-10"><Kicker>Pour qui</Kicker></div><div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[clamp(26px,3.6vw,60px)]">{publics.map((item) => <article key={item.title} data-reveal className="text-center"><div className="paint-swell relative mx-auto mb-[22px] aspect-square w-full max-w-[300px] overflow-hidden rounded-full" style={{ background: item.color }}><Image src={`https://images.unsplash.com/${item.image}?w=800&h=800&fit=crop&q=75`} alt="" fill sizes="300px" className="object-cover opacity-85 mix-blend-luminosity" /></div><h3 className="mb-2 font-display text-[clamp(24px,2.2vw,34px)]">{item.title}</h3><p className="mx-auto max-w-[26ch] text-[14.5px] leading-[1.7] text-[#a09890]">{item.description}</p></article>)}</div></div></section>

      <section id="pratique" className="relative z-[2] scroll-mt-28 bg-[#1A1817] py-[clamp(70px,10vh,120px)]"><div className="site-container"><div className="mb-11"><Kicker>Infos pratiques</Kicker></div><div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(28px,4vw,60px)]">{infos.map(([label, value]) => <div key={label} data-reveal><p className="mb-3.5 text-[11px] uppercase tracking-[.22em] text-[var(--paint-accent)]">{label}</p><p className="font-display text-[clamp(20px,1.8vw,28px)] leading-[1.3]">{value}</p></div>)}</div></div></section>

      <section className="relative z-[2] overflow-hidden bg-[#0E0D0C] py-[clamp(90px,14vh,170px)]"><div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[clamp(60px,9vw,120px)]">{dripSizes.map(([width, height], index) => <span key={index} className="relative flex-1 bg-[#F2EBDD]"><i className="absolute left-1/2 top-full -translate-x-1/2 rounded-b-[40%] bg-[#F2EBDD]" style={{ width, height }} /></span>)}</div><div className="relative mx-auto max-w-[900px] px-[clamp(18px,4vw,60px)] pt-[clamp(50px,8vh,90px)] text-center"><h2 data-reveal className="mb-6 font-display text-[clamp(34px,5.8vw,84px)] leading-[1.03] tracking-[-.02em]">Votre première <em className="font-normal text-[var(--paint-accent)]">toile</em> vous attend</h2><p data-reveal className="mx-auto mb-[34px] max-w-[44ch] text-[clamp(15px,1.1vw,17px)] leading-[1.8] text-[#a09890]">Écrivez-nous pour connaître les horaires, le matériel fourni et rejoindre l’atelier peinture.</p><div data-reveal className="flex flex-wrap justify-center gap-3.5"><Link href="/#contact" className="bg-[var(--paint-accent)] px-8 py-[17px] text-xs uppercase tracking-[.16em] text-[#F2EBDD] transition hover:-translate-y-[3px] hover:shadow-[0_20px_50px_rgba(0,0,0,.6)]">Nous contacter</Link><Link href="/#ateliers" className="border border-[rgba(242,235,221,.3)] px-8 py-[17px] text-xs uppercase tracking-[.16em] transition hover:-translate-y-[3px] hover:border-[#F2EBDD]">Voir les autres ateliers</Link></div></div></section>
    </div>
  );
}
