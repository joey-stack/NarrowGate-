"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function AboutHeroSection() {
  const t = useTranslations("AboutHero");
  const locale = useLocale();

  return (
    <section className="py-20 sm:py-28 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Sub-badge Pill */}
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
            {t("badge")}
          </div>

          {/* Split Header Row (Exact OneChurch Template Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-7">
              <h1 className="text-display text-[#121212] mb-4 leading-tight">
                {t("title")}
              </h1>
              <p className="text-subheading text-[#525252] leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
              <a
                href={`/${locale}/contact`}
                className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all hover:scale-105"
              >
                {t("cta")} →
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Feature Banner Image Frame */}
        <ScrollReveal delay={0.2}>
          <div className="relative rounded-lg overflow-hidden border border-black/10 shadow-sm min-h-[420px] sm:min-h-[480px] flex flex-col justify-end group">
            <Image
              src="/images/ministries/community-outreach.jpg"
              alt="About The Narrow Gate Foursquare Church Motta di Livenza community outreach"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={75}
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent z-10 pointer-events-none" />
            
            <div className="relative z-20 p-8 sm:p-12 max-w-2xl text-white">
              <span className="inline-block px-3 py-1 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider mb-3">
                Motta di Livenza • Italy
              </span>
              <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2 leading-snug">
                Reaching The Reached & The Unreached
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                A vibrant international Christian family in Motta di Livenza, Italy.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
