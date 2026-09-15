import type { Metadata } from "next";
import Link from "next/link";
import { ArticlesManager } from "@/components/admin/articles-manager";
import { getDb } from "@/lib/mongodb";
import { serializeArticle, type ArticleDocument } from "@/lib/articles";

export const metadata: Metadata = { title: "Actualités" };

export default async function Page() {
  const articles = await (await getDb()).collection<ArticleDocument>("articles").find().sort({ publishedAt: -1 }).toArray();
  return <ArticlesManager initialItems={articles.map(serializeArticle)} />;
}
