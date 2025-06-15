"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/layout/page-header";
import ViewCategory from "./view-category";
import { use } from "react";

interface ViewCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ViewCategoryPage({ params }: ViewCategoryPageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const { id } = use(params);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("categories.view")}
        description={t("categories.viewDescription")}
        action={{
          label: t("common.back"),
          onClick: () => router.back(),
        }}
      />
      <ViewCategory categoryId={id} />
    </div>
  );
} 