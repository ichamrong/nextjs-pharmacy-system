"use client";

import { useState } from "react";
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

export function NewCategoryForm() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to create category
      console.log("Creating category:", formData);

      // Show success message
      await Swal.fire({
        title: t("categories.createSuccess.title"),
        text: t("categories.createSuccess.message"),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to categories list
      router.push(`/${locale}/admin/categories`);
    } catch (error) {
      // Show error message
      Swal.fire({
        title: t("categories.createError.title"),
        text: t("categories.createError.message"),
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            {t("categories.name")}
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
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
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder={t("categories.descriptionPlaceholder")}
            required
            className="mt-1 min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            {t("categories.status.label")}
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
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