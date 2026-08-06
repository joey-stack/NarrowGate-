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
    <section className="relative bg-[#121212] text-white min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Optimized Background Image Crossfade Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
            index === currentSlide ? "opacity-75" : "opacity-0"
          }`}
        >
          <Image
            src={slide.url}
            alt={slide.caption}
            fill
            priority={index === 0}
            sizes="100vw"
            quality={75}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-[#121212]/80 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center justify-center">
        {/* Floating Location Badge */}
        <div className="inline-flex items-center gap-2 bg-[#121212]/85 border border-white/20 rounded-lg px-4 py-1.5 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
          <span className="text-white text-xs sm:text-sm font-heading font-semibold uppercase tracking-widest">
            {t("locationBadge")}
          </span>
        </div>

        {/* 2-Line Headline Alignment with Crown Gold Accent */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.02] uppercase mb-8 text-white drop-shadow-lg">
          <span className="block drop-shadow-md">
            {t("titleLine1")}
          </span>
          <span className="block text-[#EAB308] drop-shadow-md">
            {t("titleLine2")}
          </span>
        </h1>

        {/* Subtitle Tagline */}
        <p className="max-w-2xl text-base sm:text-xl text-white/90 font-body font-normal leading-relaxed mb-10 mx-auto drop-shadow-md">
          {t("tagline")}
        </p>

        {/* Action CTAs: Crimson Red Button -> Dark Red on Hover */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <a
            href={`/${locale}/contact`}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#B91C1C] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[#991B1B] hover:text-white transition-all duration-200 text-center"
          >
            {t("planVisit")} →
          </a>
          <a
            href={`/${locale}/support-mission`}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-white/40 bg-[#121212]/60 text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-200 text-center"
          >
            {t("supportMission")}
          </a>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2 mb-12">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-[#EAB308]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Quick Stats & Gathering Summary Bar */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/20 text-center">
          <div className="p-4 rounded-lg bg-[#1E1E1E] border border-white/15">
            <span className="block text-[#EAB308] font-heading font-bold text-lg sm:text-xl">
              Sun 9:00 AM & 10:00 AM
            </span>
            <span className="block text-white/80 text-xs mt-1 uppercase tracking-wider font-medium">
              Sunday Worship Services
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#1E1E1E] border border-white/15">
            <span className="block text-[#EAB308] font-heading font-bold text-lg sm:text-xl">
              Wed 6:30 PM & Sat 4:30 PM
            </span>
            <span className="block text-white/80 text-xs mt-1 uppercase tracking-wider font-medium">
              Bible Study & Prayer
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#1E1E1E] border border-white/15">
            <span className="block text-[#EAB308] font-heading font-bold text-lg sm:text-xl">
              Bilingual (EN / IT)
            </span>
            <span className="block text-white/80 text-xs mt-1 uppercase tracking-wider font-medium">
              International Family
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
