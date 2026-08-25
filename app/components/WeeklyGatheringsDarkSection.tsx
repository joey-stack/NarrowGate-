"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";

import { usePlanVisit } from "./PlanVisitContext";

export function WeeklyGatheringsDarkSection() {
  const t = useTranslations("WeeklyGatherings");
  const locale = useLocale();
  const { openPlanVisitModal } = usePlanVisit();

  const events = [
    {
      title: t("wednesdayTitle"),
      time: t("wednesdayTime"),
      tag: "WORSHIP & STUDY",
      img: "/images/gatherings/bible-study.jpg",
      gatheringKey: "wednesdayBible",
    },
    {
      title: t("saturdayTitle"),
      time: t("saturdayTime"),
      tag: "PRAYER",
      img: "/images/gatherings/intercessory-prayer.jpg",
      gatheringKey: "saturdayPrayer",
    },
    {
      title: t("sundayBreakfastTitle"),
      time: t("sundayBreakfastTime"),
      tag: "FELLOWSHIP",
      img: "/images/gatherings/breakfast-prayer.jpg",
      gatheringKey: "sundayBreakfast",
    },
    {
      title: t("sundayServiceTitle"),
      time: t("sundayServiceTime"),
      tag: "SUNDAY SERVICE",
      img: "/images/gatherings/sunday-service.jpg",
      gatheringKey: "sundayService",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#121212] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                {t("badge")}
              </div>
              <h2 className="text-h1 text-white mb-2">{t("title")}</h2>
              <p className="text-subheading text-white/70 max-w-xl">{t("subtitle")}</p>
            </div>

            <div>
              <button
                onClick={() => openPlanVisitModal("sundayService")}
                className="px-6 py-3 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-accent-light transition-colors inline-block shadow-sm cursor-pointer"
              >
                Plan a Visit →
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Card Dark Grid Layout with Staggered Scroll Entrance */}
        <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((item, i) => (
            <ScrollStaggerItem key={i}>
              <div
                className="rounded-lg bg-[#1E1E1E] border border-white/10 overflow-hidden flex flex-col justify-between hover:bg-[#252525] transition-all duration-200 shadow-sm group h-full"
              >
                {/* Image Frame */}
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/20" />
                  <span className="absolute top-3 right-3 text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent text-white shadow-sm z-10">
                    {item.tag}
                  </span>
                </div>

                {/* Text Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 font-body">
                      {item.time}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => openPlanVisitModal(item.gatheringKey)}
                      className="text-xs font-heading font-bold uppercase tracking-wider text-accent hover:text-accent-light transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Join Gathering →
                    </button>
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </section>
  );
}
