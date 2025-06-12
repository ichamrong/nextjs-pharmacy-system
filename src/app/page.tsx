'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';

type Language = 'en' | 'km';

export default function Home() {
  const { t, language, setLanguage, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card className="w-full border-none shadow-xl bg-white">
              <CardHeader className="space-y-1">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <div className="h-10 w-[120px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </div>
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Illustration */}
          <div className="hidden md:block">
            <div className="relative w-full h-[600px]">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pharmacy Building */}
                <rect x="100" y="150" width="300" height="250" fill="#4F46E5" rx="10" />
                <rect x="150" y="200" width="200" height="150" fill="white" rx="5" />
                
                {/* Cross Symbol */}
                <path
                  d="M250 100 L250 150 M225 125 L275 125"
                  stroke="#4F46E5"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                
                {/* Windows */}
                <rect x="170" y="220" width="40" height="40" fill="#E5E7EB" rx="5" />
                <rect x="230" y="220" width="40" height="40" fill="#E5E7EB" rx="5" />
                <rect x="290" y="220" width="40" height="40" fill="#E5E7EB" rx="5" />
                
                {/* Door */}
                <rect x="200" y="300" width="100" height="100" fill="#E5E7EB" rx="5" />
                
                {/* Decorative Elements */}
                <circle cx="250" cy="350" r="5" fill="#4F46E5" />
              </svg>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="w-full border-none shadow-xl bg-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-gray-900">{t('common.welcome')}</CardTitle>
              <CardDescription className="text-gray-600">{t('common.signIn')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Switcher */}
              <div className="flex justify-end">
                <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                  <SelectTrigger className="w-[120px] border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" className="cursor-pointer">English</SelectItem>
                    <SelectItem value="km" className="font-khmer cursor-pointer">ខ្មែរ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">{t('common.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('common.email')}
                  className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">{t('common.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('common.password')}
                  className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 cursor-pointer" />
                  <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                    {t('common.rememberMe')}
                  </Label>
                </div>
                <Link href="/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  {t('common.forgotPassword')}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                {t('common.signInButton')}
              </Button>
              <p className="text-sm text-gray-600 text-center">
                {t('common.noAccount')}{' '}
                <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
                  {t('common.contactAdmin')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
