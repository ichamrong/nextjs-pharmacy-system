import type { Metadata } from "next";
import { Nunito, Koh_Santepheap } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileAlert } from "@/components/mobile-alert";
import React from "react";

const Layout = 

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
      <body className={`${Nunito.className} ${Koh_Santepheap.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LanguageProvider>
              <MobileAlert />
              {children}
            </LanguageProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
