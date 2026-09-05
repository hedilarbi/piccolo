import type { Metadata } from "next";
import { PaintingWorkshop } from "@/components/site/home/painting-workshop";

export const metadata: Metadata = {
  title: "Atelier Peinture — Mel Art",
  description: "Un espace artistique où enfants, adolescents et adultes découvrent la peinture et libèrent leur imagination.",
};

export default function PaintingWorkshopPage() {
  return <PaintingWorkshop />;
}
