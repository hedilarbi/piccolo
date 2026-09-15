import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cours de danse pour ados à Bizerte | DNA Piccolo",
  description: "DNA — Dance Nation Academy propose un cours de danse pour adolescents à Bizerte, le samedi de 15 h 30 à 17 h. Découvrez le programme et inscrivez-vous.",
  alternates: { canonical: "/ateliers/danse" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {"@type":"WebPage","@id":"https://piccoloteatro.tn/ateliers/danse#webpage","url":"https://piccoloteatro.tn/ateliers/danse","name":"Cours de danse pour ados à Bizerte | DNA Piccolo","description":"DNA — Dance Nation Academy propose un cours de danse pour adolescents à Bizerte, le samedi de 15 h 30 à 17 h. Découvrez le programme et inscrivez-vous.","inLanguage":"fr-TN","isPartOf":{"@id":"https://piccoloteatro.tn/#website"},"publisher":{"@id":"https://piccoloteatro.tn/#organization"},"mainEntity":{"@id":"https://piccoloteatro.tn/ateliers/danse#service"},"breadcrumb":{"@id":"https://piccoloteatro.tn/ateliers/danse#breadcrumb"}},
    {"@type":"Service","@id":"https://piccoloteatro.tn/ateliers/danse#service","name":"Cours de danse pour adolescents à Bizerte","description":"DNA — Dance Nation Academy propose un cours de danse pour adolescents à Bizerte, le samedi de 15 h 30 à 17 h. Découvrez le programme et inscrivez-vous.","url":"https://piccoloteatro.tn/ateliers/danse","serviceType":"Cours de danse pour adolescents à Bizerte","provider":{"@id":"https://piccoloteatro.tn/#organization"},"audience":{"@type":"Audience","audienceType":"Adolescents souhaitant pratiquer la danse à Bizerte"},"areaServed":{"@type":"City","name":"Bizerte"},"availableChannel":[{"@type":"ServiceChannel","serviceLocation":{"@id":"https://piccoloteatro.tn/#place"},"servicePhone":{"@type":"ContactPoint","telephone":"+21656777780","contactType":"inscription à l’atelier DNA","availableLanguage":"fr"}},{"@type":"ServiceChannel","serviceLocation":{"@id":"https://piccoloteatro.tn/#place"},"servicePhone":{"@type":"ContactPoint","telephone":"+21624915817","contactType":"inscription à l’atelier DNA","availableLanguage":"fr"}}]},
    {"@type":"BreadcrumbList","@id":"https://piccoloteatro.tn/ateliers/danse#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://piccoloteatro.tn/"},{"@type":"ListItem","position":2,"name":"Atelier danse DNA","item":"https://piccoloteatro.tn/ateliers/danse"}]}
  ]
};

const ticker = ["Coordination", "Rythme", "Souplesse", "Expression corporelle", "Confiance en soi", "Énergie"];
const photos = [
  "photo-1547153760-18fc86324498", "photo-1512149177596-f817c7ef5d4c", "photo-1535525153412-5a42439a210d", "photo-1524594152303-9fd13543fe6e", "photo-1502519144081-acca18599776",
];
const photos2 = [
  "photo-1519925610903-381054cc2a1c", "photo-1524594152303-9fd13543fe6e", "photo-1502519144081-acca18599776", "photo-1547153760-18fc86324498", "photo-1512149177596-f817c7ef5d4c",
];
const skills = [
  { number: "01", title: "Coordination", description: "Faire dialoguer le haut et le bas du corps, gagner en aisance et en précision." },
  { number: "02", title: "Rythme", description: "Entendre la musique, la compter, puis la laisser guider le mouvement." },
  { number: "03", title: "Souplesse", description: "Ouvrir l’amplitude du geste progressivement, en douceur et en sécurité." },
  { number: "04", title: "Expression corporelle", description: "Faire passer une intention, une émotion, sans un mot." },
  { number: "05", title: "Confiance en soi", description: "Oser bouger devant les autres — et y trouver du plaisir." },
] as const;
const ages = [
  { title: "Enfants", description: "Découvrir son corps en jouant : rythme, espace et premiers mouvements dansés.", image: "photo-1519925610903-381054cc2a1c" },
  { title: "Adolescents", description: "Explorer plusieurs styles, affirmer une gestuelle personnelle, travailler en groupe.", image: "photo-1502519144081-acca18599776" },
  { title: "Adultes", description: "Reprendre la danse ou débuter, à son rythme, dans une ambiance bienveillante.", image: "photo-1524594152303-9fd13543fe6e" },
] as const;
const infos = [
  ["Public", "Enfants, ados et adultes"], ["Niveau", "Aucun prérequis"], ["Au travail", "Mouvements et techniques de danse"], ["Esprit", "Partage, énergie, plaisir"],
] as const;
const beatDelays = ["0s", ".12s", ".24s", ".36s", ".18s", ".06s", ".3s", ".42s", ".15s", ".27s", ".09s", ".33s", ".21s", ".39s"];

