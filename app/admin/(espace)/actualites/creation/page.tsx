import type { Metadata } from "next";
import { ArticleCreateForm } from "@/components/admin/article-create-form";

export const metadata: Metadata = { title: "Créer une actualité" };

export default function CreateArticlePage() {
  return <ArticleCreateForm />;
}
