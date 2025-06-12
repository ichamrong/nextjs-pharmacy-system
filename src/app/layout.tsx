import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { MobileAlert } from "@/components/mobile-alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pharmacy Management System",
  description: "A comprehensive pharmacy management system for managing inventory, sales, and customer data.",
  icons: {
    icon: [
      {
        url: '/pharmacy-icon.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: [
      {
        url: '/pharmacy-icon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get language from cookies, default to 'km' if not found
  const cookieStore = await cookies();
  const savedLanguage =
    cookieStore.get("locale")?.value ||
    cookieStore.get("preferred-language")?.value;
  const language =
    savedLanguage && ["en", "km"].includes(savedLanguage)
      ? savedLanguage
      : "km";

  return (
    <html lang={language}>
      <body className={inter.className}>
        <LanguageProvider>
          <MobileAlert />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
