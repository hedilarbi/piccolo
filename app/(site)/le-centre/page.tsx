import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le Centre",
  description: "Découvrez Piccolo Teatro, un lieu vivant consacré à la création, la transmission et la rencontre.",
};

const pillars = [
  { number: "01", title: "Créer", text: "Offrir aux artistes le temps, l’espace et les conditions nécessaires pour chercher, expérimenter et donner forme à leurs projets." },
  { number: "02", title: "Transmettre", text: "Faire circuler les pratiques et les savoirs grâce à des ateliers où chaque personne peut découvrir son propre langage artistique." },
  { number: "03", title: "Rencontrer", text: "Mettre les œuvres en dialogue avec les publics et faire du centre un lieu ouvert, traversé par les idées, les générations et les disciplines." },
] as const;

export default function CentrePage() {
  return <main className="overflow-hidden bg-[#050505]">
    <section data-hero className="relative isolate flex min-h-svh items-end overflow-hidden pb-[clamp(64px,10vh,116px)] pt-[clamp(150px,20vh,220px)]">
      <div data-hero-bg className="absolute -inset-[6%] -z-10 will-change-transform">
        <Image src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=2000&h=1300&fit=crop&q=85" alt="La scène du Piccolo Teatro" fill priority sizes="100vw" className="object-cover brightness-[.48] contrast-[1.05]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,.72),rgba(5,5,5,.15)_42%,rgba(5,5,5,.96))]" />
      <div data-beam className="absolute -top-1/3 left-[48%] -z-[5] h-[145%] w-[30vw] rotate-[12deg] bg-gradient-to-b from-[#EF2F29]/35 to-transparent blur-3xl" />
      <div data-hero-copy className="site-container will-change-transform">
        <p className="section-kicker mb-7">Le centre — Piccolo Teatro</p>
        <h1 className="max-w-[12ch] font-display text-[clamp(58px,10vw,170px)] font-normal leading-[.86] tracking-[-.035em]">Un lieu pour <em className="font-normal text-accent">faire vivre</em> les idées.</h1>
        <p className="mt-[clamp(30px,5vh,58px)] max-w-[55ch] text-[clamp(16px,1.3vw,20px)] leading-[1.75] text-[#C3BEB8]">À Bizerte, Piccolo Teatro rassemble artistes, habitants et partenaires autour d’un espace de création, de pratique et de partage.</p>
      </div>
    </section>

    <section className="relative py-[clamp(90px,14vh,180px)]">
      <span aria-hidden className="pointer-events-none absolute -left-[2vw] top-[7%] font-display text-[clamp(180px,30vw,450px)] leading-none text-white/[.025]">01</span>
      <div className="site-container relative grid items-center gap-[clamp(50px,8vw,120px)] lg:grid-cols-[.9fr_1.1fr]">
        <div data-reveal data-parallax="0.07" className="relative mb-12 mr-[10%]">
          <div className="relative aspect-[4/5] overflow-hidden"><Image src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&h=1250&fit=crop&q=85" alt="Artistes réunis au centre" fill sizes="(max-width:1024px) 90vw,42vw" className="object-cover brightness-[.78]" /></div>
          <div className="absolute -bottom-[12%] -right-[15%] aspect-square w-[48%] overflow-hidden border border-white/10"><Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&h=700&fit=crop&q=85" alt="Temps de transmission artistique" fill sizes="25vw" className="object-cover brightness-[.78]" /></div>
        </div>
        <div data-reveal><p className="section-kicker">Notre raison d’être</p><h2 className="section-title mt-5">Faire de la création une expérience <em>collective</em></h2><div className="mt-8 space-y-5 text-[clamp(15.5px,1.15vw,18px)] leading-[1.85] text-muted"><p>Piccolo Teatro est un centre culturel et artistique où une intuition peut devenir une œuvre, où une pratique peut grandir et où une création trouve son public.</p><p>Nous accueillons les démarches naissantes comme les projets confirmés. Théâtre, mouvement, image et arts visuels s’y rencontrent sans hiérarchie, dans un esprit d’exigence, de curiosité et de liberté.</p></div><div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-7">{[["12", "Créations"], ["30+", "Artistes"], ["3", "Ateliers"]].map(([value,label]) => <div key={label}><strong className="font-display text-[clamp(34px,4vw,58px)] font-normal text-accent">{value}</strong><p className="mt-1 text-[10px] uppercase tracking-[.16em] text-muted">{label}</p></div>)}</div></div>
      </div>
    </section>

    <section className="border-y border-border bg-surface py-[clamp(80px,12vh,150px)]"><div className="site-container"><div data-reveal className="mb-[clamp(42px,7vh,78px)] max-w-4xl"><p className="section-kicker">Ce qui nous anime</p><h2 className="section-title mt-5">Trois gestes, <em>un même mouvement</em></h2></div><div className="grid border-t border-border lg:grid-cols-3">{pillars.map((pillar) => <article key={pillar.number} data-reveal className="group border-b border-border px-0 py-[clamp(30px,4vw,54px)] lg:border-b-0 lg:border-r lg:px-[clamp(22px,3vw,46px)] first:pl-0 last:border-r-0"><span className="font-mono text-[11px] tracking-[.22em] text-accent">{pillar.number}</span><h3 className="my-5 font-display text-[clamp(34px,3.4vw,54px)]">{pillar.title}</h3><p className="max-w-[38ch] text-[15px] leading-7 text-muted">{pillar.text}</p><i className="mt-8 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-24" /></article>)}</div></div></section>

    <section className="py-[clamp(90px,14vh,180px)]"><div className="site-container"><div className="grid items-end gap-8 lg:grid-cols-2"><div data-reveal><p className="section-kicker">Le lieu</p><h2 className="section-title mt-5">Des espaces pensés pour <em>le travail et la rencontre</em></h2></div><p data-reveal className="max-w-[48ch] text-[15.5px] leading-8 text-muted lg:justify-self-end">Plateau, studios, espaces de répétition et lieux de vie composent un outil souple, capable d’accueillir chaque étape d’une aventure artistique.</p></div><div className="mt-[clamp(44px,7vh,80px)] grid gap-4 md:grid-cols-[1.35fr_.65fr]"><div data-reveal className="relative aspect-[16/10] overflow-hidden"><Image src="https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1400&h=875&fit=crop&q=85" alt="Le plateau du Piccolo Teatro" fill sizes="(max-width:768px) 100vw,65vw" className="object-cover brightness-[.78] transition duration-1000 hover:scale-[1.03]" /><span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[.18em]">Le plateau</span></div><div className="grid gap-4"><div data-reveal className="relative aspect-[4/3] overflow-hidden"><Image src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&h=675&fit=crop&q=85" alt="Studio de création" fill sizes="35vw" className="object-cover brightness-[.78] transition duration-1000 hover:scale-[1.04]" /><span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[.18em]">Le studio</span></div><div data-reveal className="relative aspect-[4/3] overflow-hidden"><Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=675&fit=crop&q=85" alt="Espace de rencontre" fill sizes="35vw" className="object-cover brightness-[.78] transition duration-1000 hover:scale-[1.04]" /><span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[.18em]">Le foyer</span></div></div></div></div></section>

    <section className="relative flex min-h-[78svh] items-center overflow-hidden border-t border-border"><Image src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1900&h=1100&fit=crop&q=85" alt="Une représentation au Piccolo Teatro" fill sizes="100vw" className="object-cover brightness-[.32]" /><div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/65 to-transparent" /><div data-reveal className="site-container relative"><p className="section-kicker">Entrer dans le mouvement</p><h2 className="mt-6 max-w-[13ch] font-display text-[clamp(44px,7vw,112px)] leading-[.92]">Votre histoire peut commencer <em className="font-normal text-accent">ici.</em></h2><div className="mt-9 flex flex-wrap gap-3"><Link href="/#contact" className="bg-accent px-8 py-4 text-[11px] uppercase tracking-[.17em] text-[#050505]">Nous contacter</Link><Link href="/#ateliers" className="border border-white/25 px-8 py-4 text-[11px] uppercase tracking-[.17em] transition hover:border-accent hover:text-accent">Découvrir les ateliers</Link></div></div></section>
  </main>;
}
