"use client";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaAndroid } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export function MobileAlert() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4 md:hidden">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <AlertCircle className="size-12 text-red-600" />
        <h1 className="text-xl font-semibold">{t("mobile.title")}</h1>
        <p className="text-muted-foreground">{t("mobile.description")}</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <FaAndroid className="size-4" />
            Android
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <FaApple className="size-4" />
            iOS
          </a>
        </div>
      </div>
    </div>
  );
}
