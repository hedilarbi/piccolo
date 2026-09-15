import type { Metadata } from "next";
import { getDb } from "@/lib/mongodb";
import { CandidaturesManager } from "@/components/admin/candidatures-manager";

export const metadata: Metadata = { title: "Candidatures" };

export default async function CandidaturesPage() {
  const db = await getDb();
  
  const candidatures = await db.collection("candidatures").aggregate([
    {
      $lookup: {
        from: "spectacles",
        localField: "spectacleId",
        foreignField: "_id",
        as: "spectacle"
      }
    },
    {
      $unwind: {
        path: "$spectacle",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: { $toString: "$_id" },
        spectacleTitle: { $ifNull: ["$spectacle.title", "Spectacle supprimé"] },
        lieu: 1,
        ville: 1,
        jauge: 1,
        contact: 1,
        email: 1,
        slot: 1,
        firstPart: 1,
        plateau: 1,
        createdAt: { $toString: "$createdAt" }
      }
    },
    { $sort: { createdAt: -1 } }
  ]).toArray();

  return <CandidaturesManager items={candidatures as any} />;
}
