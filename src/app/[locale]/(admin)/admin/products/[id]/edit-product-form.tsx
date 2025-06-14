"use client";

import { useState, useEffect } from "react";
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

// Mock data - replace with actual API call
const mockProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    status: "inStock",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    status: "lowStock",
  },
  {
    id: 3,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    status: "outOfStock",
  },
];

interface Product {
  id: number;
  name: string;
  category: string;
  status: string;
}

interface EditProductFormProps {
  productId: string;
}

export default function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProduct = async () => {
      try {
        // Simulate API call
        const foundProduct = mockProducts.find(p => p.id === parseInt(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Handle product not found
          Swal.fire({
            title: t("common.error"),
            text: t("products.notFound"),
            icon: "error",
            confirmButtonText: t("common.ok"),
          }).then(() => {
            router.push("/admin/products");
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          title: t("common.error"),
          text: t("products.fetchError"),
          icon: "error",
          confirmButtonText: t("common.ok"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router, t]);

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
      id: parseInt(productId),
      name: formData.get("name"),
      category: formData.get("category"),
      status: "inStock", // Default status for edited products
    };

    try {
      // TODO: Replace with actual API call
      console.log("Updating product:", productData);
      
      // Show success message
      await Swal.fire({
        title: t("products.updateSuccess.title"),
        text: t("products.updateSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
      });

      // Reset dirty state
      setIsDirty(false);
      
      // Redirect to products list
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: t("common.error"),
        text: t("products.updateError.message"),
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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">{t("common.loading")}</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

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
        <h1 className="text-2xl font-bold">{t("products.edit")}</h1>
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
                defaultValue={product.name}
                placeholder={t("products.namePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                {t("products.category")}
              </label>
              <Select 
                name="category" 
                required 
                defaultValue={product.category}
                onValueChange={handleFormChange}
              >
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