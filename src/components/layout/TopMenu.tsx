"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginModal } from "@/components/auth/login-modal";
import "flag-icons/css/flag-icons.min.css";

type Language = "en" | "km";

export default function TopMenu() {
  const { t, language, setLanguage } = useLanguage();
  const params = useParams();
  const locale = params.locale as string;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-12">
      <Link href={`/${locale}`} className="flex items-center space-x-2 cursor-pointer">
        <div className="w-8 h-8 sm:w-10 sm:h-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-emerald-700"
          >
            <path
              d="M19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19H10C8.67392 19 7.40215 18.4732 6.46447 17.5355C5.52678 16.5979 5 15.3261 5 14V10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5H14C15.3261 5 16.5979 5.52678 17.5355 6.46447C18.4732 7.40215 19 8.67392 19 10V14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 9V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-khmer text-emerald-700">
          {t("common.appName")}
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-khmer px-6 py-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          {t("auth.login")}
        </Button>
        <Select
          value={language}
          onValueChange={(value: Language) => setLanguage(value)}
        >
          <SelectTrigger className="w-[120px] border-gray-200 bg-white cursor-pointer">
            <SelectValue>
              <div className="flex items-center space-x-2">
                <span
                  className={`fi fi-${language === "en" ? "gb" : "kh"} text-4xl w-12 h-10`}
                ></span>
                <span className="font-khmer">
                  {language === "en" ? "English" : "Khmer"}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en" className="cursor-pointer">
              <div className="flex items-center space-x-2">
                <span className="fi fi-gb text-4xl w-12 h-10"></span>
                <span className="font-khmer">English</span>
              </div>
            </SelectItem>
            <SelectItem value="km" className="cursor-pointer">
              <div className="flex items-center space-x-2">
                <span className="fi fi-kh text-4xl w-12 h-10"></span>
                <span className="font-khmer">ខ្មែរ</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
