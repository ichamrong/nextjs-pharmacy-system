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
import { Separator } from "@/components/ui/separator";
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

export default function UsersPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-03-20T10:30:00Z",
    },
    // Add more mock users as needed
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("users.title")}
        description={t("users.description")}
        action={{
          label: t("users.addNew"),
          onClick: () => router.push("/admin/users/new"),
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
          <FilterDrawer title={t("users.filters")}>
            <div className="space-y-6 p-4">
              <p className="text-sm text-gray-500">
                {t("users.filterDescription")}
              </p>
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

              <Separator />

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
            cell: ({ row }) => (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {row.original.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {row.original.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {row.original.email}
                  </div>
                </div>
              </div>
            ),
          },
          {
            header: t("users.role"),
            accessorKey: "role",
            cell: ({ row }) => (
              <Badge
                variant={
                  row.original.role === "admin" ? "default" : "secondary"
                }
                className={`${
                  row.original.role === "admin"
                    ? "bg-blue-100 text-blue-700"
                    : row.original.role === "pharmacist"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {t(`users.${row.original.role}`)}
              </Badge>
            ),
          },
          {
            header: t("users.status"),
            accessorKey: "status",
            cell: ({ row }) => (
              <Badge
                variant={
                  row.original.status === "active" ? "default" : "secondary"
                }
                className={`${
                  row.original.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {t(`users.${row.original.status}`)}
              </Badge>
            ),
          },
          {
            header: t("users.lastLogin"),
            accessorKey: "lastLogin",
            cell: ({ row }) => (
              <span className="text-sm text-gray-600">
                {formatDate(row.original.lastLogin)}
              </span>
            ),
          },
          {
            header: t("users.actions"),
            accessorKey: "id",
            cell: ({ row }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/users/${row.original.id}`)
                    }
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t("users.view")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/users/${row.original.id}/edit`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {t("users.edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(row.original.id)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    {t("users.delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]}
        data={filteredUsers}
        isLoading={isLoading}
      />
    </div>
  );
}
