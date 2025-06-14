"use client";

import { motion } from "framer-motion";
import TopMenu from "@/components/layout/TopMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps"
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);

    // Auto-play functionality
    const autoplay = setInterval(() => {
      if (!isHovered && emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (!isHovered) {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect, isHovered]);

  const carouselSlides = [
    {
      title: t("home.carousel.slide1.title"),
      description: t("home.carousel.slide1.description"),
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1920&h=1080"
    },
    {
      title: t("home.carousel.slide2.title"),
      description: t("home.carousel.slide2.description"),
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920&h=1080"
    },
    {
      title: t("home.carousel.slide3.title"),
      description: t("home.carousel.slide3.description"),
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1920&h=1080"
    }
  ];

  const testimonials = [
    {
      name: t("home.testimonials.customer1.name"),
      role: t("home.testimonials.customer1.role"),
      text: t("home.testimonials.customer1.text"),
      image: "/images/testimonials/person1.jpg"
    },
    {
      name: t("home.testimonials.customer2.name"),
      role: t("home.testimonials.customer2.role"),
      text: t("home.testimonials.customer2.text"),
      image: "/images/testimonials/person2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-emerald-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="medical-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* Medical Cross */}
              <path
                d="M50 20 L50 80 M20 50 L80 50"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-emerald-600"
              />
              {/* Heart Rate Line */}
              <path
                d="M10 50 Q30 30, 50 50 T90 50"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-emerald-500"
              />
              {/* Pulse Circle */}
              <circle
                cx="50"
                cy="50"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-emerald-400"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <TopMenu />

          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 font-khmer">
                {t("common.appName")}
              </h1>
              <p className="text-lg md:text-xl text-emerald-700 font-khmer">
                {t("common.welcomeDescription")}
              </p>
            </motion.div>

            {/* Carousel Section */}
            <div className="relative mb-16">
              <div 
                className="overflow-hidden" 
                ref={emblaRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex">
                  {carouselSlides.map((slide, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                      <div className="aspect-[16/9] bg-emerald-100 rounded-2xl overflow-hidden">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-900/40 flex items-center justify-center p-8">
                          <div className="text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                            <p className="text-lg">{slide.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
              >
                <ChevronLeft className="w-6 h-6 text-emerald-800" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
              >
                <ChevronRight className="w-6 h-6 text-emerald-800" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 font-khmer">
                  {t("common.service24_7")}
                </h2>
                <p className="text-emerald-700 font-khmer">
                  {t("common.service24_7Description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 font-khmer">
                  {t("common.qualityGuarantee")}
                </h2>
                <p className="text-emerald-700 font-khmer">
                  {t("common.qualityGuaranteeDescription")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 font-khmer">
                  {t("common.professionalService")}
                </h2>
                <p className="text-emerald-700 font-khmer">
                  {t("common.professionalServiceDescription")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 font-khmer">
                  {t("common.skilledStaff")}
                </h2>
                <p className="text-emerald-700 font-khmer">
                  {t("common.skilledStaffDescription")}
                </p>
              </motion.div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center font-khmer">
                {t("home.testimonials.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-800 font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-emerald-800">{testimonial.name}</h3>
                        <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-emerald-700">{testimonial.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
              <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center font-khmer">
                {t("home.contact.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-bold text-emerald-800 mb-1">{t("home.contact.phone")}</h3>
                    <p className="text-emerald-700">+855 12 345 678</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-bold text-emerald-800 mb-1">{t("home.contact.email")}</h3>
                    <p className="text-emerald-700">info@pharmacy.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-bold text-emerald-800 mb-1">{t("home.contact.address")}</h3>
                    <p className="text-emerald-700">Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
