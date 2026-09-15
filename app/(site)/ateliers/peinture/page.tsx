import type { Metadata } from "next";
import { PaintingWorkshop } from "@/components/site/home/painting-workshop";

export const metadata: Metadata = {
  title: "Atelier peinture enfant à Bizerte | Mel Art Piccolo",
  description: "Mel Art propose un atelier de peinture et d’arts plastiques à Bizerte pour les enfants et adolescents : couleurs, dessin, matières et créativité.",
  alternates: { canonical: "/ateliers/peinture" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {"@type":"WebPage","@id":"https://piccoloteatro.tn/ateliers/peinture#webpage","url":"https://piccoloteatro.tn/ateliers/peinture","name":"Atelier peinture enfant à Bizerte | Mel Art Piccolo","description":"Mel Art propose un atelier de peinture et d’arts plastiques à Bizerte pour les enfants et adolescents : couleurs, dessin, matières et créativité.","inLanguage":"fr-TN","isPartOf":{"@id":"https://piccoloteatro.tn/#website"},"publisher":{"@id":"https://piccoloteatro.tn/#organization"},"mainEntity":{"@id":"https://piccoloteatro.tn/ateliers/peinture#service"},"breadcrumb":{"@id":"https://piccoloteatro.tn/ateliers/peinture#breadcrumb"}},
    {"@type":"Service","@id":"https://piccoloteatro.tn/ateliers/peinture#service","name":"Atelier de peinture et d’arts plastiques à Bizerte","description":"Mel Art propose un atelier de peinture et d’arts plastiques à Bizerte pour les enfants et adolescents : couleurs, dessin, matières et créativité.","url":"https://piccoloteatro.tn/ateliers/peinture","serviceType":"Atelier de peinture et d’arts plastiques à Bizerte","provider":{"@id":"https://piccoloteatro.tn/#organization"},"audience":{"@type":"Audience","audienceType":"Enfants de 4 à 8 ans et adolescents intéressés par la peinture et les arts plastiques à Bizerte"},"areaServed":{"@type":"City","name":"Bizerte"}},
    {"@type":"BreadcrumbList","@id":"https://piccoloteatro.tn/ateliers/peinture#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://piccoloteatro.tn/"},{"@type":"ListItem","position":2,"name":"Atelier peinture Mel Art","item":"https://piccoloteatro.tn/ateliers/peinture"}]}
  ]
};

export default function PaintingWorkshopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PaintingWorkshop />
    </>
  );
}
