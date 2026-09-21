"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { usePlanVisit } from "./PlanVisitContext";
import { ChurchEvent } from "../../lib/events-store";

interface EventDetailClientViewProps {
  event: ChurchEvent;
}

export function EventDetailClientView({ event }: EventDetailClientViewProps) {
  const t = useTranslations("Events");
  const locale = useLocale();
  const { openPlanVisitModal } = usePlanVisit();
  const [previewFlyer, setPreviewFlyer] = useState<{ url: string; title: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const flyerImage =
    event.flyerUrl === "/images/events/anniversary-flyer.jpg"
      ? "/images/events/back-to-bethel-20th-anniversary.jpg"
      : (event.flyerUrl || "/images/events/back-to-bethel-20th-anniversary.jpg");

  // Format date display
  const formattedDate = (() => {
    try {
      if (!event.date) return "";
      const d = new Date(event.date + "T00:00:00");
      return d.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return event.date;
    }
  })();

  // Helper to build Google Calendar link
  const makeCalendarUrl = () => {
    const title = encodeURIComponent(event.title || "The Narrow Gate Church Event");
    const details = encodeURIComponent(
      `Theme: ${event.theme || ""}\nScripture: ${event.scripture || ""}\nHost: ${event.host || ""}\nVenue: ${event.venue || ""}\n\nThe Narrow Gate Foursquare Gospel Church Italy.`
    );
    const location = encodeURIComponent(event.venue || "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy");
    
    let dateParam = "20261016T170000Z/20261018T130000Z";
    if (event.date) {
      const cleanDate = event.date.replace(/-/g, "");
      dateParam = `${cleanDate}T170000Z/${cleanDate}T200000Z`;
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateParam}&details=${details}&location=${location}`;
  };

  const makeMapsUrl = () => {
    const query = encodeURIComponent(event.venue || "Via Cadamure 1/19, 31045 Motta di Livenza, Italy");
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: event.title,
            text: `${event.title} — ${event.theme || ""}`,
            url: window.location.href,
          });
        } catch {
          // User cancelled share
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    }
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#121212]">
      {/* Top Banner Navigation */}
      <section className="bg-[#121212] text-white pt-24 pb-14 sm:pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B91C1C]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            {/* Breadcrumbs & Back Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-heading">
              <div className="flex items-center gap-2 text-white/50">
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href={`/${locale}/events`} className="hover:text-white transition-colors">
                  {t("heroTitle")}
                </Link>
                <span>/</span>
                <span className="text-white truncate max-w-xs">{event.title}</span>
              </div>

              <Link
                href={`/${locale}/events`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-semibold"
              >
                <span>←</span>
                <span>{t("detail.backToEvents")}</span>
              </Link>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {event.tag || t("detail.tagUpcoming")}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight max-w-4xl">
              {event.title}
            </h1>

            {/* Sub-bar */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/80 font-body">
              <span className="flex items-center gap-2 font-semibold">
                <svg className="w-4 h-4 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate} {event.time ? `• ${event.time}` : ""}
              </span>

              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.venue}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area: 2 Columns */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left / Main Column (Col 8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Theme & Scripture Box */}
            {event.theme && (
              <ScrollReveal>
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/5 shadow-md border-l-8 border-l-[#B91C1C]">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#B91C1C] block mb-2">
                    {t("detail.themeTitle")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212] italic">
                    "{event.theme}"
                  </h2>
                  {event.scripture && (
                    <p className="text-sm text-[#525252] font-body pt-2 border-t border-black/5 mt-3">
                      {event.scripture}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Overview / Story */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-black/5 p-6 sm:p-10 shadow-md space-y-4">
                <h3 className="text-xl font-heading font-extrabold text-[#121212]">
                  {t("detail.overviewTitle")}
                </h3>
                <div className="text-sm sm:text-base text-[#525252] font-body leading-relaxed space-y-4 whitespace-pre-line">
                  {event.overview}
                </div>
              </div>
            </ScrollReveal>

            {/* Program Schedule Breakdown */}
            {event.schedule && event.schedule.length > 0 && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-black/5 p-6 sm:p-10 shadow-md space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-extrabold text-[#121212]">
                        {t("detail.scheduleTitle")}
                      </h3>
                      <p className="text-xs text-[#525252] font-body">
                        Join every session prompt to receive the full spiritual blessing
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    {event.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-xl bg-[#F8F8F8] border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-black/15 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#121212] text-white text-xs font-heading font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-heading font-bold text-[#121212]">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-md bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-heading font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Actions Bar (Calendar, Maps, RSVP) */}
            <ScrollReveal>
              <div className="bg-[#121212] rounded-2xl p-6 sm:p-8 text-white space-y-5 shadow-xl">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-1">
                    Ready to Attend? Mark Your Calendar & Plan Your Visit
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-body">
                    We would love to welcome you and your family to this celebration.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href={makeCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-eyebrow-gradient text-white font-heading font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity inline-flex items-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{t("detail.addToCalendar")}</span>
                  </a>

                  <a
                    href={makeMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-white/10 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t("detail.getDirections")}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openPlanVisitModal("sundayService")}
                    className="px-5 py-3 rounded-lg bg-white text-[#121212] hover:bg-gray-100 font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    {t("detail.inquire")}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-heading font-semibold text-xs transition-colors border border-white/10 ml-auto"
                  >
                    {copySuccess ? "✓ Copied!" : `↗ ${t("detail.shareEvent")}`}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right / Sidebar Column (Col 4) */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Official Flyer Box with Zoom */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-black/5 shadow-md overflow-hidden p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-[#121212] text-sm">
                    {t("detail.flyerTitle")}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPreviewFlyer({ url: flyerImage, title: event.title })}
                    className="text-xs text-[#B91C1C] hover:underline font-heading font-semibold"
                  >
                    {t("detail.expandFlyer")} ↗
                  </button>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setPreviewFlyer({ url: flyerImage, title: event.title })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPreviewFlyer({ url: flyerImage, title: event.title });
                    }
                  }}
                  className="relative aspect-[1024/721] w-full rounded-xl overflow-hidden border border-black/10 shadow-sm group cursor-pointer bg-[#121212]"
                >
                  <Image
                    src={flyerImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/25 backdrop-blur-md text-white font-heading font-bold text-xs uppercase tracking-wider border border-white/30">
                      🔍 Click to Zoom
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Facts Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl border border-black/5 shadow-md p-6 sm:p-8 space-y-5">
                <h3 className="text-base font-heading font-bold text-[#121212] pb-3 border-b border-black/5">
                  {t("detail.quickFactsTitle")}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm font-body">
                  <div>
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">
                      {t("detail.dateLabel")}:
                    </strong>
                    <p className="text-[#525252]">{formattedDate}</p>
                  </div>

                  <div>
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">
                      {t("detail.timeLabel")}:
                    </strong>
                    <p className="text-[#525252]">{event.time || "See program timetable"}</p>
                  </div>

                  <div>
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">
                      {t("detail.venueLabel")}:
                    </strong>
                    <p className="text-[#525252] leading-relaxed">{event.venue}</p>
                    <a
                      href={makeMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0284C7] hover:underline font-semibold inline-flex items-center gap-1 mt-1 text-xs"
                    >
                      <span>Open in Google Maps</span>
                      <span>↗</span>
                    </a>
                  </div>

                  <div>
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">
                      {t("detail.hostTitle")}:
                    </strong>
                    <p className="text-[#525252] leading-relaxed">{event.host}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/5">
                  <Link
                    href={`/${locale}/events`}
                    className="w-full py-3 px-4 rounded-lg bg-[#F8F8F8] hover:bg-black/5 text-[#121212] font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-black/5 inline-flex items-center justify-center gap-2"
                  >
                    <span>← {t("detail.backToEvents")}</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lightbox / Zoom Modal for Flyer */}
      {previewFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewFlyer(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewFlyer(null)}
              className="absolute -top-12 right-0 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white font-heading font-bold text-xs transition-colors"
            >
              ✕ Close
            </button>
            <div className="relative w-full aspect-[1024/721] max-h-[80vh] rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={previewFlyer.url}
                alt={previewFlyer.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-white text-sm font-heading font-semibold text-center">
              {previewFlyer.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
