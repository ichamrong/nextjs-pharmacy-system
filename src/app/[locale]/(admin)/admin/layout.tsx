"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClientWrapper } from "@/components/client-wrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Package,
  Tag,
  ShoppingCart,
  PackageCheck,
  PackageX,
  Settings,
  Menu,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import "flag-icons/css/flag-icons.min.css";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { name: "dashboard", href: "/[locale]/admin/dashboard", icon: LayoutDashboard },
  { name: "users", href: "/[locale]/admin/users", icon: Users },
  {
    name: "catalog",
    href: "/[locale]/admin/catalog",
    icon: BookOpen,
    children: [
      { name: "products", href: "/[locale]/admin/products", icon: Package },
      { name: "categories", href: "/[locale]/admin/categories", icon: Tag },
    ],
  },
  { name: "sales", href: "/[locale]/admin/sales", icon: ShoppingCart },
  {
    name: "receivedStocks",
    href: "/[locale]/admin/received-stocks",
    icon: PackageCheck,
  },
  { name: "issuedStocks", href: "/[locale]/admin/issued-stocks", icon: PackageX },
  { name: "settings", href: "/[locale]/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName],
    );
  };

  const languages = [
    { code: "en", name: "English", flag: "gb" },
    { code: "km", name: "ខ្មែរ", flag: "kh" },
  ];

  const currentLanguage =
    languages.find((lang) => pathname.startsWith(`/${lang.code}`)) ||
    languages[0];

  const handleLanguageChange = (locale: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
    setIsLanguageModalOpen(false);
  };

  const renderNavItem = (item: NavItem) => {
    const currentLocale = pathname.split('/')[1];
    const itemHref = item.href.replace('[locale]', currentLocale);
    const isActive = pathname.startsWith(itemHref);
    const hasChildren = item.children && item.children.length > 0;
    const isMenuOpen = openMenus.includes(item.name);
    const isChildActive = item.children?.some(
      (child) => pathname.startsWith(child.href.replace('[locale]', currentLocale)),
    );

    return (
      <li key={item.name}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleMenu(item.name)}
              className={cn(
                "w-full group flex items-center justify-between rounded-md p-2.5 text-sm leading-6 font-medium transition-all duration-200 cursor-pointer",
                isActive || isMenuOpen || isChildActive
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-emerald-900",
                "hover:shadow-sm",
              )}
            >
              <div className="flex items-center gap-x-3">
                <div
                  className={cn(
                    "p-1.5 rounded-md transition-colors duration-200",
                    isActive || isMenuOpen || isChildActive
                      ? "bg-emerald-100"
                      : "bg-gray-100 group-hover:bg-emerald-100",
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive || isMenuOpen || isChildActive
                        ? "text-emerald-900"
                        : "text-gray-600 group-hover:text-emerald-900",
                      "h-5 w-5 transition-colors duration-200",
                    )}
                    aria-hidden="true"
                  />
                </div>
                <ClientWrapper>{t(`admin.${item.name}`)}</ClientWrapper>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isMenuOpen ? "transform rotate-180" : "",
                  isActive || isMenuOpen || isChildActive
                    ? "text-emerald-900"
                    : "text-gray-400 group-hover:text-emerald-900",
                )}
              />
            </button>
            {isMenuOpen && item.children && (
              <ul className="mt-1 space-y-1 pl-11">
                {item.children.map((child) => {
                  const childHref = child.href.replace('[locale]', currentLocale);
                  return (
                    <li key={child.name}>
                      <Link
                        href={childHref}
                        className={cn(
                          pathname.startsWith(childHref)
                            ? "bg-emerald-50 text-emerald-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-emerald-900",
                          "group flex items-center gap-x-3 rounded-md p-2.5 text-sm leading-6 font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
                        )}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-md transition-colors duration-200",
                            pathname.startsWith(childHref)
                              ? "bg-emerald-100"
                              : "bg-gray-100 group-hover:bg-emerald-100",
                          )}
                        >
                          <child.icon
                            className={cn(
                              pathname.startsWith(childHref)
                                ? "text-emerald-900"
                                : "text-gray-600 group-hover:text-emerald-900",
                              "h-4 w-4 transition-colors duration-200",
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <ClientWrapper>{t(`admin.${child.name}`)}</ClientWrapper>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={itemHref}
            className={cn(
              isActive
                ? "bg-emerald-50 text-emerald-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-emerald-900",
              "group flex items-center gap-x-3 rounded-md p-2.5 text-sm leading-6 font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
            )}
          >
            <div
              className={cn(
                "p-1.5 rounded-md transition-colors duration-200",
                isActive
                  ? "bg-emerald-100"
                  : "bg-gray-100 group-hover:bg-emerald-100",
              )}
            >
              <item.icon
                className={cn(
                  isActive
                    ? "text-emerald-900"
                    : "text-gray-600 group-hover:text-emerald-900",
                  "h-5 w-5 transition-colors duration-200",
                )}
                aria-hidden="true"
              />
            </div>
            <ClientWrapper>{t(`admin.${item.name}`)}</ClientWrapper>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top menu bar */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
        <Button
          variant="ghost"
          className="lg:hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-emerald-900" />
        </Button>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <Button
            variant="ghost"
            className="cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsLanguageModalOpen(true)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`fi fi-${currentLanguage.flag} rounded-sm shadow-sm`}
                style={{ fontSize: "30px" }}
              ></span>
              <span className="text-sm font-medium text-gray-700">
                {currentLanguage.name}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Language Selection Modal */}
      <Dialog open={isLanguageModalOpen} onOpenChange={setIsLanguageModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Select Language
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg transition-colors",
                  "hover:bg-gray-50 cursor-pointer border border-transparent",
                  currentLanguage.code === lang.code &&
                    "bg-gray-50 border-gray-200",
                )}
              >
                <span
                  className={`fi fi-${lang.flag} rounded-sm shadow-sm`}
                  style={{ fontSize: "30px" }}
                ></span>
                <div className="flex flex-col items-start">
                  <span className="text-base font-medium text-gray-900">
                    {lang.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {lang.code.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <ClientWrapper>
              <h1 className="text-xl font-bold text-emerald-900">
                {t("common.appName")}
              </h1>
            </ClientWrapper>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map(renderNavItem)}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-white">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <ClientWrapper>
                <h1 className="text-xl font-bold text-emerald-900">
                  {t("common.appName")}
                </h1>
              </ClientWrapper>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {navigation.map(renderNavItem)}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
