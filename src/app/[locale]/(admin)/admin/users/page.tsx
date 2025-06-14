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
import { Edit, Trash, UserPlus, MoreVertical, Eye } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "pharmacist" | "cashier";
  status: "active" | "inactive";
  lastLogin: string;
}

// Generate mock data
const generateMockUsers = (): User[] => {
  const roles: User["role"][] = ["admin", "pharmacist", "cashier"];
  const statuses: User["status"][] = ["active", "inactive"];
  const users: User[] = [];

  for (let i = 1; i <= 50; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const lastLogin = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ).toISOString();

    users.push({
      id: i.toString(),
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role,
      status,
      lastLogin,
    });
  }

  return users;
};

export default function UsersPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [users] = useState<User[]>(generateMockUsers());
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("users.deleteConfirmTitle"),
      text: t("users.deleteConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("users.delete"),
      cancelButtonText: t("users.cancel"),
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
        console.log("Delete user:", id);
        // Show success message
        Swal.fire({
          title: t("users.deleteSuccess"),
          text: t("users.userDeleted"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        // Show error message
        Swal.fire({
          title: t("users.deleteError"),
          text: t("users.deleteErrorDescription"),
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
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
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
        title={t("users.title")}
        description={t("users.description")}
        action={{
          label: t("users.addNew"),
          onClick: () => router.push(`/${locale}/admin/users/new`),
          icon: <UserPlus className="mr-2 h-4 w-4" />,
        }}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          placeholder={t("users.searchPlaceholder")}
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full sm:w-64"
        />
        <div className="w-full sm:w-auto flex justify-end">
          <FilterDrawer
            title={t("users.filters")}
            onApply={() => {
              // Apply filters
              setCurrentPage(1);
            }}
            onReset={() => {
              setRoleFilter("all");
              setStatusFilter("all");
              setCurrentPage(1);
            }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-filter" className="text-sm font-medium">
                    {t("users.filterByRole")}
                  </Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger id="role-filter" className="w-full">
                      <SelectValue placeholder={t("users.selectRole")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("users.allRoles")}</SelectItem>
                      <SelectItem value="admin">{t("users.admin")}</SelectItem>
                      <SelectItem value="pharmacist">
                        {t("users.pharmacist")}
                      </SelectItem>
                      <SelectItem value="cashier">
                        {t("users.cashier")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="status-filter"
                    className="text-sm font-medium"
                  >
                    {t("users.filterByStatus")}
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter" className="w-full">
                      <SelectValue placeholder={t("users.selectStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t("users.allStatuses")}
                      </SelectItem>
                      <SelectItem value="active">
                        {t("users.active")}
                      </SelectItem>
                      <SelectItem value="inactive">
                        {t("users.inactive")}
                      </SelectItem>
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
            header: t("users.name"),
            accessorKey: "name",
          },
          {
            header: t("users.email"),
            accessorKey: "email",
          },
          {
            header: t("users.role"),
            accessorKey: "role",
            cell: ({ row }) => (
              <ClientWrapper>
                <Badge className="capitalize">
                  {t(`users.roles.${row.original.role}`)}
                </Badge>
              </ClientWrapper>
            ),
          },
          {
            header: t("users.status"),
            accessorKey: "status",
            cell: ({ row }) => (
              <ClientWrapper>
                <Badge
                  variant="outline"
                  className={`capitalize ${
                    row.original.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {t(`users.${row.original.status}`)}
                </Badge>
              </ClientWrapper>
            ),
          },
          {
            header: t("users.lastLogin"),
            accessorKey: "lastLogin",
            cell: ({ row }) => (
              <ClientWrapper>
                {formatDate(row.original.lastLogin)}
              </ClientWrapper>
            ),
          },
          {
            header: t("users.actions"),
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
                      router.push(`/${locale}/admin/users/${row.original.id}`)
                    }
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-gray-700"
                  >
                    <Eye className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{t("users.view")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/${locale}/admin/users/${row.original.id}/edit`,
                      )
                    }
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-gray-700"
                  >
                    <Edit className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{t("users.edit")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(row.original.id)}
                    className="cursor-pointer hover:bg-emerald-50/50 px-3 py-2 text-sm text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4 text-red-600" />
                    <span>{t("users.delete")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]}
        data={currentUsers}
      />

      <div className="flex justify-center mt-6">{renderPagination()}</div>
    </div>
  );
}
