'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import TopMenu from '@/components/layout/TopMenu';
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/pharmacy-bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200"></div>
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heart-rate-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path 
                  d="M 5 15 L 10 5 L 15 25 L 20 10 L 25 20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heart-rate-pattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 relative z-10">
        <TopMenu />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left side - Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-900 space-y-6 sm:space-y-8 md:space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-khmer">
                  {t('contact.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-[90%] font-khmer leading-relaxed">
                  {t('contact.description')}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-khmer">{t('contact.email')}</h3>
                    <p className="text-gray-600 font-khmer">info@pharmacy.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-khmer">{t('contact.phone')}</h3>
                    <p className="text-gray-600 font-khmer">+855 12 345 678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-khmer">{t('contact.address')}</h3>
                    <p className="text-gray-600 font-khmer">{t('contact.addressDetail')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-[450px] md:max-w-[520px] lg:max-w-[580px] border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                <CardHeader className="space-y-3 pb-6 sm:pb-8 md:pb-10">
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center font-khmer">
                    {t('contact.formTitle')}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base md:text-lg text-center font-khmer">
                    {t('contact.formDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                      <Label htmlFor="name" className="text-gray-700 text-sm md:text-base font-medium font-khmer">
                        {t('contact.name')}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        className="h-11 sm:h-12 md:h-14 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-400 font-khmer text-base md:text-lg"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <Label htmlFor="email" className="text-gray-700 text-sm md:text-base font-medium font-khmer">
                        {t('common.email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        className="h-11 sm:h-12 md:h-14 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-400 font-khmer text-base md:text-lg"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <Label htmlFor="message" className="text-gray-700 text-sm md:text-base font-medium font-khmer">
                        {t('contact.message')}
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t('contact.messagePlaceholder')}
                        className="min-h-[120px] border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 placeholder-gray-400 font-khmer text-base md:text-lg resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 md:space-y-6 pt-4 md:pt-6">
                  <Button 
                    className="w-full h-11 sm:h-12 md:h-14 bg-emerald-600 hover:bg-emerald-500 text-white border-0 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base md:text-lg font-medium shadow-sm font-khmer"
                  >
                    {t('contact.sendMessage')}
                  </Button>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center font-khmer">
                    {t('contact.haveAccount')}{' '}
                    <Link 
                      href={`/${locale}`} 
                      className="text-emerald-600 hover:text-emerald-500 transition-colors font-medium"
                    >
                      {t('contact.backToLogin')}
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 