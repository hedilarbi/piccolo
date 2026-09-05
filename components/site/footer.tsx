import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Accueil", href: "/#top" },
  { label: "Le Centre", href: "/#centre" },
  { label: "Ateliers", href: "/#ateliers" },
  { label: "Activités", href: "/#activites" },
  { label: "Événements", href: "/#evenements" },
  { label: "Spectacles", href: "/#spectacles" },
  { label: "Actualités", href: "/#actualites" },
] as const;

const socials = ["Instagram", "Facebook", "Vimeo", "LinkedIn"] as const;

const workshopLinks = [
  { label: "Théâtre", href: "/ateliers/theatre" },
  { label: "DNA", href: "/ateliers/dna" },
  { label: "Mel Art", href: "/ateliers/mel-art" },
] as const;

const activityLinks = [
  { label: "Production", href: "/activites/production" },
  { label: "Incubation", href: "/activites/incubation" },
  { label: "Diffusion", href: "/activites/diffusion" },
] as const;

const headingClass =
  "mb-5 text-[11px] uppercase tracking-[0.22em] text-accent";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="relative z-10 mx-auto grid max-w-[1680px] grid-cols-1 gap-10 px-5 pb-40 pt-16 sm:px-[clamp(20px,4vw,60px)] md:grid-cols-2 lg:grid-cols-4 lg:gap-[clamp(32px,4vw,64px)] lg:pb-56 lg:pt-24">
        <div>
          <Image
            src="/piccolo.png"
            alt="Piccolo Teatro di Bizerta"
            width={383}
            height={324}
            className="mb-6 h-24 w-auto"
          />
          <p className="mb-6 max-w-[34ch] text-sm leading-7 text-muted">
            Centre culturel et artistique dédié au théâtre, à la création et à
            l’accompagnement des artistes.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {socials.map((social) => (
              <a
                key={social}
                href="#contact"
                className="text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Nous trouver</h2>
          <address className="flex flex-col gap-2.5 text-sm not-italic leading-6 text-muted">
            <span>
              12 rue des Coulisses
              <br />
              1000 Bruxelles
            </span>
            <a href="tel:+3220000000" className="transition-colors hover:text-foreground">
              +32 2 000 00 00
            </a>
            <a
              href="mailto:bonjour@piccoloteatro.be"
              className="transition-colors hover:text-foreground"
            >
              bonjour@piccoloteatro.be
            </a>
            <span>Mar — Sam · 10h — 19h</span>
          </address>
        </div>

        <div>
          <h2 className={headingClass}>Navigation</h2>
          <nav aria-label="Navigation de pied de page" className="flex flex-col gap-2.5">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-3">
              {workshopLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-[11px] uppercase tracking-[0.14em] text-subtle transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {activityLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-[11px] uppercase tracking-[0.14em] text-subtle transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div>
          <h2 className={headingClass}>Newsletter</h2>
          <p className="mb-5 text-sm leading-7 text-muted">
            Les prochains rendez-vous, une fois par mois.
          </p>
          <div className="flex gap-3 border-b border-foreground/20 pb-2.5">
            <input
              type="email"
              aria-label="Votre adresse e-mail"
              placeholder="Votre e-mail"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
            />
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em] text-accent"
            >
              S’inscrire
            </button>
          </div>
          <div className="mt-7 flex flex-wrap gap-4 text-[11px] text-subtle">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <span>© 2026</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4.5vw] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[15.5vw] leading-[0.78] tracking-[-0.03em] text-foreground/[0.055]"
      >
        PICCOLO TEATRO
      </div>
    </footer>
  );
}
