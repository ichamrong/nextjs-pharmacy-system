"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

interface ViewCategoryProps {
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  productCount: number;
  lastUpdated: string;
}

// Mock data - replace with actual API call
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Pain Relief",
    description: "Medications for pain management",
    status: "active",
    productCount: 15,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Antibiotics",
    description: "Antibacterial medications",
    status: "active",
    productCount: 8,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Vitamins",
    description: "Nutritional supplements",
    status: "active",
    productCount: 12,
    lastUpdated: new Date().toISOString(),
  },
];

export default function ViewCategory({ categoryId }: ViewCategoryProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (locale === "km") {
      const khmerMonths = [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ",
      ];
      const toKhmerNumeral = (n: number) => {
        const khmerNumerals = [
          "០",
          "១",
          "២",
          "៣",
          "៤",
          "៥",
          "៦",
          "៧",
          "៨",
          "៩",
        ];
        return n
          .toString()
          .split("")
          .map((d) => khmerNumerals[Number(d)])
          .join("");
      };
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "ល្ងាច" : "ព្រឹក";
      const khmerHours = toKhmerNumeral(hours % 12 || 12);
      const khmerMinutes = toKhmerNumeral(
        Number(minutes.toString().padStart(2, "0")),
      );
      return `${toKhmerNumeral(date.getDate())} ${khmerMonths[date.getMonth()]} ${toKhmerNumeral(date.getFullYear())}, ${khmerHours}:${khmerMinutes} ${period}`;
    }
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">
              {t("categories.viewDescription")}
            </CardTitle>
            <Button
              onClick={() => router.push(`/${locale}/admin/categories/${categoryId}/edit`)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <Edit className="mr-2 h-4 w-4" />
              {t("common.edit")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("categories.name")}
                </h3>
                <p className="mt-1 text-sm text-gray-900">{category.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("categories.description")}
                </h3>
                <p className="mt-1 text-sm text-gray-900">{category.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("categories.status.label")}
                </h3>
                <div className="mt-1">
                  <Badge
                    variant={category.status === "active" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {t(`categories.statusTypes.${category.status}`)}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("categories.productCount")}
                </h3>
                <p className="mt-1 text-sm text-gray-900">{category.productCount}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("categories.lastUpdated")}
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(category.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>
      </div>
    </div>
  );
} 