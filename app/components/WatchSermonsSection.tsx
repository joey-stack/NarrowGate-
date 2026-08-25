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
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
              {t("badge")}
            </div>
            <h2 className="text-h1 text-[#121212]">{t("title")}</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Card */}
          <ScrollReveal className="lg:col-span-5 h-full">
            <div className="rounded-lg bg-[#f2ebd1] p-8 sm:p-10 flex flex-col justify-between h-full border border-black/10 shadow-sm">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-white bg-eyebrow-gradient px-3 py-1 rounded-lg inline-block mb-4 shadow-sm">
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
                  className="btn-gradient-link text-xs"
                >
                  <span>{t("cta")}</span>
                  <span className="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Autoplay Sermon Video Container */}
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="rounded-lg bg-black overflow-hidden shadow-md border border-black/10 relative h-[360px] sm:h-[420px] lg:h-[480px] w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                className="w-full h-full object-cover object-center pointer-events-none"
              >
                <source src="/videos/sermon-worship-recording.webm" type="video/webm" />
                <source src="/videos/sermon-worship-recording.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
