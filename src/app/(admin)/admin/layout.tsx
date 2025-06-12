"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Pill,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navigation = [
  { name: "dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "users", href: "/admin/users", icon: Users },
  { name: "products", href: "/admin/products", icon: Package },
  { name: "orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "settings", href: "/admin/settings", icon: Settings },
];

type Language = "en" | "km";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden",
          isSidebarOpen ? "block" : "hidden",
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-100 rounded-lg transform group-hover:scale-110 transition-transform duration-200" />
                <div className="relative flex items-center justify-center w-8 h-8">
                  <Pill className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">
                  Pharmacy
                </span>
                <span className="text-xs text-gray-500">Management System</span>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-indigo-600" : "text-gray-400",
                    )}
                  />
                  {t(`admin.navigation.${item.name}`)}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              {t("admin.navigation.logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "lg:pl-64 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "pl-64" : "pl-0",
        )}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex-1" />
            {/* Language Switcher */}
            <div className="flex items-center gap-x-4">
              <Globe className="h-5 w-5 text-gray-400" />
              <Select
                value={language}
                onValueChange={(value: Language) => setLanguage(value)}
              >
                <SelectTrigger className="w-[120px] border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="km" className="font-khmer">
                    ខ្មែរ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
