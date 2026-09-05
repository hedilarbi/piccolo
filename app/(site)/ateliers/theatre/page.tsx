import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Atelier Théâtre",
  description:
    "Un atelier théâtre ouvert à tous, de 6 ans à plus de 60 ans, pour apprendre, s’exprimer et prendre plaisir à monter sur scène.",
};

const skills = [
  { number: "01", title: "Confiance en soi", description: "Oser prendre la parole, occuper l’espace et s’exposer au regard des autres." },
  { number: "02", title: "Créativité", description: "Improviser, inventer des situations et développer une expression personnelle." },
  { number: "03", title: "Expression orale", description: "Travailler la voix, la diction et la présence pour mieux se faire entendre." },
  { number: "04", title: "Travail de groupe", description: "Écouter, réagir et construire ensemble une mise en scène collective." },
] as const;

const practicalInfo = [
  { label: "Public", value: "De 6 ans à plus de 60 ans" },
  { label: "Format", value: "Expression, improvisation, mise en scène" },
  { label: "Niveau", value: "Amateur à professionnalisation" },
  { label: "Accompagnement", value: "Projets et productions du club" },
] as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="section-kicker">{children}</p>;
}

export default function TheatreWorkshopPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <div data-parallax="0.16" className="absolute -inset-[8%] z-0 will-change-transform">
          <Image src="https://loremflickr.com/1920/1280/theatre,acting,stage?lock=101" alt="Atelier théâtre" fill priority sizes="100vw" className="object-cover grayscale-[.55] brightness-50 contrast-110" />
        </div>
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(58%_55%_at_60%_40%,rgba(239,47,41,.20),transparent_70%)]" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,5,5,.55)_0%,rgba(5,5,5,.15)_40%,rgba(5,5,5,.94)_100%)]" />

        <div className="site-container relative z-[3] pb-[clamp(60px,9vh,110px)] pt-40">
          <Link href="/#ateliers" className="mb-[26px] inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.18em] text-[#AAA6A3] transition-colors hover:text-[#EF2F29]">← Retour aux ateliers</Link>
          <div className="mb-[22px] flex items-center gap-[14px]">
            <span className="font-mono text-xs tracking-[0.2em] text-[#EF2F29]">01</span>
            <span className="h-px w-[46px] bg-[#EF2F29]" />
            <span data-reveal className="text-xs uppercase tracking-[0.28em] text-[#AAA6A3]">Atelier</span>
          </div>
          <h1 data-reveal className="mb-7 font-display text-[clamp(56px,11vw,190px)] font-normal leading-[.92] tracking-[-0.02em]">Théâtre<span className="text-[#EF2F29]">.</span></h1>
          <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="max-w-[52ch] text-[clamp(16px,1.2vw,19px)] leading-[1.75] text-[#AAA6A3]">De 6 à plus de 60 ans : un espace pour apprendre, s’exprimer et surtout prendre plaisir à monter sur scène.</p>
          <div data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties} className="mt-9 flex flex-wrap gap-3.5">
            <Link href="/#contact" className="bg-[#EF2F29] px-7 py-4 text-xs uppercase tracking-[0.16em] text-[#050505] transition duration-400 hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(239,47,41,.34)]">Rejoindre l’atelier</Link>
            <Link href="#pratique" className="border border-[rgba(243,239,233,.24)] px-7 py-4 text-xs uppercase tracking-[0.16em] transition duration-400 hover:-translate-y-[3px] hover:border-[#F3EFE9]">Infos pratiques</Link>
          </div>
        </div>
      </section>

      <section className="py-[clamp(90px,13vh,160px)]">
        <div className="site-container grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(40px,6vw,96px)]">
          <div data-reveal data-parallax="0.12" className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
            <Image src="https://loremflickr.com/900/1200/theatre,improv,group?lock=102" alt="Jeux théâtraux" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover grayscale-[.7] brightness-[.85]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_30%_20%,rgba(239,47,41,.16),transparent_70%)]" />
          </div>
          <div>
            <Kicker>Présentation</Kicker>
            <h2 data-reveal className="mb-[30px] mt-[26px] font-display text-[clamp(32px,4vw,58px)] font-normal leading-[1.06] tracking-[-0.01em]">Un atelier ouvert à <em className="font-normal">tous</em></h2>
            <p data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="mb-6 max-w-[56ch] text-[clamp(15.5px,1.15vw,18px)] leading-[1.85] text-[#AAA6A3]">Un atelier ouvert à tous, de 6 ans jusqu’à plus de 60 ans. À travers des exercices d’expression, d’improvisation, de mise en scène et de jeux théâtraux, les participants développent leur confiance en soi, leur créativité, leur expression orale et leur capacité à travailler en groupe.</p>
            <p data-reveal style={{ "--reveal-delay": "180ms" } as React.CSSProperties} className="max-w-[56ch] text-[clamp(15.5px,1.15vw,18px)] italic leading-[1.85] text-[#F3EFE9]">Un espace pour apprendre, s’exprimer et surtout prendre plaisir à monter sur scène.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-[clamp(60px,9vh,110px)]">
        <div className="site-container">
          <div className="mb-11"><Kicker>Ce que l’on développe</Kicker></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-0.5 bg-[rgba(243,239,233,.08)]">
            {skills.map((skill, index) => (
              <article key={skill.title} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties} className="bg-[#0A0A0A] px-[clamp(24px,2.6vw,34px)] py-[clamp(30px,3.4vw,44px)]">
                <p className="mb-4 font-display text-[clamp(30px,2.6vw,42px)] text-[#EF2F29]">{skill.number}</p>
                <h3 className="mb-2.5 font-display text-[clamp(20px,1.6vw,26px)]">{skill.title}</h3>
                <p className="text-sm leading-[1.65] text-[#AAA6A3]">{skill.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-[clamp(90px,13vh,160px)]">
        <span aria-hidden="true" data-parallax="0.10" className="pointer-events-none absolute -right-[3vw] top-[6%] select-none font-display text-[clamp(160px,26vw,400px)] leading-[.8] text-foreground/[.035]">02</span>
        <div className="site-container relative grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(40px,6vw,96px)]">
          <div>
            <Kicker>Accompagnement</Kicker>
            <h2 data-reveal className="mb-[30px] mt-[26px] font-display text-[clamp(32px,4vw,58px)] font-normal leading-[1.06] tracking-[-0.01em]">De la pratique amateur à la <em className="font-normal">professionnalisation</em></h2>
            <p data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="max-w-[56ch] text-[clamp(15.5px,1.15vw,18px)] leading-[1.85] text-[#AAA6A3]">Le club soutient également ses adhérents dans leurs projets et productions théâtrales, de la pratique amateur jusqu’à la professionnalisation, en les accompagnant dans le développement de leurs compétences et la réalisation de leurs projets.</p>
            <Link href="/#contact" className="mt-[34px] inline-flex items-center gap-3 border-b border-[rgba(243,239,233,.25)] pb-2 text-[11.5px] uppercase tracking-[0.18em] transition-colors hover:border-[#EF2F29]">Parler de mon projet <span className="h-px w-6 bg-[#EF2F29]" /></Link>
          </div>
          <div data-reveal data-parallax="-0.08" className="relative mb-12 ml-[10%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d]"><Image src="https://loremflickr.com/900/1200/theatre,production,rehearsal?lock=103" alt="Production théâtrale" fill sizes="(max-width: 800px) 90vw, 45vw" className="object-cover grayscale-[.6] brightness-[.8]" /></div>
            <div data-parallax="0.10" className="absolute -bottom-[10%] -left-[12%] aspect-[4/5] w-[48%] overflow-hidden border border-[rgba(243,239,233,.08)] bg-[#0d0d0d]"><Image src="https://loremflickr.com/600/750/theatre,spotlight,actor?lock=104" alt="Sur scène" fill sizes="30vw" className="object-cover grayscale-[.5] brightness-[.85]" /></div>
          </div>
        </div>
      </section>

      <section id="pratique" className="scroll-mt-28 bg-[#0A0A0A] py-[clamp(70px,10vh,120px)]">
        <div className="site-container">
          <div className="mb-11"><Kicker>Infos pratiques</Kicker></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(30px,4vw,60px)]">
            {practicalInfo.map((item, index) => (
              <div key={item.label} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
                <p className="mb-3.5 text-[11px] uppercase tracking-[0.22em] text-[#EF2F29]">{item.label}</p>
                <p className="font-display text-[clamp(20px,1.8vw,28px)] leading-[1.3]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[70svh] items-center overflow-hidden">
        <div data-parallax="0.14" className="absolute -inset-[10%] bg-[repeating-linear-gradient(90deg,#1b0605_0_1vw,#43100e_1vw_2.2vw,#120404_2.2vw_3.2vw)]" />
        <div className="animate-beam absolute inset-0 bg-[radial-gradient(48%_60%_at_50%_55%,rgba(239,47,41,.24),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.85)_0%,rgba(5,5,5,.35)_40%,rgba(5,5,5,.5)_80%)]" />
        <div className="relative mx-auto w-full max-w-[900px] px-[clamp(20px,4vw,60px)] text-center">
          <h2 data-reveal className="mb-[26px] font-display text-[clamp(34px,5.6vw,80px)] font-normal leading-[1.05] tracking-[-0.02em]">Prêt à monter <em className="font-normal">sur scène</em> ?</h2>
          <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="mx-auto mb-9 max-w-[44ch] text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-[#AAA6A3]">Écrivez-nous pour connaître les prochaines séances et rejoindre l’atelier théâtre.</p>
          <div data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties} className="flex flex-wrap justify-center gap-3.5">
            <Link href="/#contact" className="bg-[#EF2F29] px-8 py-[17px] text-xs uppercase tracking-[0.16em] text-[#050505] transition hover:-translate-y-[3px] hover:shadow-[0_20px_48px_rgba(239,47,41,.35)]">Nous contacter</Link>
            <Link href="/#ateliers" className="border border-[rgba(243,239,233,.24)] px-8 py-[17px] text-xs uppercase tracking-[0.16em] transition hover:-translate-y-[3px] hover:border-[#F3EFE9]">Voir les autres ateliers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
