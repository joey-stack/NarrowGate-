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
  getUpcomingEvents,
  getPastEvents,
  subscribeToEvents,
} from "../../lib/events-store";

interface EventsClientViewProps {
  initialEvents?: ChurchEvent[];
}

export function EventsClientView({ initialEvents = DEFAULT_EVENTS }: EventsClientViewProps) {
  const t = useTranslations("Events");
  const tWeekly = useTranslations("WeeklyGatherings");
  const locale = useLocale();
  const { openPlanVisitModal } = usePlanVisit();
  const [events, setEvents] = useState<ChurchEvent[]>(initialEvents);
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "past" | "all">("upcoming");

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data || []);
    });
    return () => unsubscribe();
  }, []);

  const upcomingEvents = getUpcomingEvents(events);
  const pastEvents = getPastEvents(events);

  const displayedEvents =
    activeFilter === "upcoming"
      ? upcomingEvents
      : activeFilter === "past"
      ? pastEvents
      : [...events].sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const weeklyGatherings = [
    {
      title: tWeekly("wednesdayTitle"),
      time: tWeekly("wednesdayTime"),
      tag: "BIBLE STUDY",
      img: "/images/gatherings/bible-study.jpg",
      key: "wednesdayBible",
    },
    {
      title: tWeekly("saturdayTitle"),
      time: tWeekly("saturdayTime"),
      tag: "PRAYER",
      img: "/images/gatherings/intercessory-prayer.jpg",
      key: "saturdayPrayer",
    },
    {
      title: tWeekly("sundayBreakfastTitle"),
      time: tWeekly("sundayBreakfastTime"),
      tag: "FELLOWSHIP",
      img: "/images/gatherings/breakfast-prayer.jpg",
      key: "sundayBreakfast",
    },
    {
      title: tWeekly("sundayServiceTitle"),
      time: tWeekly("sundayServiceTime"),
      tag: "SUNDAY SERVICE",
      img: "/images/gatherings/sunday-service.jpg",
      key: "sundayService",
    },
  ];

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#121212]">
      {/* Archive Page Hero Header */}
      <section className="bg-[#121212] text-white pt-24 pb-16 sm:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B91C1C]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            {/* Breadcrumb navigation */}
            <div className="flex items-center gap-2 text-xs text-white/50 mb-6 font-heading">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">{t("heroTitle")}</span>
            </div>

            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
              {t("badge")}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              {t("archiveTitle")}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl font-body leading-relaxed">
              {t("archiveSubtitle")}
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-8">
              <button
                type="button"
                onClick={() => setActiveFilter("upcoming")}
                className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeFilter === "upcoming"
                    ? "bg-[#B91C1C] text-white shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {t("filterUpcoming")} ({upcomingEvents.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("past")}
                className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeFilter === "past"
                    ? "bg-[#B91C1C] text-white shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {t("filterPast")} ({pastEvents.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeFilter === "all"
                    ? "bg-[#B91C1C] text-white shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {t("filterAll")} ({events.length})
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Program Cards Archive Feed */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedEvents.length === 0 ? (
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-black/5 p-12 text-center max-w-2xl mx-auto shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-black/5 text-[#525252] flex items-center justify-center mx-auto text-2xl">
                📅
              </div>
              <h3 className="text-xl font-heading font-bold text-[#121212]">
                {t("emptyTitle")}
              </h3>
              <p className="text-sm text-[#525252] font-body leading-relaxed">
                {t("emptySubtitle")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="#weekly-activities"
                  className="px-5 py-2.5 rounded-lg bg-[#121212] hover:bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  {t("emptyServicesBtn")} ↓
                </a>
                <Link
                  href={`/${locale}/contact`}
                  className="px-5 py-2.5 rounded-lg bg-white border border-black/10 hover:border-black/30 text-[#121212] font-heading font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {t("emptyContactBtn")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-8">
            {displayedEvents.map((event, idx) => {
              const flyerUrl = event.flyerUrl || "/images/events/back-to-bethel-20th-anniversary.jpg";
              const isClosest = idx === 0 && activeFilter === "upcoming";

              return (
                <ScrollReveal key={event.id}>
                  {/* Event Card: Content on Left, Image on Right */}
                  <article className="bg-white rounded-2xl border border-black/8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                      {/* Left Column: Event Information */}
                      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 order-2 lg:order-1">
                        <div>
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-3 py-1 rounded-full bg-[#B91C1C] text-white text-[11px] font-heading font-bold uppercase tracking-wider shadow-sm">
                              {event.tag || "Special Event"}
                            </span>
                            {isClosest && (
                              <span className="px-3 py-1 rounded-full bg-[#121212] text-[#F2EBD1] text-[11px] font-heading font-semibold flex items-center gap-1.5 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Closest Upcoming Event
                              </span>
                            )}
                          </div>

                          {/* Event Title */}
                          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212] tracking-tight group-hover:text-[#B91C1C] transition-colors leading-snug">
                            <Link href={`/${locale}/events/${event.id}`}>
                              {event.title}
                            </Link>
                          </h2>

                          {/* Theme & Scripture Box */}
                          {event.theme && (
                            <div className="my-3.5 p-3.5 rounded-lg bg-[#F8F8F8] border border-black/5 border-l-4 border-l-[#B91C1C]">
                              <p className="text-sm sm:text-base font-heading font-bold text-[#121212] italic">
                                "{event.theme}"
                              </p>
                              {event.scripture && (
                                <p className="text-xs text-[#525252] font-body pt-0.5">
                                  {event.scripture}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-[#525252] font-body leading-relaxed line-clamp-3 mt-2">
                            {event.overview}
                          </p>

                          {/* Meta: Date, Time & Venue */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 text-xs font-body text-[#525252]">
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                              <svg className="w-4 h-4 text-[#B91C1C] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-semibold text-[#121212] truncate">
                                {formatEventDate(event.date)} {event.time ? `• ${event.time}` : ""}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                              <svg className="w-4 h-4 text-[#0284C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="font-medium truncate">{event.venue}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Button linking to Dedicated Detail Page */}
                        <div className="pt-2">
                          <Link
                            href={`/${locale}/events/${event.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-eyebrow-gradient text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-95 transition-all group-hover:shadow-md"
                          >
                            <span>{t("viewDetails")}</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Event Flyer Image */}
                      <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 bg-[#121212] flex items-center justify-center order-1 lg:order-2 self-stretch">
                        <Link
                          href={`/${locale}/events/${event.id}`}
                          className="relative w-full aspect-[1024/721] rounded-xl overflow-hidden border border-white/10 shadow-lg block group/img"
                        >
                          <Image
                            src={flyerUrl}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 450px"
                            className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                            priority={idx === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-heading font-bold flex items-center gap-1.5">
                              {t("viewDetails")} →
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Weekly Activities & Gatherings Section (Placed Under All Event Cards) */}
      <section id="weekly-activities" className="py-20 sm:py-24 bg-[#121212] text-white border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-sm">
                  {t("weeklyBadge")}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
                  {t("weeklyTitle")}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl font-body leading-relaxed">
                  {t("weeklySubtitle")}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openPlanVisitModal("sundayService")}
                  className="px-6 py-3.5 rounded-lg bg-eyebrow-gradient text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all inline-flex items-center gap-2 group"
                >
                  <span>{t("weeklyPlanVisit")}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* 4-Card Grid of Regular Weekly Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyGatherings.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="rounded-xl bg-[#1E1E1E] border border-white/10 overflow-hidden flex flex-col justify-between hover:bg-[#252525] transition-all duration-200 shadow-md group h-full">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={70}
                      loading="lazy"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/30" />
                    <span className="absolute top-3 right-3 text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#B91C1C] text-white shadow-sm z-10">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-white text-base mb-1.5 group-hover:text-[#F2EBD1] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#0284C7] font-semibold flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.time}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openPlanVisitModal(item.key as any)}
                      className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-white/10"
                    >
                      {t("weeklyPlanVisit")} →
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
