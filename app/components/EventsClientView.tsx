"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import {
  ChurchEvent,
  DEFAULT_EVENTS,
  getUpcomingEvents,
  getPastEvents,
  getNextFeaturedEvent,
  subscribeToEvents,
} from "../../lib/events-store";

interface EventsClientViewProps {
  initialEvents?: ChurchEvent[];
}

export function EventsClientView({ initialEvents = DEFAULT_EVENTS }: EventsClientViewProps) {
  const t = useTranslations("Events");
  const locale = useLocale();
  const [events, setEvents] = useState<ChurchEvent[]>(initialEvents);
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const [expandedScheduleId, setExpandedScheduleId] = useState<string | null>(null);
  const [previewFlyer, setPreviewFlyer] = useState<{ url: string; title: string } | null>(null);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data || []);
    });
    return () => unsubscribe();
  }, []);

  const upcomingEvents = getUpcomingEvents(events);
  const pastEvents = getPastEvents(events);
  const nextFeatured = getNextFeaturedEvent(events);

  // Remaining upcoming events excluding the top featured one
  const otherUpcoming = upcomingEvents.filter((e) => e.id !== nextFeatured?.id);

  // Helper to build Google Calendar link
  const makeCalendarUrl = (event: ChurchEvent) => {
    const title = encodeURIComponent(event.title || "The Narrow Gate Church Event");
    const details = encodeURIComponent(
      `Theme: ${event.theme || ""}\nScripture: ${event.scripture || ""}\nHost: ${event.host || ""}\nVenue: ${event.venue || ""}\n\nThe Narrow Gate Foursquare Gospel Church Italy.`
    );
    const location = encodeURIComponent(event.venue || "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy");
    
    // Parse date for calendar
    let dateParam = "20261115T090000Z/20261115T123000Z";
    if (event.date) {
      const cleanDate = event.date.replace(/-/g, "");
      dateParam = `${cleanDate}T090000Z/${cleanDate}T130000Z`;
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateParam}&details=${details}&location=${location}`;
  };

  const makeMapsUrl = (venue?: string) => {
    const query = encodeURIComponent(venue || "Via Cadamure 1/19, 31045 Motta di Livenza, Italy");
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

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

  return (
    <div className="bg-[#F8F8F8] text-[#121212] min-h-screen">
      {/* 1. Hero Header */}
      <section className="bg-[#121212] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B91C1C]/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-5 shadow-sm">
              {t("badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-white/75 font-body leading-relaxed max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Content: Empty State OR Events Sections */}
      {events.length === 0 ? (
        <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 sm:p-14 rounded-2xl bg-white border border-black/5 shadow-sm space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center mx-auto text-2xl">
                📅
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212]">
                  {t("emptyTitle")}
                </h2>
                <p className="text-sm sm:text-base text-[#525252] font-body max-w-xl mx-auto leading-relaxed">
                  {t("emptySubtitle")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href={`/${locale}#services`}
                  className="px-6 py-3 rounded-lg bg-[#121212] hover:bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  {t("emptyServicesBtn")} →
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="px-6 py-3 rounded-lg bg-white border border-black/10 hover:border-black/30 text-[#121212] font-heading font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {t("emptyContactBtn")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      ) : (
        <>
          {/* Top Next Featured Event Showcase */}
          {nextFeatured && (
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-heading font-bold uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-ping" />
                  {t("featuredSectionTitle")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212]">
                  {nextFeatured.title}
                </h2>
                <p className="text-sm text-[#525252] mt-1 font-body">
                  {t("featuredSectionSubtitle")}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 bg-black/5 p-1 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveFilter("upcoming")}
                  className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded-md transition-all ${
                    activeFilter === "upcoming"
                      ? "bg-[#121212] text-white shadow-sm"
                      : "text-[#525252] hover:text-[#121212]"
                  }`}
                >
                  Upcoming ({upcomingEvents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("past")}
                  className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded-md transition-all ${
                    activeFilter === "past"
                      ? "bg-[#121212] text-white shadow-sm"
                      : "text-[#525252] hover:text-[#121212]"
                  }`}
                >
                  Past ({pastEvents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded-md transition-all ${
                    activeFilter === "all"
                      ? "bg-[#121212] text-white shadow-sm"
                      : "text-[#525252] hover:text-[#121212]"
                  }`}
                >
                  All ({events.length})
                </button>
              </div>
            </div>

            {/* Featured Event Card */}
            <div className="bg-white rounded-2xl border border-black/5 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Details & Schedule */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#B91C1C] text-white text-[11px] font-heading font-bold uppercase tracking-wider">
                      {nextFeatured.tag || "Featured"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#121212]/5 text-[#525252] text-[11px] font-heading font-semibold">
                      Closest Upcoming Special Event
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212] leading-tight">
                    {nextFeatured.title}
                  </h3>

                  {/* Theme Box */}
                  {nextFeatured.theme && (
                    <div className="p-5 rounded-lg bg-[#121212] text-white border-l-4 border-l-[#B91C1C] space-y-1">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#B91C1C]">
                        {t("anniversary.themeTitle")}
                      </span>
                      <p className="text-lg sm:text-xl font-heading font-bold text-[#F2EBD1] italic">
                        "{nextFeatured.theme}"
                      </p>
                      {nextFeatured.scripture && (
                        <p className="text-xs text-white/70 font-body pt-1">
                          {nextFeatured.scripture}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#525252] font-body leading-relaxed">
                    {nextFeatured.overview || t("anniversary.overview")}
                  </p>

                  {/* Program Schedule Breakdown */}
                  {nextFeatured.schedule && nextFeatured.schedule.length > 0 && (
                    <div className="p-5 rounded-xl bg-[#F8F8F8] border border-black/5 space-y-3">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t("anniversary.scheduleTitle")}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#525252] font-body">
                        {nextFeatured.schedule.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#B91C1C] font-bold">{idx + 1}.</span>
                            <span>
                              <strong className="text-[#121212]">{item.time}</strong> — {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Location & Time Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                    <div className="p-3.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                      <strong className="block text-[#121212] font-heading font-bold mb-0.5">Date & Time:</strong>
                      <p className="text-[#525252]">
                        {formatEventDate(nextFeatured.date)} {nextFeatured.time ? `• ${nextFeatured.time}` : ""}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                      <strong className="block text-[#121212] font-heading font-bold mb-0.5">Host & Venue:</strong>
                      <p className="text-[#525252] truncate">{nextFeatured.host || "The Narrow Gate Church"}</p>
                      <p className="text-[#525252]/80 text-[11px] truncate mt-0.5">{nextFeatured.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
                  <a
                    href={makeCalendarUrl(nextFeatured)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-[#121212] hover:bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{t("anniversary.addToCalendar")}</span>
                  </a>

                  <a
                    href={makeMapsUrl(nextFeatured.venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-white border border-black/10 hover:border-black/30 text-[#121212] font-heading font-bold text-xs uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t("anniversary.getDirections")}</span>
                  </a>

                  <Link
                    href={`/${locale}/contact`}
                    className="px-5 py-3 rounded-lg bg-eyebrow-gradient text-white font-heading font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-sm"
                  >
                    {t("anniversary.inquire")}
                  </Link>
                </div>
              </div>

              {/* Right Column: Full Flyer Display with Zoom Trigger */}
              <div className="lg:col-span-5 bg-[#121212] p-6 sm:p-8 flex flex-col items-center justify-center relative">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setPreviewFlyer({
                      url: nextFeatured.flyerUrl || "/images/events/anniversary-flyer.jpg",
                      title: nextFeatured.title,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPreviewFlyer({
                        url: nextFeatured.flyerUrl || "/images/events/anniversary-flyer.jpg",
                        title: nextFeatured.title,
                      });
                    }
                  }}
                  className="w-full max-w-md relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
                >
                  <Image
                    src={nextFeatured.flyerUrl || "/images/events/anniversary-flyer.jpg"}
                    alt={nextFeatured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white font-heading font-bold text-xs uppercase tracking-wider border border-white/30">
                      🔍 Click to Expand Flyer
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between w-full max-w-md text-xs text-white/70">
                  <span className="font-heading font-semibold text-white/90">
                    Official Celebration Flyer
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewFlyer({
                        url: nextFeatured.flyerUrl || "/images/events/anniversary-flyer.jpg",
                        title: nextFeatured.title,
                      })
                    }
                    className="text-xs font-heading font-semibold text-[#B91C1C] hover:underline"
                  >
                    Open Full Size ↗
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 3. Comprehensive Events Card Grid (Every Event has Flyer, Schedule, Calendar, Directions) */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 rounded-md bg-[#0284C7]/10 text-[#0284C7] text-xs font-heading font-bold uppercase tracking-wider mb-2">
                Special Church Programs
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#121212]">
                {activeFilter === "past"
                  ? "Past Special Events & Milestones"
                  : t("upcomingSectionTitle")}
              </h2>
              <p className="text-sm sm:text-base text-[#525252] mt-2 font-body">
                {activeFilter === "past"
                  ? "A legacy of faith, celebrations, and community impact celebrated together."
                  : t("upcomingSectionSubtitle")}
              </p>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeFilter === "upcoming"
                ? otherUpcoming
                : activeFilter === "past"
                ? pastEvents
                : events
              ).map((event) => {
                const isScheduleExpanded = expandedScheduleId === event.id;

                return (
                  <div
                    key={event.id}
                    className="bg-[#F8F8F8] rounded-2xl border border-black/5 overflow-hidden hover:border-black/15 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
                  >
                    {/* Flyer / Poster Thumbnail */}
                    <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
                      <Image
                        src={event.flyerUrl || "/images/events/anniversary-flyer.jpg"}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-[#121212]/90 backdrop-blur-sm text-white border border-white/10 shadow-sm">
                          {event.tag || "Event"}
                        </span>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-[#B91C1C] text-white shadow-sm">
                          {formatEventDate(event.date)}
                        </span>
                      </div>

                      {/* Quick Zoom on hover */}
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewFlyer({
                            url: event.flyerUrl || "/images/events/anniversary-flyer.jpg",
                            title: event.title,
                          })
                        }
                        className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 hover:bg-black/90 backdrop-blur-sm text-white text-[10px] font-heading font-semibold transition-colors"
                      >
                        🔍 Poster
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="text-xs text-[#525252] font-semibold flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{event.time || "10:00 AM"}</span>
                          <span>•</span>
                          <span className="truncate">{event.venue?.split(",")[0] || "Motta di Livenza"}</span>
                        </div>

                        <h3 className="text-lg font-heading font-extrabold text-[#121212] group-hover:text-[#B91C1C] transition-colors line-clamp-2">
                          {event.title}
                        </h3>

                        {event.theme && (
                          <p className="text-xs font-heading font-bold text-[#B91C1C] italic line-clamp-1">
                            "{event.theme}"
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-[#525252] font-body leading-relaxed line-clamp-3">
                          {event.overview}
                        </p>

                        {/* Program Schedule Preview / Expandable */}
                        {event.schedule && event.schedule.length > 0 && (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedScheduleId(isScheduleExpanded ? null : event.id)
                              }
                              className="text-xs font-heading font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                            >
                              <span>{isScheduleExpanded ? "Hide Program Schedule" : "View Program Schedule"}</span>
                              <span>{isScheduleExpanded ? "▲" : "▼"}</span>
                            </button>

                            {isScheduleExpanded && (
                              <ul className="mt-3 p-3 rounded-lg bg-white border border-black/5 text-xs text-[#525252] space-y-1.5 font-body">
                                {event.schedule.map((step, sIdx) => (
                                  <li key={sIdx} className="flex items-start gap-2">
                                    <span className="font-bold text-[#B91C1C]">{step.time}:</span>
                                    <span>{step.title}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Interactive Card Action Buttons */}
                      <div className="pt-4 border-t border-black/5 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={makeCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg bg-white border border-black/10 hover:border-[#121212] text-[#121212] text-[11px] font-heading font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Calendar</span>
                          </a>

                          <a
                            href={makeMapsUrl(event.venue)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg bg-white border border-black/10 hover:border-[#121212] text-[#121212] text-[11px] font-heading font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Map</span>
                          </a>
                        </div>

                        <Link
                          href={`/${locale}/contact`}
                          className="w-full py-2.5 rounded-lg bg-[#121212] hover:bg-[#B91C1C] text-white text-[11px] font-heading font-bold uppercase tracking-wider text-center transition-colors block"
                        >
                          RSVP & Inquire →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flyer Upload & Administration Callout */}
            <div className="mt-14 p-6 sm:p-8 rounded-xl bg-[#121212] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-heading font-bold text-white">
                  Have an Event Inquiry or Looking for the Latest Church Bulletin?
                </h4>
                <p className="text-xs text-white/70 font-body">
                  {t("flyerUploadNotice")}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="px-5 py-2.5 rounded-lg bg-eyebrow-gradient text-white font-heading font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity whitespace-nowrap"
              >
                Contact Administration
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
        </>
      )}

      {/* Flyer Modal / Lightbox */}
      {previewFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewFlyer(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewFlyer(null)}
              className="absolute -top-12 right-0 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white font-heading font-bold text-xs transition-colors"
            >
              ✕ Close
            </button>
            <div className="relative w-full aspect-[3/4] max-h-[80vh] rounded-lg overflow-hidden border border-white/20 shadow-2xl">
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
