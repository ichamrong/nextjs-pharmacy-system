"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Tags,
  Menu,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { ClientWrapper } from "@/components/client-wrapper";
import { useLanguage } from "@/contexts/LanguageContext";

const navigation = [
  { name: "dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "users", href: "/admin/users", icon: Users },
  { name: "categories", href: "/admin/categories", icon: Tags },
  { name: "products", href: "/admin/products", icon: Package },
  { name: "sales", href: "/admin/sales", icon: ShoppingCart },
  { name: "receivedStocks", href: "/admin/received-stocks", icon: ArrowDownToLine },
  { name: "issuedStocks", href: "/admin/issued-stocks", icon: ArrowUpFromLine },
  { name: "settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <ClientWrapper>
              <h1 className="text-xl font-bold text-emerald-900">{t('common.appName')}</h1>
            </ClientWrapper>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-emerald-50 text-emerald-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-emerald-900",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300"
                        )}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? "text-emerald-900"
                              : "text-gray-400 group-hover:text-emerald-900",
                            "h-6 w-6 shrink-0 transition-all duration-300"
                          )}
                          aria-hidden="true"
                        />
                        <ClientWrapper>{t(`admin.${item.name}`)}</ClientWrapper>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-emerald-900" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-white">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <ClientWrapper>
                <h1 className="text-xl font-bold text-emerald-900">{t('common.appName')}</h1>
              </ClientWrapper>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-emerald-50 text-emerald-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-emerald-900",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300"
                      )}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-emerald-900"
                            : "text-gray-400 group-hover:text-emerald-900",
                          "h-6 w-6 shrink-0 transition-all duration-300"
                        )}
                        aria-hidden="true"
                      />
                      <ClientWrapper>{t(`admin.${item.name}`)}</ClientWrapper>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
