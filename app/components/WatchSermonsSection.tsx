"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function WatchSermonsSection() {
  const t = useTranslations("WatchSermons");
  const locale = useLocale();

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-4">
              {t("badge")}
            </div>
            <h2 className="text-h1 text-[#121212]">{t("title")}</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Card */}
          <ScrollReveal className="lg:col-span-5 h-full">
            <div className="rounded-lg bg-[#F8F8F8] p-8 sm:p-10 flex flex-col justify-between h-full border border-black/10 shadow-sm">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/15 px-3 py-1 rounded-lg inline-block mb-4">
                  Audio & Video Messages
                </span>
                <h3 className="text-h3 text-[#121212] mb-4">
                  Inspiring Sermons & Praise Worship
                </h3>
                <p className="text-body text-[#525252] leading-relaxed mb-8">
                  {t("description")}
                </p>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/@thenarrowgatefoursquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-accent-light transition-colors inline-flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  {t("cta")} →
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Video Lightbox Mockup with Optimized Next/Image */}
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="rounded-lg bg-[#121212] text-white p-12 sm:p-16 text-center shadow-md relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] group border border-black/10">
              <Image
                src="https://framerusercontent.com/images/vNYAHbbiUXDLkEzHQ9hQjrLshlk.jpeg"
                alt="Sunday Main Worship Service Recording"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={75}
                loading="lazy"
                className="object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent pointer-events-none z-10" />

              <div className="relative z-20 flex flex-col items-center">
                <a
                  href="https://www.youtube.com/@thenarrowgatefoursquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Play Sunday Worship Service Recording"
                  className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform mb-6 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  <svg className="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
                <h4 className="font-heading font-bold text-white text-xl sm:text-2xl mb-1">
                  Sunday Main Worship Service Recording
                </h4>
                <p className="text-white/70 text-xs font-heading uppercase tracking-wider">
                  The Narrow Gate Foursquare Church Media
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
