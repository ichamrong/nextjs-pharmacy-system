"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ViewProductProps {
  productId: string;
}

export default function ViewProduct({ productId }: ViewProductProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
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

  const handleEdit = () => {
    router.push(`/${locale}/admin/products/${productId}/edit`);
  };

  const handleBack = () => {
    router.back();
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
        title={t("products.view")}
        description={t("products.viewDescription")}
        action={{
          label: t("common.back"),
          onClick: handleBack,
          icon: <ArrowLeft className="mr-2 h-4 w-4" />,
        }}
      />

      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">
              {t("products.productInformation")}
            </CardTitle>
            <Button
              onClick={handleEdit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Pencil className="mr-2 h-4 w-4" />
              {t("common.edit")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("products.name")}
              </div>
              <div className="text-gray-900">{product.name}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("products.category")}
              </div>
              <div className="text-gray-900">
                {t(`products.categories.${product.category.toLowerCase().replace(/\s+/g, '')}`)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("products.price")}
              </div>
              <div className="text-gray-900">${product.price.toFixed(2)}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("products.stock")}
              </div>
              <div className="text-gray-900">{product.stock}</div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("products.description")}
              </div>
              <div className="text-gray-900 whitespace-pre-wrap">
                {product.description}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 