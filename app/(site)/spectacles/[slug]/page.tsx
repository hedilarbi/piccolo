import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpectaclePage } from "@/components/site/spectacle-page";
import { getSpectacle, spectacles } from "@/lib/spectacles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spectacles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const spectacle = await getSpectacle((await params).slug);
  if (!spectacle) return {};
  return { title: spectacle.title, description: spectacle.description };
}

export default async function Page({ params }: Props) {
  const spectacle = await getSpectacle((await params).slug);
  if (!spectacle) notFound();
  return <SpectaclePage spectacle={spectacle} />;
}
