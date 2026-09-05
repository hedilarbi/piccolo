import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/components/site/home/portfolio";
import { ActivitiesJourney } from "@/components/site/home/activities-journey";

export const metadata: Metadata = {
  title: "Accueil",
};

const workshops = [
  { number: "01", name: "Théâtre", href: "/ateliers/theatre", description: "Jeu, voix, présence et écriture de plateau, du premier pas jusqu’à la représentation.", image: "https://loremflickr.com/900/1200/theatre,acting,stage?lock=31" },
  { number: "02", name: "DNA", href: "/ateliers/dna", description: "Danse, mouvement et rythme : un laboratoire du corps et de sa mémoire.", image: "https://loremflickr.com/900/1200/dance,performance,movement?lock=32" },
  { number: "03", name: "Mel Art", href: "/ateliers/mel-art", description: "Arts visuels, matières et images : composer un langage plastique personnel.", image: "https://loremflickr.com/900/1200/art,studio,painting?lock=33" },
] as const;

const events = [
  { day: "14", month: "Octobre", category: "Création", title: "Le Silence des chaises vides", place: "Grande salle", time: "20h00", image: "https://loremflickr.com/800/600/theatre,drama,stage?lock=51" },
  { day: "02", month: "Novembre", category: "Performance", title: "Nuit blanche — laboratoire ouvert", place: "Studio B", time: "19h30", image: "https://loremflickr.com/800/600/performance,art,night?lock=52" },
  { day: "21", month: "Novembre", category: "Rencontre", title: "Carte blanche aux artistes en incubation", place: "Foyer", time: "18h00", image: "https://loremflickr.com/800/600/talk,audience,culture?lock=53" },
] as const;

const news = [
  { category: "Coulisses", date: "18.08.2026", title: "Trois semaines de résidence, racontées de l’intérieur", excerpt: "Carnet de bord d’une création qui cherche encore sa forme, entre plateau et atelier.", image: "https://loremflickr.com/900/700/theatre,backstage,notes?lock=71" },
  { category: "Portrait", date: "02.08.2026", title: "Rencontre avec les artistes de l’incubateur", excerpt: "Quatre parcours, une même envie : faire exister un projet et le porter jusqu’au public.", image: "https://loremflickr.com/900/700/artist,portrait,studio?lock=72" },
  { category: "Programme", date: "21.07.2026", title: "La saison 2026—2027 se dévoile", excerpt: "Créations, ateliers et rendez-vous : ce que le centre prépare pour les mois à venir.", image: "https://loremflickr.com/900/700/theatre,curtain,seats?lock=73" },
] as const;

