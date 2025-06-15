"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

interface EditCategoryFormProps {
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

// Mock data - replace with actual API call
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Pain Relief",
    description: "Medications for pain management",
    status: "active",
  },
  {
    id: "2",
    name: "Antibiotics",
    description: "Antibacterial medications",
    status: "active",
  },
  {
    id: "3",
    name: "Vitamins",
    description: "Nutritional supplements",
    status: "active",
  },
];

export function EditCategoryForm({ categoryId }: EditCategoryFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch category data
    const fetchCategory = async () => {
      try {
        // TODO: Replace with actual API call
        const foundCategory = mockCategories.find((c) => c.id === categoryId);
        if (foundCategory) {
          setCategory(foundCategory);
        } else {
          throw new Error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        Swal.fire({
          title: t("common.error"),
          text: t("categories.fetchError.message"),
          icon: "error",
          confirmButtonText: t("common.ok"),
        }).then(() => {
          router.push(`/${locale}/admin/categories`);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, t, locale, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const categoryData = {
      name: formData.get("name"),
      description: formData.get("description"),
      status: formData.get("status"),
    };

    try {
      // TODO: Replace with actual API call
      console.log("Updating category:", categoryData);
      
      // Show success message
      await Swal.fire({
        title: t("categories.updateSuccess.title"),
        text: t("categories.updateSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
      });

      // Reset dirty state
      setIsDirty(false);
      
      // Redirect to categories list
      router.push(`/${locale}/admin/categories`);
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        title: t("common.error"),
        text: t("categories.updateError.message"),
        icon: "error",
        confirmButtonText: t("common.ok"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (isDirty) {
      const result = await Swal.fire({
        title: t("common.unsavedChanges.title"),
        text: t("common.unsavedChanges.message"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("common.leave"),
        cancelButtonText: t("common.stay"),
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-lg",
          confirmButton: "rounded-md",
          cancelButton: "rounded-md",
        },
      });

      if (result.isConfirmed) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} onChange={() => setIsDirty(true)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            {t("categories.name")}
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={category.name}
            placeholder={t("categories.namePlaceholder")}
            required
            className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            {t("categories.description")}
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={category.description}
            placeholder={t("categories.descriptionPlaceholder")}
            required
            className="mt-1 min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            {t("categories.status.label")}
          </Label>
          <Select name="status" defaultValue={category.status}>
            <SelectTrigger className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder={t("categories.selectStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                {t("categories.statusTypes.active")}
              </SelectItem>
              <SelectItem value="inactive">
                {t("categories.statusTypes.inactive")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={handleCancel}
          className="bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
        >
          {t("common.cancel")}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          {isSubmitting ? t("common.saving") : t("common.save")}
        </Button>
      </div>
    </form>
  );
} 