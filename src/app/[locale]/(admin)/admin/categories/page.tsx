"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { PageHeader } from "@/components/layout/page-header";
import { SearchBar } from "@/components/layout/search-bar";
import { DataTable } from "@/components/layout/data-table";
import { Edit, Trash, FolderPlus, MoreVertical, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: "active" | "inactive";
  lastUpdated: string;
}

// Generate mock data
const generateMockCategories = (): Category[] => {
  const categories: Category[] = [
    {
      id: "1",
      name: "Pain Relief",
      description: "Medications for pain management",
      productCount: 15,
      status: "active",
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Antibiotics",
      description: "Antibacterial medications",
      productCount: 8,
      status: "active",
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Vitamins",
      description: "Nutritional supplements",
      productCount: 12,
      status: "active",
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "4",
      name: "First Aid",
      description: "Emergency medical supplies",
      productCount: 6,
      status: "active",
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Skin Care",
      description: "Dermatological products",
      productCount: 10,
      status: "active",
      lastUpdated: new Date().toISOString(),
    },
  ];

  return categories;
};

export default function CategoriesPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories] = useState<Category[]>(generateMockCategories());
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

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("categories.deleteConfirm.title"),
      text: t("categories.deleteConfirm.message"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.delete"),
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
        console.log("Delete category:", id);
        // Show success message
        Swal.fire({
          title: t("categories.deleteSuccess.title"),
          text: t("categories.deleteSuccess.message"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        // Show error message
        Swal.fire({
          title: t("categories.deleteError.title"),
          text: t("categories.deleteError.message"),
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

  const columns = [
    {
      header: t("categories.name"),
      accessorKey: "name" as keyof Category,
    },
    {
      header: t("categories.description"),
      accessorKey: "description" as keyof Category,
    },
    {
      header: t("categories.productCount"),
      accessorKey: "productCount" as keyof Category,
    },
    {
      header: t("categories.status"),
      accessorKey: "status" as keyof Category,
      cell: ({ row }: { row: { original: Category } }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {t(`categories.statusTypes.${status}`)}
          </Badge>
        );
      },
    },
    {
      header: t("categories.lastUpdated"),
      accessorKey: "lastUpdated" as keyof Category,
      cell: ({ row }: { row: { original: Category } }) => formatDate(row.original.lastUpdated),
    },
    {
      header: t("common.actions"),
      accessorKey: "id" as keyof Category,
      cell: ({ row }: { row: { original: Category } }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] shadow-lg border-0 bg-white">
              <DropdownMenuItem
                onClick={() => router.push(`/${locale}/admin/categories/${category.id}`)}
                className="cursor-pointer text-gray-700 hover:bg-gray-100"
              >
                <Eye className="mr-2 h-4 w-4" />
                {t("common.view")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/${locale}/admin/categories/${category.id}/edit`)}
                className="cursor-pointer text-gray-700 hover:bg-gray-100"
              >
                <Edit className="mr-2 h-4 w-4" />
                {t("common.edit")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(category.id)}
                className="cursor-pointer text-red-600 hover:bg-red-50"
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("common.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("categories.title")}
        description={t("categories.description")}
        action={{
          label: t("categories.addNew"),
          onClick: () => router.push(`/${locale}/admin/categories/new`),
          icon: <FolderPlus className="mr-2 h-4 w-4" />,
        }}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          placeholder={t("categories.searchPlaceholder")}
          value={searchQuery}
          onChange={(value: string) => setSearchQuery(value)}
          className="w-full sm:w-64"
        />
      </div>

      <DataTable
        columns={columns}
        data={currentCategories}
        className="border border-gray-200 rounded-lg"
      />

      {renderPagination()}
    </div>
  );
}