function ArrowLink({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">{children}<i className="h-px w-6 bg-accent" /></span>;
}

export default function Home() {
  return (
    <>
      <section id="top" data-hero className="relative isolate flex min-h-svh scroll-mt-24 items-end overflow-hidden">
        <div data-hero-bg className="absolute -inset-x-[4%] -inset-y-[8%] z-0 will-change-transform">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(122deg,#0d0d0d_0_14px,#080808_14px_28px)]" />
          <Image src="https://loremflickr.com/1920/1280/theatre,stage,spotlight?lock=11" alt="Scène de théâtre dans l’obscurité" fill priority sizes="100vw" className="object-cover grayscale-[.85] brightness-[.6] contrast-110" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_62%_42%,rgba(243,239,233,.14),transparent_70%)]" />
        </div>
        <div data-beam className="animate-beam-in absolute -top-[30%] left-[46%] z-[1] h-[150%] w-[38vw] origin-top rotate-[14deg] bg-[linear-gradient(180deg,rgba(239,47,41,.42),rgba(239,47,41,.1)_45%,transparent_78%)] opacity-55 blur-[22px] will-change-transform" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,5,5,.75)_0%,rgba(5,5,5,.25)_40%,rgba(5,5,5,.92)_100%)]" />

        <div data-hero-copy className="site-container animate-hero-in relative z-[3] pb-[clamp(60px,9vh,110px)] will-change-transform">
          <div className="mb-[26px] flex items-center gap-[14px]">
            <span className="h-px w-[46px] bg-accent" />
            <p className="text-xs uppercase tracking-[0.28em] text-[#AAA6A3]">Centre culturel et artistique</p>
          </div>
          <h1 className="font-display text-[clamp(52px,10.5vw,180px)] font-normal leading-[.92] tracking-[-0.02em]">
            <span className="block">L’art entre</span>
            <em className="block pl-[0.12em] font-normal">en <span className="text-transparent [-webkit-text-stroke:1px_var(--accent)]">scène</span>.</em>
          </h1>
          <div className="mt-[clamp(32px,5vh,60px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-end gap-9">
            <p className="max-w-[46ch] text-[clamp(15px,1.15vw,17px)] leading-7 text-muted">Piccolo Teatro est un espace de création, de transmission et d’accompagnement où le théâtre rencontre les autres expressions artistiques.</p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="#centre" className="bg-accent px-7 py-4 text-xs uppercase tracking-[0.16em] text-accent-foreground transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(239,47,41,.34)]">Découvrir Piccolo Teatro</Link>
              <Link href="#ateliers" className="border border-foreground/25 px-7 py-4 text-xs uppercase tracking-[0.16em] transition hover:-translate-y-1 hover:border-foreground">Explorer nos activités</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-[clamp(20px,4vw,60px)] z-[4] hidden flex-col items-center gap-4 md:flex">
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted [writing-mode:vertical-rl]">Scroll pour entrer en scène</span>
          <span className="animate-scroll-pulse h-20 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      <section id="centre" className="relative scroll-mt-24 overflow-hidden py-[clamp(100px,14vh,180px)]">
        <span aria-hidden="true" className="pointer-events-none absolute -left-[3vw] top-[8%] select-none font-display text-[clamp(180px,30vw,460px)] leading-[0.8] text-foreground/[0.035]">01</span>
        <div className="site-container relative grid items-center gap-[clamp(60px,8vw,120px)] lg:grid-cols-2">
          <div className="relative mb-12 mr-[10%]" data-reveal data-parallax="0.05">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface-elevated">
              <Image src="https://loremflickr.com/900/1200/theatre,rehearsal,actor?lock=21" alt="Répétition au plateau" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover grayscale brightness-75" />
              <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_30%_25%,rgba(239,47,41,.16),transparent_70%)]" />
            </div>
            <div className="absolute -bottom-[12%] -right-[14%] aspect-[4/5] w-[52%] overflow-hidden border border-border bg-surface-elevated">
              <Image src="https://loremflickr.com/600/750/theatre,mask,art?lock=22" alt="Détail d’atelier" fill sizes="30vw" className="object-cover grayscale brightness-75" />
            </div>
          </div>
          <div data-reveal>
            <p className="section-kicker">Acte II — Le centre</p>
            <h2 className="section-title">Un espace où les idées <em>deviennent vivantes</em></h2>
            <p className="mb-10 mt-8 max-w-[52ch] text-[clamp(15px,1.1vw,17px)] leading-8 text-muted">Piccolo Teatro réunit artistes, créateurs, formateurs et publics autour d’un même espace d’expression. Le centre accompagne la découverte artistique, la création de projets et leur rencontre avec le public.</p>
            <div className="grid grid-cols-3 gap-5 border-t border-border pt-7">
              {[["12", "Créations produites"], ["30+", "Artistes accompagnés"], ["3", "Ateliers permanents"]].map(([value, label]) => (
                <div key={label}><strong className="font-display text-[clamp(34px,3.4vw,52px)] font-normal leading-none text-accent">{value}</strong><p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">{label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ateliers" className="scroll-mt-24 py-[clamp(90px,13vh,160px)]">
        <div className="site-container">
          <div className="mb-[clamp(40px,6vh,72px)] flex flex-wrap items-end justify-between gap-7" data-reveal>
            <div><p className="section-kicker">Acte III — Ateliers</p><h2 className="section-title">Explorer, pratiquer, <em>créer</em></h2></div>
            <p className="max-w-[42ch] text-[15px] leading-7 text-muted">Des ateliers pour découvrir une discipline, développer une pratique et faire émerger une expression personnelle.</p>
          </div>
          <div className="grid gap-1 md:grid-cols-3">
            {workshops.map((workshop) => (
              <Link key={workshop.name} href={workshop.href} data-reveal style={{ "--reveal-delay": `${Number(workshop.number) * 90}ms` } as React.CSSProperties} className="group relative min-h-[520px] overflow-hidden bg-surface-elevated transition duration-700 hover:-translate-y-2">
                <Image src={workshop.image} alt={workshop.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale brightness-[0.55] transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
                <div className="absolute inset-x-0 bottom-0 p-[clamp(22px,2.4vw,36px)]">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{workshop.number}</span>
                  <h3 className="my-3 font-display text-[clamp(32px,3vw,48px)] leading-none">{workshop.name}</h3>
                  <p className="mb-5 max-w-[34ch] text-sm leading-6 text-muted">{workshop.description}</p>
                  <ArrowLink>Découvrir l’atelier</ArrowLink>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ActivitiesJourney />

      <section id="evenements" className="scroll-mt-24 bg-surface py-[clamp(90px,14vh,170px)]">
        <div className="site-container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="section-kicker">Acte V — Agenda</p>
              <h2 className="section-title">Les prochains <em>rendez-vous</em></h2>
            </div>
            <Link href="#evenements" className="border-b border-foreground/25 pb-2 text-[11px] uppercase tracking-[0.18em] hover:border-accent">Voir tous les événements</Link>
          </div>
          <div>
            {events.map((event) => (
              <Link key={event.title} href="#evenements" data-reveal className="group grid items-center gap-7 border-t border-border py-[clamp(28px,3.4vw,46px)] transition-[padding] hover:pl-3 md:grid-cols-[0.7fr_1.4fr_1fr] xl:grid-cols-[0.6fr_1.2fr_1fr_auto]">
                <div>
                  <span className="font-display text-[clamp(62px,7vw,112px)] leading-[0.85]">{event.day}</span>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-accent">{event.month} · {event.category}</p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(26px,2.3vw,38px)] leading-tight">{event.title}</h3>
                  <p className="mt-3 flex gap-5 text-sm text-muted"><span>{event.place}</span><span>{event.time}</span></p>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden border border-transparent group-hover:border-accent">
                  <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 28vw" className="object-cover grayscale brightness-75 transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100" />
                </div>
                <span className="hidden xl:block"><ArrowLink>Voir l’événement</ArrowLink></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Portfolio />

      <section id="actualites" className="scroll-mt-24 py-[clamp(90px,14vh,170px)]">
        <div className="site-container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div><p className="section-kicker">Acte VII — Actualités</p><h2 className="section-title">Journal de <em>création</em></h2></div>
            <Link href="#actualites" className="border border-foreground/20 px-6 py-4 text-[11px] uppercase tracking-[0.16em] hover:border-accent hover:text-accent">Toutes les actualités</Link>
          </div>
          <div className="grid gap-[clamp(30px,3vw,50px)] md:grid-cols-3">
            {news.map((item) => (
              <Link key={item.title} href="#actualites" data-reveal className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-surface-elevated"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale brightness-75 transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100" /></div>
                <p className="flex gap-4 text-[11px] uppercase tracking-[0.18em] text-accent"><span>{item.category}</span><span className="text-muted">{item.date}</span></p>
                <h3 className="my-3 font-display text-[clamp(24px,2vw,32px)] leading-tight">{item.title}</h3>
                <p className="mb-4 text-[15px] leading-7 text-muted">{item.excerpt}</p>
                <ArrowLink>Lire l’article</ArrowLink>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative flex min-h-[92svh] scroll-mt-24 items-center overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#1b0605_0_1vw,#43100e_1vw_2.2vw,#120404_2.2vw_3.2vw)]" />
        <div className="animate-beam absolute inset-0 bg-[radial-gradient(46%_58%_at_50%_56%,rgba(239,47,41,.3),transparent_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/50" />
        <div className="site-container relative py-28 text-center" data-reveal data-parallax="0.04">
          <p className="mb-7 text-[11px] uppercase tracking-[0.3em] text-muted">Acte final</p>
          <h2 className="mx-auto max-w-6xl font-display text-[clamp(42px,6.4vw,108px)] leading-none tracking-[-0.02em]">Et si votre projet <em className="font-normal">montait sur scène</em> ?</h2>
          <p className="mx-auto mb-10 mt-7 max-w-[46ch] text-[clamp(15px,1.15vw,17px)] leading-7 text-muted">Parlons de votre idée, de votre pratique ou de votre prochaine création.</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href="mailto:bonjour@piccoloteatro.be" className="bg-accent px-8 py-4 text-xs uppercase tracking-[0.16em] text-accent-foreground transition hover:-translate-y-1">Nous contacter</a>
            <Link href="#centre" className="border border-foreground/25 px-8 py-4 text-xs uppercase tracking-[0.16em] transition hover:-translate-y-1 hover:border-foreground">Découvrir le centre</Link>
          </div>
        </div>
      </section>
    </>
  );
}
