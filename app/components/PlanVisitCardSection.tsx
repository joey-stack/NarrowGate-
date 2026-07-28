"use client";

import { useTranslations, useLocale } from "next-intl";

export function PlanVisitCardSection() {
  const t = useTranslations("PlanVisitCard");
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-20 bg-[#121212] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sleek Horizontal Banner Card (Foursquare Royal Purple CTA -> Gold Hover) */}
        <div className="rounded-lg bg-[#1E1E1E] text-white p-8 sm:p-10 border border-white/10 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 transition-all">
          {/* Left Text Block */}
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-md bg-[#6B21A8]/30 text-white text-xs font-heading font-bold uppercase tracking-wider mb-3 border border-[#6B21A8]/50">
              {t("badge")}
            </div>
            <h3 className="font-heading font-bold text-white text-xl sm:text-2xl leading-snug mb-3">
              <span className="block">"{t("quoteLine1")}</span>
              <span className="block">{t("quoteLine2")}"</span>
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-body flex items-center gap-1.5">
              <span>📍</span> {t("locationText")}
            </p>
          </div>

          {/* Right Action Area (Royal Purple -> Gold Hover Button) */}
          <div className="shrink-0">
            <a
              href={`/${locale}/contact`}
              className="px-8 py-4 rounded-lg bg-[#6B21A8] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#EAB308] hover:text-[#121212] hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              {t("cta")} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
