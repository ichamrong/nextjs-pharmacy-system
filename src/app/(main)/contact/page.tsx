'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

export default function Contact() {
  const { t, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="w-full border-none shadow-xl bg-white">
              <CardHeader className="space-y-1">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
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
        <div className="max-w-2xl mx-auto">
          <Card className="w-full border-none shadow-xl bg-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-gray-900">{t('contact.title')}</CardTitle>
              <CardDescription className="text-gray-600">{t('contact.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">{t('contact.firstName')}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder={t('contact.firstName')}
                    className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">{t('contact.lastName')}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={t('contact.lastName')}
                    className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
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
                <Label htmlFor="message" className="text-gray-700">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  className="min-h-[150px] border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                {t('contact.sendMessage')}
              </Button>
              <p className="text-sm text-gray-600 text-center">
                {t('contact.haveAccount')}{' '}
                <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                  {t('contact.backToLogin')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
} 