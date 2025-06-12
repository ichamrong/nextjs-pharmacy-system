"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

// Mock categories - replace with actual data from your backend
const categories = [
  "Pain Relief",
  "Antibiotics",
  "Vitamins",
  "First Aid",
  "Skin Care",
  "Eye Care",
  "Dental Care",
];

export default function NewProductPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Track form changes
  const handleFormChange = () => {
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name"),
      category: formData.get("category"),
      status: "in_stock", // Default status for new products
    };

    try {
      // TODO: Replace with actual API call
      console.log("Product data:", productData);
      
      // Show success message
      await Swal.fire({
        title: t("products.addSuccess.title"),
        text: t("products.addSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
      });

      // Reset dirty state
      setIsDirty(false);
      
      // Redirect to products list
      router.push("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: t("common.error"),
        text: t("products.addError.message"),
        icon: "error",
        confirmButtonText: t("common.ok"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel/back navigation
  const handleCancel = async () => {
    if (isDirty) {
      const result = await Swal.fire({
        title: t("products.cancelConfirm.title"),
        text: t("products.cancelConfirm.message"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("common.yes"),
        cancelButtonText: t("common.no"),
        confirmButtonColor: "#ef4444",
      });

      if (result.isConfirmed) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("common.back")}
        </Button>
        <h1 className="text-2xl font-bold">{t("products.addNew")}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("products.name")}
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t("products.namePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                {t("products.category")}
              </label>
              <Select name="category" required onValueChange={handleFormChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t("products.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("common.saving") : t("common.save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 