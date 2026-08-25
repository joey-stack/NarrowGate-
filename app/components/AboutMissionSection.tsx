"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";

export function AboutMissionSection() {
  const t = useTranslations("AboutMission");

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-black/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          {/* Header Badge + Quote Icon */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm">
              {t("badge")}
            </span>
            <span className="text-accent text-3xl font-serif">”</span>
          </div>

          {/* Large Editorial Statement */}
          <blockquote className="font-heading font-bold text-[#121212] text-xl sm:text-3xl leading-relaxed tracking-tight mb-4">
            "{t("quote")}"
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
