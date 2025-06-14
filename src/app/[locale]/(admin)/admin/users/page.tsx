"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { ClientWrapper } from "@/components/client-wrapper";
import { PageHeader } from '@/components/layout/page-header';
import { SearchBar } from '@/components/layout/search-bar';
import { DataTable } from '@/components/layout/data-table';
import { Edit, Trash } from 'lucide-react';

// Mock data - replace with actual API call
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "pharmacist",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "cashier",
    status: "inactive",
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (userId: number) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleDelete = async (userId: number) => {
    const result = await Swal.fire({
      title: t("users.deleteConfirm.title"),
      text: t("users.deleteConfirm.message"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.yes"),
      cancelButtonText: t("common.no"),
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        // TODO: Replace with actual API call
        console.log("Deleting user:", userId);
        
        await Swal.fire({
          title: t("users.deleteSuccess.title"),
          text: t("users.deleteSuccess.message"),
          icon: "success",
          confirmButtonText: t("common.ok"),
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          title: t("common.error"),
          text: t("users.deleteError.message"),
          icon: "error",
          confirmButtonText: t("common.ok"),
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: t('users.name'),
      accessorKey: 'name' as keyof User,
    },
    {
      header: t('users.email'),
      accessorKey: 'email' as keyof User,
    },
    {
      header: t('users.role'),
      accessorKey: 'role' as keyof User,
    },
    {
      header: t('users.status'),
      accessorKey: 'status' as keyof User,
      cell: (user: User) => (
        <span className={`glass-badge ${
          user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {user.status}
        </span>
      ),
    },
    {
      header: t('users.actions'),
      accessorKey: 'id' as keyof User,
      cell: (user: User) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/admin/users/${user.id}`)}
            className="glass-button"
          >
            <Edit className="h-4 w-4 text-white/90" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(Number(user.id))}
            className="glass-button"
          >
            <Trash className="h-4 w-4 text-white/90" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('users.title')}
        action={{
          label: t('users.addNew'),
          href: '/admin/users/new',
        }}
      />

      <div className="glass-card">
        <SearchBar
          placeholder={t('users.searchPlaceholder')}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
      />
    </div>
  );
} 