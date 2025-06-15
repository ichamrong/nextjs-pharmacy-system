"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/layout/page-header";
import { EditCategoryForm } from "./edit-category-form";
import { use } from "react";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const { id } = use(params);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("categories.edit")}
        description={t("categories.editDescription")}
        action={{
          label: t("common.cancel"),
          onClick: () => router.back(),
        }}
      />
      <EditCategoryForm categoryId={id} />
    </div>
  );
} 