"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function AboutLeadershipSection() {
  const t = useTranslations("AboutLeadership");

  const leaders = [
    { name: t("l1Name"), role: t("l1Role"), img: "https://framerusercontent.com/images/4OVDWjW414cpwjACN4OVKzbVvk.webp" },
    { name: t("l2Name"), role: t("l2Role"), img: "https://framerusercontent.com/images/ulEa9UsvjLqBNL1roP8TxwmIuY.webp" },
    { name: t("l3Name"), role: t("l3Role"), img: "https://framerusercontent.com/images/A0QfvVVx0gpAXCNdOlMOZN4DzI.webp" },
    { name: t("l4Name"), role: t("l4Role"), img: "https://framerusercontent.com/images/WbvZjnw8wDj8LpIrwpXUZ0Hz15k.webp" },
    { name: t("l5Name"), role: t("l5Role"), img: "https://framerusercontent.com/images/mQphCG2WGkW0cKhZyDtMvw76GJY.webp" },
    { name: t("l6Name"), role: t("l6Role"), img: "https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-4">
            {t("badge")}
          </div>
          <h2 className="text-h1 text-[#121212] mb-3">{t("title")}</h2>
          <p className="text-subheading text-[#525252] max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* 6-Card Leadership Grid Layout (100% Full-Bleed Portrait Cards - Name & Role Only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-[#1E1E1E] border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5 relative h-[400px] sm:h-[440px]"
            >
              {/* 100% Full-Height Image */}
              <Image
                src={leader.img}
                alt={leader.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
                loading="lazy"
                className="object-cover object-top transition-transform duration-500"
              />
              {/* Subtle Dark Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              {/* Name & Position Only */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="font-heading font-bold text-white text-xl sm:text-2xl drop-shadow-md mb-1">
                  {leader.name}
                </h3>
                <p className="text-accent-light text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider">
                  {leader.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