function Kicker({ children }: { children: ReactNode }) {
  return <p className="section-kicker">{children}</p>;
}

const imageUrl = (id: string, dimensions = "w=700&h=930") =>
  `https://images.unsplash.com/${id}?${dimensions}&fit=crop&q=75`;

export default function DnaWorkshopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate flex min-h-svh flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden [clip-path:inset(0)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(122deg,#0d0d0d_0_14px,#080808_14px_28px)]" />
          <Image src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=1800&h=1200&fit=crop&q=80" alt="" fill priority sizes="100vw" className="dna-drift object-cover brightness-[.52] contrast-[1.08] will-change-transform" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_62%_40%,rgba(239,47,41,.22),transparent_72%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.72)_0%,rgba(5,5,5,.1)_42%,rgba(5,5,5,.96)_100%)]" />
        </div>

        <div className="site-container relative z-[3] pb-[clamp(24px,3.5vh,44px)] pt-[clamp(104px,13vh,150px)]">
          <Link href="/#ateliers" className="mb-[clamp(22px,4vh,44px)] inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[.18em] text-[#AAA6A3] hover:text-[#EF2F29]">← Ateliers</Link>
          <div className="mb-5 flex items-center gap-3.5"><span className="font-mono text-xs tracking-[.2em] text-[#EF2F29]">02</span><span className="h-px w-[46px] bg-[#EF2F29]" /><span className="text-[11.5px] uppercase tracking-[.3em] text-[#AAA6A3]">Atelier de danse</span></div>
          <h1 className="flex flex-wrap font-display text-[clamp(66px,13vw,220px)] font-normal leading-[.86] tracking-[-.03em]">
            {["D", "N", "A"].map((letter) => <span key={letter} className="dna-letter inline-block">{letter}</span>)}<span className="dna-letter inline-block italic text-[#EF2F29]">.</span>
          </h1>
          <p data-reveal style={{ "--reveal-delay": "380ms" } as CSSProperties} className="mt-[clamp(26px,3vw,40px)] max-w-[46ch] text-[clamp(16px,1.25vw,20px)] leading-[1.7] text-[#AAA6A3]">Un atelier dynamique et créatif : on découvre la danse par le mouvement, le rythme et le plaisir d’être ensemble.</p>
        </div>

        <div className="relative z-[3] overflow-hidden border-y border-[rgba(243,239,233,.12)] bg-[rgba(5,5,5,.4)] py-4">
          <div className="dna-marquee flex w-max will-change-transform">
            {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-[clamp(18px,2.4vw,34px)] whitespace-nowrap pr-[clamp(18px,2.4vw,34px)] font-display text-[clamp(16px,1.5vw,22px)]">{item}<i className="h-1.5 w-1.5 rounded-full bg-[#EF2F29]" /></span>)}
          </div>
        </div>
      </section>

      <section className="pb-[clamp(50px,7vh,90px)] pt-[clamp(80px,12vh,150px)]">
        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,60px)]"><p data-reveal className="font-display text-[clamp(24px,2.9vw,44px)] leading-[1.34] tracking-[-.005em]">Enfants, adolescents et adultes découvrent différents mouvements et techniques de danse, en travaillant la coordination, le rythme, la souplesse, l’expression corporelle et la <em className="font-normal text-[#EF2F29]">confiance en soi</em>.</p></div>
      </section>

      <section className="overflow-hidden pb-[clamp(80px,12vh,140px)] pt-[clamp(20px,4vh,50px)]">
        <div className="dna-marquee-slow flex w-max gap-0.5 will-change-transform">
          {[...photos, ...photos].map((photo, index) => <div key={`${photo}-${index}`} className="relative aspect-[3/4] w-[clamp(200px,22vw,340px)] overflow-hidden bg-[#0d0d0d]"><Image src={imageUrl(photo)} alt="" fill sizes="22vw" className="object-cover brightness-[.82]" /></div>)}
        </div>
        <div className="dna-marquee-reverse mt-0.5 flex w-max gap-0.5 will-change-transform">
          {[...photos2, ...photos2].map((photo, index) => <div key={`${photo}-${index}`} className="relative aspect-[4/3] w-[clamp(160px,17vw,260px)] overflow-hidden bg-[#0d0d0d]"><Image src={imageUrl(photo, "w=600&h=450")} alt="" fill sizes="17vw" className="object-cover brightness-[.7]" /></div>)}
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-[clamp(60px,9vh,110px)]">
        <div className="site-container">
          <div className="mb-[clamp(34px,5vh,60px)] flex flex-wrap items-end justify-between gap-[30px]">
            <h2 data-reveal className="font-display text-[clamp(30px,3.6vw,54px)] font-normal leading-[1.06]">Au <em className="font-normal">programme</em></h2>
            <div aria-hidden="true" className="flex h-[46px] items-end gap-[5px]">{beatDelays.map((delay, index) => <span key={index} className="dna-beat h-full w-[3px] origin-bottom bg-[#EF2F29]" style={{ animationDelay: delay }} />)}</div>
          </div>
          <div>{skills.map((skill) => <div key={skill.title} data-reveal className="dna-row grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-baseline gap-[clamp(14px,2.5vw,50px)] border-t border-[rgba(243,239,233,.12)] py-[clamp(22px,3vw,36px)] transition-[opacity,transform,background] duration-700 hover:bg-[rgba(243,239,233,.03)]"><div className="flex items-baseline gap-[clamp(16px,2vw,28px)]"><span className="font-mono text-xs tracking-[.1em] text-[#EF2F29]">{skill.number}</span><h3 className="font-display text-[clamp(24px,2.6vw,40px)] leading-[1.1]">{skill.title}</h3></div><p className="max-w-[52ch] text-[clamp(14.5px,1.05vw,16.5px)] leading-[1.75] text-[#AAA6A3]">{skill.description}</p></div>)}</div>
        </div>
      </section>

      <section className="py-[clamp(80px,12vh,150px)]">
        <div className="site-container">
          <div className="mb-[clamp(30px,4.5vh,54px)]"><Kicker>Pour qui</Kicker></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(16px,2.4vw,36px)]">{ages.map((age) => <article key={age.title} data-reveal className="group"><div className="relative mb-[22px] aspect-[4/5] overflow-hidden bg-[#0d0d0d]"><Image src={imageUrl(age.image, "w=800&h=1000")} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover brightness-[.72] transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:brightness-95" /></div><h3 className="mb-2.5 font-display text-[clamp(21px,1.8vw,28px)]">{age.title}</h3><p className="max-w-[32ch] text-[14.5px] leading-[1.7] text-[#AAA6A3]">{age.description}</p></article>)}</div>
        </div>
      </section>

      <section id="pratique" className="scroll-mt-28 bg-[#0A0A0A] py-[clamp(70px,10vh,120px)]"><div className="site-container"><div className="mb-11"><Kicker>En pratique</Kicker></div><div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(28px,3.5vw,54px)]">{infos.map(([label, value]) => <div key={label} data-reveal><p className="mb-3.5 text-[11px] uppercase tracking-[.22em] text-[#EF2F29]">{label}</p><p className="font-display text-[clamp(19px,1.6vw,26px)] leading-[1.35]">{value}</p></div>)}</div></div></section>

      <section className="relative flex min-h-[78svh] items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden"><div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#131313_0_12px,#0b0b0b_12px_24px)]" /><div data-parallax="0.12" className="absolute -inset-[8%]"><Image src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1800&h=1100&fit=crop&q=80" alt="" fill sizes="100vw" className="object-cover brightness-[.42]" /></div><div className="dna-halo absolute inset-0 bg-[radial-gradient(46%_58%_at_50%_52%,rgba(239,47,41,.3),transparent_70%)]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.7),rgba(5,5,5,.45)_45%,rgba(5,5,5,.85))]" /></div>
        <div className="relative z-[2] mx-auto w-full max-w-[1000px] px-[clamp(20px,4vw,60px)] py-[clamp(60px,9vh,110px)] text-center"><p data-reveal className="mb-6 text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-[#AAA6A3]">Un moment de partage, d’énergie et de plaisir à travers la danse.</p><h2 data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties} className="mb-[38px] font-display text-[clamp(42px,7vw,120px)] leading-[.95] tracking-[-.025em]">Venez <em className="font-normal text-[#EF2F29]">danser</em></h2><div data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties} className="flex flex-wrap justify-center gap-3.5"><a href="tel:+21656777780" className="bg-[#EF2F29] px-8 py-[17px] text-xs uppercase tracking-[.16em] text-[#050505] transition hover:-translate-y-[3px] hover:shadow-[0_20px_48px_rgba(239,47,41,.35)]">Appeler le 56 777 780</a><Link href="/#ateliers" className="border border-[rgba(243,239,233,.24)] px-8 py-[17px] text-xs uppercase tracking-[.16em] transition hover:-translate-y-[3px] hover:border-[#F3EFE9]">Les autres ateliers</Link></div></div>
      </section>
    </>
  );
}
