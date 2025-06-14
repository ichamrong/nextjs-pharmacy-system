"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { PageHeader } from "@/components/layout/page-header";
import { SearchBar } from "@/components/layout/search-bar";
import { DataTable } from "@/components/layout/data-table";
import { FilterDrawer } from "@/components/layout/filter-drawer";
import { Edit, Trash, PackagePlus, MoreVertical, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ClientWrapper } from "@/components/client-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "low_stock";
  lastUpdated: string;
}

// Generate mock data
const generateMockProducts = (): Product[] => {
  const categories = ["Pain Relief", "Antibiotics", "Vitamins", "First Aid", "Skin Care"];
  const products: Product[] = [];

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const lastUpdated = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ).toISOString();

    products.push({
      id: i.toString(),
      name: `Product ${i}`,
      category,
      price: parseFloat((Math.random() * 100).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
      status: "low_stock",
      lastUpdated,
    });
  }

  return products;
};

export default function ProductsPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [products] = useState<Product[]>(generateMockProducts());
  const itemsPerPage = 5;

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("products.deleteConfirm.title"),
      text: t("products.deleteConfirm.description"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("products.delete"),
      cancelButtonText: t("common.cancel"),
      confirmButtonColor: "#ef4444",
      customClass: {
        popup: "rounded-lg",
        confirmButton: "rounded-md",
        cancelButton: "rounded-md",
      },
    });

    if (result.isConfirmed) {
      try {
        // Handle delete logic here
        console.log("Delete product:", id);
        // Show success message
        Swal.fire({
          title: t("products.deleteSuccess.title"),
          text: t("products.deleteSuccess.message"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        // Show error message
        Swal.fire({
          title: t("products.deleteError.title"),
          text: t("products.deleteError.message"),
          icon: "error",
        });
      }
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="border-gray-200 hover:bg-gray-100 disabled:opacity-50"
        >
          {t("common.previous")}
        </Button>
        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={`min-w-[32px] h-8 px-2 ${
                currentPage === page
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="border-gray-200 hover:bg-gray-100 disabled:opacity-50"
        >
          {t("common.next")}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("products.title")}
        description={t("products.description")}
        action={{
          label: t("products.addNew"),
          onClick: () => router.push(`/${locale}/admin/products/new`),
          icon: <PackagePlus className="mr-2 h-4 w-4" />,
        }}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          placeholder={t("products.searchPlaceholder")}
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full sm:w-64"
        />
        <div className="w-full sm:w-auto flex justify-end">
          <FilterDrawer
            title={t("products.filters")}
            onApply={() => {
              // Apply filters
              setCurrentPage(1);
            }}
            onReset={() => {
              setCategoryFilter("all");
              setStatusFilter("all");
              setCurrentPage(1);
            }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-filter" className="text-sm font-medium">
                    {t("products.filterByCategory")}
                  </Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category-filter" className="w-full">
                      <SelectValue placeholder={t("products.selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("products.allCategories")}</SelectItem>
                      <SelectItem value="Pain Relief">{t("products.categories.painRelief")}</SelectItem>
                      <SelectItem value="Antibiotics">{t("products.categories.antibiotics")}</SelectItem>
                      <SelectItem value="Vitamins">{t("products.categories.vitamins")}</SelectItem>
                      <SelectItem value="First Aid">{t("products.categories.firstAid")}</SelectItem>
                      <SelectItem value="Skin Care">{t("products.categories.skinCare")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter" className="text-sm font-medium">
                    {t("products.filterByStatus")}
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter" className="w-full">
                      <SelectValue placeholder={t("products.selectStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("products.allStatuses")}</SelectItem>
                      <SelectItem value="low_stock">{t("products.statusTypes.low_stock")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </FilterDrawer>
        </div>
      </div>

      <DataTable
        columns={[
          {
            header: t("products.name"),
            accessorKey: "name",
          },
          {
            header: t("products.category"),
            accessorKey: "category",
          },
          {
            header: t("products.price"),
            accessorKey: "price",
            cell: ({ row }) => (
              <ClientWrapper>
                ${row.original.price.toFixed(2)}
              </ClientWrapper>
            ),
          },
          {
            header: t("products.stock"),
            accessorKey: "stock",
          },
          {
            header: t("products.status"),
            accessorKey: "status",
            cell: ({ row }) => (
              <ClientWrapper>
                <Badge
                  variant="outline"
                  className="capitalize bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  {t(`products.statusTypes.${row.original.status}`)}
                </Badge>
              </ClientWrapper>
            ),
          },
          {
            header: t("products.lastUpdated"),
            accessorKey: "lastUpdated",
            cell: ({ row }) => (
              <ClientWrapper>
                {formatDate(row.original.lastUpdated)}
              </ClientWrapper>
            ),
          },
          {
            header: t("products.actions"),
            accessorKey: "id",
            cell: ({ row }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-emerald-50/50 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[160px] bg-white shadow-lg rounded-lg border-0 py-1"
                >
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/${locale}/admin/products/${row.original.id}`)
                    }
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-gray-700"
                  >
                    <Eye className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{t("products.view")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/${locale}/admin/products/${row.original.id}/edit`,
                      )
                    }
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-gray-700"
                  >
                    <Edit className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{t("products.edit")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(row.original.id)}
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4 text-red-600" />
                    <span>{t("products.delete")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]}
        data={currentProducts}
      />

      <div className="flex justify-center mt-6">{renderPagination()}</div>
    </div>
  );
}
