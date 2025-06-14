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

const roles = [
  { value: "admin", label: "Administrator" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "cashier", label: "Cashier" },
];

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

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

interface EditUserFormProps {
  userId: string;
}

export default function EditUserForm({ userId }: EditUserFormProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUser = async () => {
      try {
        // Simulate API call
        const foundUser = mockUsers.find(u => u.id === parseInt(userId));
        if (foundUser) {
          setUser(foundUser);
        } else {
          // Handle user not found
          Swal.fire({
            title: t("common.error"),
            text: t("users.notFound"),
            icon: "error",
            confirmButtonText: t("common.ok"),
          }).then(() => {
            router.push("/admin/users");
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Swal.fire({
          title: t("common.error"),
          text: t("users.fetchError"),
          icon: "error",
          confirmButtonText: t("common.ok"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, router, t]);

  // Track form changes
  const handleFormChange = () => {
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      id: parseInt(userId),
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      status: formData.get("status"),
    };

    try {
      // TODO: Replace with actual API call
      console.log("Updating user:", userData);
      
      // Show success message
      await Swal.fire({
        title: t("users.updateSuccess.title"),
        text: t("users.updateSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
      });

      // Reset dirty state
      setIsDirty(false);
      
      // Redirect to users list
      router.push("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: t("common.error"),
        text: t("users.updateError.message"),
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
        title: t("users.cancelConfirm.title"),
        text: t("users.cancelConfirm.message"),
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

  if (!user) {
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
        <h1 className="text-2xl font-bold">{t("users.edit")}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("users.name")}
              </label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={user.name}
                placeholder={t("users.namePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("users.email")}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={user.email}
                placeholder={t("users.emailPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                {t("users.role")}
              </label>
              <Select 
                name="role" 
                required 
                defaultValue={user.role}
                onValueChange={handleFormChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("users.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {t(`users.roles.${role.value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                {t("users.status")}
              </label>
              <Select 
                name="status" 
                required 
                defaultValue={user.status}
                onValueChange={handleFormChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("users.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {t(`users.statusTypes.${status.value}`)}
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