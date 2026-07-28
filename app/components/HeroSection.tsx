"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  const slides = [
    {
      url: "https://framerusercontent.com/images/BJfx98tg96KSw6rzvYL6jgfVU.jpeg",
      caption: "International Christian Fellowship",
    },
    {
      url: "https://framerusercontent.com/images/4OVDWjW414cpwjACN4OVKzbVvk.webp",
      caption: "Pastoral Word & Biblical Teaching",
    },
    {
      url: "https://framerusercontent.com/images/lPxQuEvoD0okg4XQKqeJOs9sR1Q.jpeg",
      caption: "Sanctuary & Worship Environment",
    },
    {
      url: "https://framerusercontent.com/images/LHytLqj1LAp19pIe5hVKEmCFw.jpeg",
      caption: "Praise & Worship Gathering",
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
      {/* Background Image Crossfade Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
            index === currentSlide ? "opacity-75" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.url}')`,
          }}
        />
      ))}

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-[#121212]/80 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center justify-center">
        {/* Floating Location Badge */}
        <div className="inline-flex items-center gap-2 bg-[#121212]/60 backdrop-blur-md border border-white/20 rounded-lg px-4 py-1.5 mb-8 shadow-sm">
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

        {/* Action CTAs: Foursquare Royal Purple Button -> Crown Gold on Hover */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <a
            href={`/${locale}/contact`}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#6B21A8] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[#EAB308] hover:text-[#121212] hover:scale-105 transition-all duration-200 text-center"
          >
            {t("planVisit")} →
          </a>
          <a
            href={`/${locale}/support-mission`}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-white/40 bg-[#121212]/40 backdrop-blur-sm text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-200 text-center"
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
          <div className="p-4 rounded-lg bg-[#121212]/60 border border-white/15 backdrop-blur-md">
            <span className="block text-[#EAB308] font-heading font-bold text-lg sm:text-xl">
              Sun 9:00 AM & 10:00 AM
            </span>
            <span className="block text-white/80 text-xs mt-1 uppercase tracking-wider font-medium">
              Sunday Worship Services
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#121212]/60 border border-white/15 backdrop-blur-md">
            <span className="block text-[#EAB308] font-heading font-bold text-lg sm:text-xl">
              Wed 6:30 PM & Sat 4:30 PM
            </span>
            <span className="block text-white/80 text-xs mt-1 uppercase tracking-wider font-medium">
              Bible Study & Prayer
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#121212]/60 border border-white/15 backdrop-blur-md">
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
