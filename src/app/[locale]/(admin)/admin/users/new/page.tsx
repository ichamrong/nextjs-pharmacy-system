"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function NewUserPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle create user logic here
      console.log("Create user:", formData);
      
      // Show success message
      await Swal.fire({
        title: t("users.createSuccess"),
        text: t("users.userCreated"),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect back to users list
      router.push(`/${locale}/admin/users`);
    } catch {
      // Show error message
      Swal.fire({
        title: t("users.createError"),
        text: t("users.createErrorDescription"),
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/admin/users`);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <PageHeader
        title={t("users.addNew")}
        description={t("users.addNewDescription")}
        action={{
          label: t("common.back"),
          onClick: handleCancel,
          icon: <ArrowLeft className="mr-2 h-4 w-4" />
        }}
      />

      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50">
          <CardTitle className="text-lg font-medium text-gray-900">{t("users.userInformation")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">{t("users.name")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t("users.namePlaceholder")}
                  required
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t("users.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={t("users.emailPlaceholder")}
                  required
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">{t("users.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder={t("users.passwordPlaceholder")}
                  required
                  className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">{t("users.role")}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  required
                >
                  <SelectTrigger id="role" className="border-gray-200 focus:border-gray-300 focus:ring-gray-300">
                    <SelectValue placeholder={t("users.selectRole")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t("users.admin")}</SelectItem>
                    <SelectItem value="pharmacist">
                      {t("users.pharmacist")}
                    </SelectItem>
                    <SelectItem value="cashier">{t("users.cashier")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">{t("users.status")}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status" className="border-gray-200 focus:border-gray-300 focus:ring-gray-300">
                    <SelectValue placeholder={t("users.selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("users.active")}</SelectItem>
                    <SelectItem value="inactive">
                      {t("users.inactive")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                {t("common.cancel")}
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? t("common.saving") : t("common.save")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 