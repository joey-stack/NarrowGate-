"use client";

import { useTranslations } from "next-intl";

export function MomentsGallerySection() {
  const t = useTranslations("Gallery");

  const images = [
    "https://framerusercontent.com/images/LHytLqj1LAp19pIe5hVKEmCFw.jpeg",
    "https://framerusercontent.com/images/nXyNJr99Q0ww3MxaXh54neG1lQ.jpeg",
    "https://framerusercontent.com/images/pyobvRb21KQL85H2LxbZQ5k1g.jpg",
    "https://framerusercontent.com/images/Ho0BwXw6CF0WIxJh9LqZbxah0T0.jpeg",
    "https://framerusercontent.com/images/4OVDWjW414cpwjACN4OVKzbVvk.webp",
    "https://framerusercontent.com/images/lPxQuEvoD0okg4XQKqeJOs9sR1Q.jpeg",
    "https://framerusercontent.com/images/BJfx98tg96KSw6rzvYL6jgfVU.jpeg",
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
              className="shrink-0 w-72 sm:w-96 lg:w-[420px] h-64 sm:h-80 lg:h-96 rounded-lg bg-white border border-black/10 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${imgUrl}')` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
