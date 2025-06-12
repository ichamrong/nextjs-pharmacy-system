"use client";

import { useState } from "react";
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

export default function NewUserPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

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
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      status: formData.get("status"),
    };

    try {
      // TODO: Replace with actual API call
      console.log("User data:", userData);
      
      // Show success message
      await Swal.fire({
        title: t("users.addSuccess.title"),
        text: t("users.addSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
      });

      // Reset dirty state
      setIsDirty(false);
      
      // Redirect to users list
      router.push("/admin/users");
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        title: t("common.error"),
        text: t("users.addError.message"),
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
        <h1 className="text-2xl font-bold">{t("users.addNew")}</h1>
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
                placeholder={t("users.emailPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                {t("users.role")}
              </label>
              <Select name="role" required onValueChange={handleFormChange}>
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
              <Select name="status" required onValueChange={handleFormChange}>
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