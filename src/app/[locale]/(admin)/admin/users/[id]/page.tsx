"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import { use } from "react";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "pharmacist" | "cashier";
  status: "active" | "inactive";
  lastLogin: string;
}

export default function ViewUserPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // Mock data for now
        const mockUser: User = {
          id: resolvedParams.id,
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          status: "active",
          lastLogin: new Date().toISOString(),
        };
        setUser(mockUser);
      } catch {
        Swal.fire({
          title: t("users.fetchError"),
          text: t("users.fetchErrorDescription"),
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [resolvedParams.id, t]);

  const handleEdit = () => {
    router.push(`/${locale}/admin/users/${resolvedParams.id}/edit`);
  };

  const handleBack = () => {
    router.push(`/${locale}/admin/users`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t("common.loading")}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t("users.userNotFound")}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("users.viewUser")}
        description={t("users.viewUserDescription")}
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
              {t("users.userInformation")}
            </CardTitle>
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50 text-gray-700"
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
                {t("users.name")}
              </div>
              <div className="text-sm text-gray-900">{user.name}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("users.email")}
              </div>
              <div className="text-sm text-gray-900">{user.email}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("users.role")}
              </div>
              <div className="text-sm text-gray-900">
                {t(`users.${user.role}`)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("users.status")}
              </div>
              <div>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className={`text-xs ${
                    user.status === "active" ? "bg-green-100 text-green-800" : ""
                  }`}
                >
                  {t(`users.${user.status}`)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                {t("users.lastLogin")}
              </div>
              <div className="text-sm text-gray-900">
                {user.lastLogin ? formatDate(user.lastLogin) : t("users.never")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 