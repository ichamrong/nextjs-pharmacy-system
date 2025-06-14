import type { Metadata } from "next";
import "../globals.css";
import { Nunito, Koh_Santepheap } from "next/font/google";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileAlert } from "@/components/mobile-alert";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const kohSantepheap = Koh_Santepheap({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-koh-santepheap",
});

export const metadata: Metadata = {
  title: "Pharmacy Management System",
  description: "A modern pharmacy management system built with Next.js",
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${nunito.variable} ${kohSantepheap.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LanguageProvider>
              <div className="md:hidden">
                <MobileAlert />
              </div>
              <div className="hidden md:block">
                {children}
              </div>
              <Toaster />
            </LanguageProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
