import type { Metadata } from "next";
import { Spectral, Battambang } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { MobileAlert } from "@/components/mobile-alert";

const spectral = Spectral({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-spectral',
  display: 'swap',
});

const battambang = Battambang({ 
  weight: ['400', '700'],
  subsets: ["khmer"],
  variable: '--font-battambang',
  display: 'swap',
});

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
    <html lang={language} className={`${spectral.variable} ${battambang.variable}`}>
      <body className={`antialiased ${language === 'km' ? 'font-battambang' : 'font-spectral'}`}>
        <LanguageProvider>
          <div className="md:contents">
            <MobileAlert />
          </div>
          <div className="hidden md:block">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
