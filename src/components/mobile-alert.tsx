"use client";

import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileAlert() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4 md:hidden">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <h1 className="text-xl font-semibold">{t("mobile.title")}</h1>
        <p className="text-muted-foreground">{t("mobile.description")}</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <svg
              className="size-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-.0033v-.0033c.1352-.0007.2638-.0575.3558-.1598.092-.1022.143-.2378.143-.3774v-2.7168c0-.2676-.1085-.5119-.2844-.6896-.1759-.1777-.414-.2779-.6625-.2779H4.1422c-.2676 0-.5119.1085-.6896.2844-.1777.1759-.2779.414-.2779.6625v2.7168c0 .1396.0509.2752.143.3774.092.1023.2206.1591.3558.1598L5.669 9.3214c0 .6774.3106 1.3188.8429 1.7423l.0004.0026c.5796.4889 1.3581.7795 2.1713.7795h7.6342c.8132 0 1.5917-.2906 2.1713-.7795l.0004-.0026c.5323-.4235.8429-1.0649.8429-1.7423m-2.2484-4.2515c.5511 0 .9993.4482.9993.9993s-.4482.9993-.9993.9993H7.3702c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993h9.2629M12 17.5c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5" />
            </svg>
            Android
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <svg
              className="size-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.89 6.41-.65 1.29-1.51 2.58-2.92 4.05M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
            </svg>
            iOS
          </a>
        </div>
      </div>
    </div>
  );
}
