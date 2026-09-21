"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { usePlanVisit } from "./PlanVisitContext";
import {
  ChurchEvent,
  DEFAULT_EVENTS,
  getNextFeaturedEvent,
  subscribeToEvents,
} from "../../lib/events-store";

export function FeaturedEventSection() {
  const t = useTranslations("FeaturedEvent");
  const locale = useLocale();
  const { openPlanVisitModal } = usePlanVisit();
  const [events, setEvents] = useState<ChurchEvent[]>(DEFAULT_EVENTS);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data || []);
    });
    return () => unsubscribe();
  }, []);

  const featured = getNextFeaturedEvent(events);

  // If no upcoming or special event is scheduled, cleanly hide section
  if (!featured) {
    return null;
  }

  // Format date display nicely based on locale
  const formattedDate = (() => {
    try {
      if (!featured.date) return t("dateValue");
      const d = new Date(featured.date + "T00:00:00");
      return d.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return featured.date;
    }
  })();

  const flyerImage =
    featured.flyerUrl === "/images/events/anniversary-flyer.jpg"
      ? "/images/events/back-to-bethel-20th-anniversary.jpg"
      : (featured.flyerUrl || "/images/events/back-to-bethel-20th-anniversary.jpg");

  return (
    <section className="py-20 sm:py-28 bg-[#181818] text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B91C1C]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {t("badge")}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                {featured.title || t("title")}
              </h2>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-body">
                {featured.overview || t("description")}
              </p>

              {/* Theme Callout Box */}
              {featured.theme && (
                <div className="p-5 rounded-lg bg-white/5 border border-white/10 border-l-4 border-l-[#B91C1C]">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#B91C1C] block mb-1">
                    {t("themeLabel")}
                  </span>
                  <p className="text-lg sm:text-xl font-heading font-bold text-[#F2EBD1] italic">
                    "{featured.theme}"
                  </p>
                  {featured.scripture && (
                    <p className="text-xs text-white/60 font-body pt-1">
                      {featured.scripture}
                    </p>
                  )}
                </div>
              )}

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-heading font-bold text-white/50 uppercase tracking-wider">
                    <svg className="w-4 h-4 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t("dateLabel")}
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {formattedDate} {featured.time ? `• ${featured.time}` : ""}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-heading font-bold text-white/50 uppercase tracking-wider">
                    <svg className="w-4 h-4 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t("locationLabel")}
                  </div>
                  <p className="text-sm font-semibold text-white truncate">
                    {featured.venue || t("locationValue")}
                  </p>
                </div>
              </div>

              {/* Highlights bullets (from event schedule or default) */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-white/60 block">
                  {t("highlightsLabel")}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-body">
                  {featured.schedule && featured.schedule.length > 0 ? (
                    featured.schedule.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#B91C1C] font-bold mt-0.5">✦</span>
                        <span>
                          <strong className="text-white font-medium">{item.time}</strong> — {item.title}
                        </span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#B91C1C] font-bold mt-0.5">✦</span>
                        <span>{t("highlight1")}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#B91C1C] font-bold mt-0.5">✦</span>
                        <span>{t("highlight2")}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={`/${locale}/events`}
                  className="px-6 py-3.5 rounded-lg bg-eyebrow-gradient hover:opacity-95 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span>{t("viewAllBtn")}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>

                <button
                  type="button"
                  onClick={() => openPlanVisitModal("sundayService")}
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs transition-colors duration-200 border border-white/10"
                >
                  Plan Your Visit
                </button>
              </div>
            </div>

            {/* Right Flyer Column */}
            <div className="lg:col-span-5 flex justify-center">
              <Link
                href={`/${locale}/events`}
                className="group relative block w-full max-w-lg rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#121212] transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-[#B91C1C] text-white text-[11px] font-heading font-bold uppercase tracking-wider shadow-md">
                  {featured.tag || "Upcoming Event"}
                </div>

                <div className="relative aspect-[1024/721] w-full overflow-hidden bg-black/40">
                  <Image
                    src={flyerImage}
                    alt={featured.title || t("flyerAlt")}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-heading font-bold flex items-center gap-2">
                      Click to View Full Event Details & Program Schedule →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
