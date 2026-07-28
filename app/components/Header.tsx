"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 shadow-sm transition-all">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Branding (Foursquare Royal Purple badge) */}
          <a href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#6B21A8] group-hover:bg-[#EAB308] group-hover:text-[#121212] flex items-center justify-center font-heading font-bold text-white text-xl shadow-sm transition-all duration-300">
              NG
            </div>
            <div>
              <span className="block text-white font-heading font-bold text-base sm:text-lg leading-tight tracking-tight">
                {t("churchName")}
              </span>
              <span className="block text-white/60 text-xs font-body font-medium tracking-wide">
                {t("churchSubtitle")}
              </span>
            </div>
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
                      ? "bg-[#6B21A8] text-white shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area (Language Switcher + Foursquare Royal Purple CTA) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Toggle */}
            <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => switchLocale("en")}
                className={`px-3 py-1 text-xs font-heading font-bold rounded-md transition-all duration-200 ${
                  locale === "en"
                    ? "bg-[#6B21A8] text-white shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale("it")}
                className={`px-3 py-1 text-xs font-heading font-bold rounded-md transition-all duration-200 ${
                  locale === "it"
                    ? "bg-[#6B21A8] text-white shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                IT
              </button>
            </div>

            {/* Header Right Action Button (Royal Purple -> Gold Hover) */}
            <a
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#6B21A8] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#EAB308] hover:text-[#121212] transition-all shadow-sm"
            >
              Plan Your Visit
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
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
