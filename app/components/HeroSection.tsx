"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

import Image from "next/image";

import { usePlanVisit } from "./PlanVisitContext";

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const { openPlanVisitModal } = usePlanVisit();

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
    <section className="relative bg-[#121212] text-white min-h-[105vh] flex flex-col justify-between overflow-hidden">
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
            className="object-cover object-top"
          />
        </div>
      ))}

      {/* Subtle Gradient Overlay - Soft gradient at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/30 to-transparent z-0 pointer-events-none" />

      {/* Main Content Area (Centralized Above the Fold) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24 flex flex-col items-center justify-end flex-grow text-center">
        {/* Transparent Center Content Container */}
        <div className="max-w-xl w-full flex flex-col items-center text-center mx-auto">
          {/* Floating Location Badge */}
          <div className="inline-flex items-center gap-2 bg-[#121212]/80 backdrop-blur-sm border border-white/20 rounded-lg px-3.5 py-1 mb-3 shadow-sm mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest">
              {t("locationBadge")}
            </span>
          </div>

          {/* Scaled Up Headline (+25%) */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight uppercase mb-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center">
            <span className="block">
              {t("titleLine1")}
            </span>
            <span className="block text-[#EAB308]">
              {t("titleLine2")}
            </span>
          </h1>

          {/* Subtitle Tagline */}
          <p className="text-xs sm:text-sm text-white/95 font-body font-normal leading-relaxed mb-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-md text-center mx-auto">
            {t("tagline")}
          </p>

          {/* Centralized Action CTAs (Above the Fold) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-5 mx-auto">
            <button
              onClick={() => openPlanVisitModal("sundayService")}
              className="px-6 py-3 rounded-lg bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#991B1B] hover:text-white transition-all duration-200 text-center cursor-pointer"
            >
              {t("planVisit")} →
            </button>
            <a
              href={`/${locale}/support-mission`}
              className="px-6 py-3 rounded-lg border border-white/40 bg-[#121212]/70 backdrop-blur-xs text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-200 text-center"
            >
              {t("supportMission")}
            </a>
          </div>

          {/* Centralized Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mx-auto">
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
      </div>

      {/* Centralized Quick Stats & Gathering Summary Bar */}
      <div className="relative z-10 w-full bg-[#121212]/95 border-t border-white/15 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="py-0.5 text-center">
            <span className="block text-[#EAB308] font-heading font-bold text-xs sm:text-sm drop-shadow-sm">
              Sun 9:00 AM & 10:00 AM
            </span>
            <span className="block text-white/80 text-[10px] uppercase tracking-wider font-medium">
              Sunday Worship Services
            </span>
          </div>

          <div className="py-0.5 text-center">
            <span className="block text-[#EAB308] font-heading font-bold text-xs sm:text-sm drop-shadow-sm">
              Wed 6:30 PM & Sat 4:30 PM
            </span>
            <span className="block text-white/80 text-[10px] uppercase tracking-wider font-medium">
              Bible Study & Prayer
            </span>
          </div>

          <div className="py-0.5 text-center">
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
