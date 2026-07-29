"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";

export function AboutBeliefsDarkSection() {
  const t = useTranslations("AboutBeliefs");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#121212] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5-span) */}
          <ScrollReveal className="lg:col-span-5 sticky top-28">
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/20 text-accent-light text-xs font-heading font-bold uppercase tracking-wider mb-4">
              {t("badge")}
            </div>
            <h2 className="text-h1 text-white mb-6">{t("title")}</h2>
            <p className="text-subheading text-white/70 leading-relaxed mb-8">
              {t("subtitle")}
            </p>

            <div className="p-6 rounded-lg bg-[#1E1E1E] border border-white/10">
              <span className="block text-accent font-heading font-bold text-sm uppercase tracking-wider mb-2">
                The 4 Foursquare Tenets
              </span>
              <ul className="space-y-2 text-xs text-white/80 font-body">
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span> Jesus Christ: Our Savior
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span> Jesus Christ: Our Baptizer with the Holy Spirit
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span> Jesus Christ: Our Healer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span> Jesus Christ: Our Soon-Coming King
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Right Accordion List with Staggered Scroll Entrance */}
          <ScrollStaggerContainer className="lg:col-span-7 space-y-3">
            {items.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <ScrollStaggerItem key={idx}>
                  <div
                    className="rounded-lg bg-[#1E1E1E] border border-white/10 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleItem(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-white text-base hover:text-accent transition-colors"
                    >
                      <span>{item.q}</span>
                      <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-accent text-lg shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-white/80 text-sm font-body leading-relaxed border-t border-white/10">
                        {item.a}
                      </div>
                    )}
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>
        </div>
      </div>
    </section>
  );
}
