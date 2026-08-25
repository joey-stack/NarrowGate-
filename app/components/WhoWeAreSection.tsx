"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function WhoWeAreSection() {
  const t = useTranslations("WhoWeAre");
  const locale = useLocale();

  return (
    <section className="py-20 sm:py-28 bg-[#f2ebd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Split Header Row (OneChurch Template Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-5">
              {/* Sub-badge Pill */}
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                {t("badge")}
              </div>
              <h3 className="text-caption font-heading font-bold text-accent uppercase tracking-widest mb-4">
                Our Identity
              </h3>
              <a
                href={`/${locale}/about`}
                className="btn-gradient-link text-xs"
              >
                <span>{t("cta")}</span>
                <span className="arrow-icon">→</span>
              </a>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-h1 text-[#121212] mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-subheading text-[#525252] leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Feature Banner Card */}
        <ScrollReveal delay={0.2}>
          <div className="relative rounded-lg overflow-hidden border border-black/10 shadow-sm min-h-[420px] sm:min-h-[480px] flex flex-col justify-end group">
            <Image
              src="/images/who-we-are-banner.jpg"
              alt="The Narrow Gate Foursquare Church Motta di Livenza sanctuary service"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={85}
              loading="lazy"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/40 to-transparent z-10 pointer-events-none" />
            
            <div className="relative z-20 p-8 sm:p-12 max-w-2xl text-white">
              <span className="inline-block px-3 py-1 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider mb-3">
                Motta di Livenza • Italy
              </span>
              <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2 leading-snug">
                Welcoming Everyone Into God's Family
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Experience warm Christian fellowship, spirit-filled worship, and true international unity in Italy.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
