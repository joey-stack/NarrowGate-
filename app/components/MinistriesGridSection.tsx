"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "./ScrollReveal";

export function MinistriesGridSection() {
  const t = useTranslations("MinistriesGrid");
  const locale = useLocale();

  const ministries = [
    { title: t("children"), tag: "Kids", img: "/images/ministries/childrens-ministry.jpg" },
    { title: t("youth"), tag: "Youth", img: "/images/ministries/youth-ministry.jpg" },
    { title: t("women"), tag: "Women", img: "/images/ministries/womens-ministry.jpg" },
    { title: t("men"), tag: "Men", img: "/images/ministries/mens-fellowship.jpg" },
    { title: t("counseling"), tag: "Care", img: "/images/ministries/guidance-counseling.jpg" },
    { title: t("choir"), tag: "Worship", img: "/images/ministries/worship-choir.jpg" },
    { title: t("outreach"), tag: "Impact", img: "/images/ministries/community-outreach.jpg" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Header Row */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-4">
                {t("badge")}
              </div>
              <h2 className="text-h1 text-[#121212] leading-tight max-w-md">
                {t("title")}
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
              <p className="text-subheading text-[#525252] leading-relaxed mb-6">
                {t("subtitle")}
              </p>
              <a
                href={`/${locale}/get-involved`}
                className="px-6 py-3 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-accent-light transition-colors inline-block shadow-sm"
              >
                {t("cta")} →
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 6-Card Image Grid with Staggered Scroll Entrance */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m, idx) => (
            <ScrollStaggerItem key={idx}>
              <div
                className="rounded-lg bg-white border border-black/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5 relative h-full"
              >
                {/* Image Frame */}
                <div className="h-56 sm:h-60 relative overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent text-white shadow-sm z-10">
                    {m.tag}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-h3 text-[#121212] mb-2">{m.title}</h3>
                    <p className="text-caption text-[#525252] text-xs">
                      Active fellowship, discipleship, and community engagement for {m.title.toLowerCase()}.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5">
                    <a
                      href={`/${locale}/get-involved`}
                      className="text-xs font-heading font-bold uppercase tracking-wider text-[#121212] group-hover:text-accent flex items-center gap-1.5 transition-colors"
                    >
                      Join Ministry →
                    </a>
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
