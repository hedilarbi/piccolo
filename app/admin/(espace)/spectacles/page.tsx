import type { Metadata } from "next";
import { SpectaclesManager } from "@/components/admin/spectacles-manager";
import { getDb } from "@/lib/mongodb";
import { serializeSpectacle, type SpectacleDocument } from "@/lib/spectacle-admin";
export const metadata: Metadata = { title: "Spectacles" };
export default async function Page() { const items = await (await getDb()).collection<SpectacleDocument>("spectacles").find().sort({ createdAt: -1 }).toArray(); return <SpectaclesManager initialItems={items.map(serializeSpectacle)} />; }
