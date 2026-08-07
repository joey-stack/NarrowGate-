"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/80 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Standalone Logo Image (No extra text, no white background box) */}
          <div className="space-y-4">
            <a href={`/${locale}`} className="inline-block">
              <img
                src="/logo_white.png?v=5"
                alt="The Narrow Gate Foursquare Church Italy"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-white/70 leading-relaxed">
              Formed by Jesus, together, for others in Motta di Livenza, Italy. Reaching the reached and the unreached.
            </p>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Service Times
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-body">
              <li><strong className="text-white font-semibold">Wed:</strong> Bible Study (6:30 PM – 8:30 PM)</li>
              <li><strong className="text-white font-semibold">Sat:</strong> Intercessory Prayer (4:30 PM)</li>
              <li><strong className="text-white font-semibold">Sun:</strong> Breakfast Prayer (9:00 AM)</li>
              <li><strong className="text-white font-semibold">Sun:</strong> Sunday School (9:20 AM)</li>
              <li><strong className="text-white font-semibold">Sun:</strong> Main Service (10:00 AM)</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Location
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              {t("location")}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-block mt-3 text-xs font-heading font-semibold text-accent hover:text-accent-light transition-colors"
            >
              Get Directions →
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4 text-accent">
              Contact Us
            </h4>
            <p className="text-xs text-white/80">{t("phone")}</p>
            <p className="text-xs text-white/80 mt-1 break-all">{t("email")}</p>
            <div className="mt-4">
              <a
                href={`/${locale}/contact`}
                className="px-4 py-2 rounded-full bg-accent/20 hover:bg-accent text-accent-light hover:text-primary font-heading font-semibold text-xs transition-colors inline-block"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {currentYear} The Narrow Gate Foursquare Church. {t("rights")}</p>
          <p className="text-white/40">Motta di Livenza (TV), Italy</p>
        </div>
      </div>
    </footer>
  );
}
