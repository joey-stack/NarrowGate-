"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

import Image from "next/image";

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  const slides = [
    {
      url: "/images/hero/hero-slide-1.jpg",
      caption: "Pastoral Word & Biblical Teaching",
    },
    {
      url: "/images/hero/hero-slide-2.jpg",
      caption: "Ministry & Leadership Celebration",
    },
    {
      url: "/images/hero/hero-slide-3.jpg",
      caption: "Sanctuary Worship & Scripture Reading",
    },
    {
      url: "/images/hero/hero-slide-4.jpg",
      caption: "Intercessory & Personal Prayer",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative bg-[#121212] text-white min-h-[120vh] flex flex-col justify-end overflow-hidden">
      {/* Optimized Background Image Crossfade Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
            index === currentSlide ? "opacity-85" : "opacity-0"
          }`}
        >
          <Image
            src={slide.url}
            alt={slide.caption}
            fill
            priority={index === 0}
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Subtle Gradient Overlay - Soft gradient at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/20 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 flex flex-col items-start justify-end">
        {/* Transparent Bottom-Left Content Container (No background box) */}
        <div className="max-w-md w-full mb-6">
          {/* Floating Location Badge */}
          <div className="inline-flex items-center gap-2 bg-[#121212]/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest">
              {t("locationBadge")}
            </span>
          </div>

          {/* Compact Headline */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight uppercase mb-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <span className="block">
              {t("titleLine1")}
            </span>
            <span className="block text-[#EAB308]">
              {t("titleLine2")}
            </span>
          </h1>

          {/* Subtitle Tagline */}
          <p className="text-xs sm:text-sm text-white/95 font-body font-normal leading-relaxed mb-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {t("tagline")}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-5">
            <a
              href={`/${locale}/contact`}
              className="px-5 py-2.5 rounded-lg bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#991B1B] hover:text-white transition-all duration-200 text-center"
            >
              {t("planVisit")} →
            </a>
            <a
              href={`/${locale}/support-mission`}
              className="px-5 py-2.5 rounded-lg border border-white/40 bg-[#121212]/70 backdrop-blur-xs text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-200 text-center"
            >
              {t("supportMission")}
            </a>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-[#EAB308]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats & Gathering Summary Bar - Minimalist transparent bar */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left border-t border-white/15 pt-4">
          <div className="py-1">
            <span className="block text-[#EAB308] font-heading font-bold text-xs sm:text-sm drop-shadow-sm">
              Sun 9:00 AM & 10:00 AM
            </span>
            <span className="block text-white/80 text-[10px] uppercase tracking-wider font-medium">
              Sunday Worship Services
            </span>
          </div>

          <div className="py-1">
            <span className="block text-[#EAB308] font-heading font-bold text-xs sm:text-sm drop-shadow-sm">
              Wed 6:30 PM & Sat 4:30 PM
            </span>
            <span className="block text-white/80 text-[10px] uppercase tracking-wider font-medium">
              Bible Study & Prayer
            </span>
          </div>

          <div className="py-1">
            <span className="block text-[#EAB308] font-heading font-bold text-xs sm:text-sm drop-shadow-sm">
              Bilingual (EN / IT)
            </span>
            <span className="block text-white/80 text-[10px] uppercase tracking-wider font-medium">
              International Family
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
