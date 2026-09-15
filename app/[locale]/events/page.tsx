import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import { ScrollReveal } from "../../components/ScrollReveal";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  return {
    title: `${t("heroTitle")} | The Narrow Gate Foursquare Church`,
    description: t("heroSubtitle"),
    alternates: {
      canonical: `https://narrowgate-red.vercel.app/${locale}/events`,
      languages: {
        en: "https://narrowgate-red.vercel.app/en/events",
        it: "https://narrowgate-red.vercel.app/it/events",
      },
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <EventsContent />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function EventsContent() {
  const t = useTranslations("Events");
  const locale = useLocale();

  // Google Calendar URL for the Anniversary Celebration
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "The Narrow Gate Church Anniversary Celebration"
  )}&dates=20241117T090000Z/20241117T123000Z&details=${encodeURIComponent(
    "Theme: A Year of Divine Grace & Fruitfulness. The Narrow Gate Foursquare Gospel Church Italy."
  )}&location=${encodeURIComponent(
    "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy"
  )}`;

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Via+Cadamure+1%2F19+31045+Motta+di+Livenza+Italy";

  const upcomingPrograms = [
    {
      key: "culturalSunday",
      title: t("list.culturalSunday.title"),
      tag: t("list.culturalSunday.tag"),
      date: t("list.culturalSunday.date"),
      desc: t("list.culturalSunday.desc"),
      accent: "#B91C1C",
      quote: t("list.culturalSunday.theme"),
      icon: (
        <svg className="w-5 h-5 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: "loveFeast",
      title: t("list.loveFeast.title"),
      tag: t("list.loveFeast.tag"),
      date: t("list.loveFeast.date"),
      desc: t("list.loveFeast.desc"),
      accent: "#0284C7",
      icon: (
        <svg className="w-5 h-5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      key: "prayerSummit",
      title: t("list.prayerSummit.title"),
      tag: t("list.prayerSummit.tag"),
      date: t("list.prayerSummit.date"),
      desc: t("list.prayerSummit.desc"),
      accent: "#B91C1C",
      icon: (
        <svg className="w-5 h-5 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      key: "youthEncounter",
      title: t("list.youthEncounter.title"),
      tag: t("list.youthEncounter.tag"),
      date: t("list.youthEncounter.date"),
      desc: t("list.youthEncounter.desc"),
      accent: "#0284C7",
      icon: (
        <svg className="w-5 h-5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      key: "foodDrive",
      title: t("list.foodDrive.title"),
      tag: t("list.foodDrive.tag"),
      date: t("list.foodDrive.date"),
      desc: t("list.foodDrive.desc"),
      accent: "#B91C1C",
      icon: (
        <svg className="w-5 h-5 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#F8F8F8] text-[#121212] min-h-screen">
      {/* 1. Hero Section */}
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

      {/* 2. Featured Current Event (Church Anniversary & Flyer Showcase) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-heading font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-ping" />
              {t("featuredSectionTitle")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212]">
              {t("anniversary.title")}
            </h2>
            <p className="text-sm text-[#525252] mt-1 font-body">
              {t("featuredSectionSubtitle")}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Event Overview & Schedule */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#B91C1C] text-white text-[11px] font-heading font-bold uppercase tracking-wider">
                    {t("anniversary.tag")}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#121212]/5 text-[#525252] text-[11px] font-heading font-semibold">
                    Annual Milestone
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#121212] leading-tight">
                  {t("anniversary.title")}
                </h3>

                {/* Theme Box */}
                <div className="p-5 rounded-lg bg-[#121212] text-white border-l-4 border-l-[#B91C1C] space-y-1">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#B91C1C]">
                    {t("anniversary.themeTitle")}
                  </span>
                  <p className="text-lg sm:text-xl font-heading font-bold text-[#F2EBD1] italic">
                    {t("anniversary.theme")}
                  </p>
                  <p className="text-xs text-white/70 font-body pt-1">
                    {t("anniversary.scripture")}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#525252] font-body leading-relaxed">
                  {t("anniversary.overview")}
                </p>

                {/* Event Schedule Breakdown */}
                <div className="p-5 rounded-xl bg-[#F8F8F8] border border-black/5 space-y-3">
                  <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#B91C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("anniversary.scheduleTitle")}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#525252] font-body">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">1.</span>
                      <span>{t("anniversary.part1")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">2.</span>
                      <span>{t("anniversary.part2")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">3.</span>
                      <span>{t("anniversary.part3")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">4.</span>
                      <span>{t("anniversary.part4")}</span>
                    </li>
                  </ul>
                </div>

                {/* Location & Time Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                  <div className="p-3.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">Date & Time:</strong>
                    <p className="text-[#525252]">{t("anniversary.date")} | {t("anniversary.time")}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F8F8F8] border border-black/5">
                    <strong className="block text-[#121212] font-heading font-bold mb-0.5">Host:</strong>
                    <p className="text-[#525252]">{t("anniversary.host")}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
                <a
                  href={gcalUrl}
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
                  href={mapUrl}
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

            {/* Right Column: Full Flyer Display */}
            <div className="lg:col-span-5 bg-[#121212] p-6 sm:p-8 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-md relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src="/images/events/anniversary-flyer.jpg"
                  alt={t("anniversary.flyerTitle")}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between w-full max-w-md text-xs text-white/70">
                <span className="font-heading font-semibold text-white/90">
                  {t("anniversary.flyerTitle")}
                </span>
                <a
                  href="/images/events/anniversary-flyer.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-semibold text-[#B91C1C] hover:underline"
                >
                  Open Full Size ↗
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Annual & Upcoming Programs Grid */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 rounded-md bg-[#0284C7]/10 text-[#0284C7] text-xs font-heading font-bold uppercase tracking-wider mb-2">
                Calendar Highlights
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#121212]">
                {t("upcomingSectionTitle")}
              </h2>
              <p className="text-sm sm:text-base text-[#525252] mt-2 font-body">
                {t("upcomingSectionSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingPrograms.map((prog) => (
                <div
                  key={prog.key}
                  className="p-7 rounded-xl bg-[#F8F8F8] border border-black/5 hover:border-black/15 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-white border border-black/5 text-[#121212]">
                        {prog.tag}
                      </span>
                      <div className="p-2 rounded-lg bg-white border border-black/5 shadow-xs">
                        {prog.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-[#121212] group-hover:text-[#B91C1C] transition-colors">
                      {prog.title}
                    </h3>

                    {prog.quote && (
                      <p className="text-xs font-heading font-semibold text-[#B91C1C] italic">
                        {prog.quote}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#525252] font-body leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-heading">
                    <span className="font-bold text-[#121212]">
                      {prog.date}
                    </span>
                    <Link
                      href={`/${locale}/contact`}
                      className="text-[#B91C1C] font-semibold hover:underline"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Flyer Upload & Bulletin Notice */}
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
    </div>
  );
}
