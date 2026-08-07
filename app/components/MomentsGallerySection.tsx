"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function MomentsGallerySection() {
  const t = useTranslations("Gallery");

  const images = [
    "/images/ministries/youth-ministry.jpg",
    "/images/ministries/womens-ministry.jpg",
    "/images/ministries/mens-fellowship.jpg",
    "/images/ministries/worship-choir.jpg",
    "/images/ministries/community-outreach.jpg",
    "/images/who-we-are-banner.jpg",
    "/images/gatherings/sunday-service.jpg",
  ];

  // Duplicate images array for seamless infinite marquee loop
  const marqueeList = [...images, ...images];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F8F8] border-t border-black/5 overflow-hidden">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[#B91C1C]/15 text-[#B91C1C] text-xs font-heading font-bold uppercase tracking-wider mb-4 border border-[#B91C1C]/20">
          {t("badge")}
        </div>
        <h2 className="text-h1 text-[#121212]">{t("title")}</h2>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Subtle Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10 pointer-events-none" />

        {/* Sliding Marquee Track */}
        <div className="animate-marquee flex items-center gap-6 px-3">
          {marqueeList.map((imgUrl, idx) => (
            <div
              key={idx}
              className="shrink-0 w-72 sm:w-96 lg:w-[420px] h-64 sm:h-80 lg:h-96 rounded-[5px] bg-white border border-black/10 shadow-sm overflow-hidden relative group hover:shadow-md transition-all duration-300"
            >
              <Image
                src={imgUrl}
                alt="The Narrow Gate Church Community Moment"
                fill
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 420px"
                quality={75}
                loading="lazy"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
