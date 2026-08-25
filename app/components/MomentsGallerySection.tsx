"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

export function MomentsGallerySection() {
  const t = useTranslations("Gallery");

  const baseItems: GalleryItem[] = [
    {
      type: "image",
      src: "/images/who-we-are-banner.jpg",
      alt: "The Narrow Gate Church Motta di Livenza",
    },
    {
      type: "video",
      src: "/videos/worship-video-1.mp4",
      poster: "/images/gatherings/sunday-service.jpg",
      alt: "Praise and Worship Moment",
    },
    {
      type: "image",
      src: "/images/ministries/youth-ministry.jpg",
      alt: "Youth Ministry Gathering",
    },
    {
      type: "video",
      src: "/videos/worship-video-2.mp4",
      poster: "/images/ministries/worship-choir.jpg",
      alt: "Community Worship Moment",
    },
    {
      type: "image",
      src: "/images/ministries/womens-ministry.jpg",
      alt: "Women's Fellowship",
    },
    {
      type: "video",
      src: "/videos/worship-video-3.mp4",
      poster: "/images/ministries/mens-fellowship.jpg",
      alt: "Church Fellowship Video",
    },
    {
      type: "image",
      src: "/images/ministries/community-outreach.jpg",
      alt: "Community Outreach Project",
    },
    {
      type: "video",
      src: "/videos/worship-video-4.mp4",
      poster: "/images/who-we-are-banner.jpg",
      alt: "Sunday Service Joy",
    },
  ];

  // Duplicate list for seamless infinite marquee loop
  const marqueeList = [...baseItems, ...baseItems];

  return (
    <section className="py-20 sm:py-28 bg-[#f2ebd1] border-t border-black/5 overflow-hidden">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
          {t("badge")}
        </div>
        <h2 className="text-h1 text-[#121212]">{t("title")}</h2>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Subtle Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f2ebd1] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f2ebd1] to-transparent z-10 pointer-events-none" />

        {/* Sliding Marquee Track with GPU hardware acceleration */}
        <div className="animate-marquee flex items-center gap-6 px-3 transform-gpu will-change-transform">
          {marqueeList.map((item, idx) => (
            <div
              key={idx}
              className="shrink-0 w-72 sm:w-96 lg:w-[420px] h-64 sm:h-80 lg:h-96 rounded-[5px] bg-white border border-black/10 shadow-sm overflow-hidden relative group hover:shadow-md transition-all duration-300 transform-gpu"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 420px"
                  quality={75}
                  loading="lazy"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
