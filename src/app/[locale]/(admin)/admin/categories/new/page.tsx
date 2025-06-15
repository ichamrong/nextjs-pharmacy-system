"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/layout/page-header";
import { NewCategoryForm } from "./new-category-form";

export default function NewCategoryPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("categories.addNew")}
        description={t("categories.addDescription")}
        action={{
          label: t("common.cancel"),
          onClick: () => router.back(),
        }}
      />
      <NewCategoryForm />
    </div>
  );
} 