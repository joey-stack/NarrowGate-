"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { usePlanVisit } from "./PlanVisitContext";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openPlanVisitModal } = usePlanVisit();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "getInvolved", href: `/${locale}/get-involved` },
    { key: "supportMission", href: `/${locale}/support-mission` },
    { key: "praiseWorship", href: `/${locale}/praise-worship` },
    { key: "contact", href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121212] border-b border-white/10 shadow-sm transition-colors">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
          {/* Standalone Logo Image (No extra text, no white background box) */}
          <a href={`/${locale}`} className="flex items-center group py-2">
            <img
              src="/logo_white.png?v=6"
              alt="The Narrow Gate Foursquare Church Italy"
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-lg p-1.5 border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.key === 'home' && pathname === `/${locale}`);
              return (
                <a
                  key={link.key}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-heading font-semibold rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#121212] font-bold shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area (Language Switcher + White CTA) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Toggle */}
            <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/10" role="group" aria-label="Language selector">
              <button
                onClick={() => switchLocale("en")}
                aria-label="Switch language to English"
                className={`px-3 py-1 text-xs font-heading font-bold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white ${
                  locale === "en"
                    ? "bg-white text-[#121212] shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale("it")}
                aria-label="Passa alla lingua italiana"
                className={`px-3 py-1 text-xs font-heading font-bold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white ${
                  locale === "it"
                    ? "bg-white text-[#121212] shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                IT
              </button>
            </div>

            {/* Header Right Action Button (White -> White/90 Hover + Scale) */}
            <button
              onClick={() => openPlanVisitModal("sundayService")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-[#121212] font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/90 hover:scale-105 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            >
              Plan Your Visit
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#121212]/98 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-heading font-semibold text-white/90 rounded-lg hover:text-white hover:bg-white/10 transition-all"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
