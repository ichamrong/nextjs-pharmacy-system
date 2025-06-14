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
import { PageHeader } from "@/components/layout/page-header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    price: 5.99,
    stock: 100,
    description: "Pain relief medication",
    status: "low_stock",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 12.99,
    stock: 50,
    description: "Antibiotic medication",
    status: "low_stock",
  },
  {
    id: 3,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 7.99,
    stock: 75,
    description: "Anti-inflammatory medication",
    status: "low_stock",
  },
];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  status: string;
}

interface EditProductFormProps {
  productId: string;
}

export default function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
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
            router.push(`/${locale}/admin/products`);
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
  }, [productId, router, t, locale]);

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
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      description: formData.get("description"),
      status: "low_stock", // Default status for edited products
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
      router.push(`/${locale}/admin/products`);
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
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("products.edit")}
        description={t("products.addDescription")}
        action={{
          label: t("common.back"),
          onClick: handleCancel,
          icon: <ArrowLeft className="mr-2 h-4 w-4" />,
        }}
      />

      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <CardTitle className="text-lg font-medium text-gray-900">
            {t("products.productInformation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  {t("products.name")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  defaultValue={product.name}
                  placeholder={t("products.namePlaceholder")}
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  {t("products.category")}
                </Label>
                <Select 
                  name="category" 
                  required 
                  defaultValue={product.category}
                  onValueChange={handleFormChange}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-300 focus:ring-gray-300">
                    <SelectValue placeholder={t("products.selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(`products.categories.${category.toLowerCase().replace(/\s+/g, '')}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  {t("products.price")}
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  defaultValue={product.price}
                  placeholder={t("products.pricePlaceholder")}
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                  {t("products.stock")}
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  defaultValue={product.stock}
                  placeholder={t("products.stockPlaceholder")}
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  {t("products.description")}
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={product.description}
                  placeholder={t("products.descriptionPlaceholder")}
                  className="w-full min-h-[100px] border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                {t("common.cancel")}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isSubmitting ? t("common.saving") : t("common.save")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 