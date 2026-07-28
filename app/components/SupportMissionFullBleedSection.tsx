"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function SupportMissionFullBleedSection() {
  const t = useTranslations("SupportMissionBanner");
  const locale = useLocale();

  return (
    <section className="relative bg-[#121212] text-white py-24 sm:py-36 overflow-hidden">
      {/* Optimized Template Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://framerusercontent.com/images/vhQGd70nfn3eThdiFz3G9IDtVE.jpeg"
          alt="Support Mission Background"
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/80 to-[#121212] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-block px-4 py-1.5 rounded-lg bg-accent/20 text-accent-light text-xs font-heading font-bold uppercase tracking-wider mb-6">
            {t("badge")}
          </div>

          <h2 className="text-h1 text-white text-3xl sm:text-5xl font-heading font-extrabold mb-6 leading-tight">
            {t("quote")}
          </h2>

          <p className="text-subheading text-white/80 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
            {t("description")}
          </p>

          <a
            href={`/${locale}/support-mission`}
            className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-md hover:bg-accent-light hover:scale-105 transition-all inline-block"
          >
            {t("cta")} →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
