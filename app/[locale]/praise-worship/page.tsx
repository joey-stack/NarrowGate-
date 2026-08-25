import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WatchSermonsSection } from "../../components/WatchSermonsSection";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import Image from "next/image";
import { ScrollReveal } from "../../components/ScrollReveal";

export default async function PraiseWorshipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-[#F8F8F8]">
        <PraiseWorshipContent locale={locale} />
        <WatchSermonsSection />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function PraiseWorshipContent({ locale }: { locale: string }) {
  const t = useTranslations("PraiseWorship");

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="py-20 sm:py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
              Music & Worship Ministry
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              <div className="lg:col-span-7">
                <h1 className="text-display text-[#121212] mb-4 leading-tight">
                  {t("title")}
                </h1>
                <p className="text-subheading text-[#525252] leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
                <a
                  href={`/${locale}/contact`}
                  className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all hover:scale-105"
                >
                  Join Worship Team →
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Large Hero Banner Image Card */}
          <ScrollReveal delay={0.2}>
            <div className="relative rounded-lg overflow-hidden border border-black/10 shadow-sm min-h-[380px] flex flex-col justify-end group">
              <Image
                src="/images/ministries/worship-choir.jpg"
                alt="Praise & Worship Ministry sanctuary choir"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                quality={75}
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent z-10 pointer-events-none" />
              
              <div className="relative z-20 p-8 sm:p-12 max-w-2xl text-white">
                <span className="inline-block px-3 py-1 rounded-lg bg-accent text-white font-heading font-bold text-xs uppercase tracking-wider mb-3">
                  Spirit-Led Praise
                </span>
                <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2 leading-snug">
                  Exalting God In Spirit & In Truth
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Anointed music leading our international congregation into God's holy presence.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Worship Philosophy Section */}
      <section className="py-20 bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal>
            <div className="rounded-lg bg-[#F8F8F8] p-8 sm:p-12 border border-black/10 shadow-sm">
              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                Worship Vision
              </span>
              <h2 className="text-h1 text-[#121212] mb-6">{t("philosophyTitle")}</h2>
              <p className="text-body text-[#525252] leading-relaxed text-base sm:text-lg">
                {t("philosophyText")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 text-center border border-white/10 shadow-md">
              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                Serve With Your Talents
              </span>
              <h3 className="text-h2 text-white mb-4">{t("choirCallout")}</h3>
              <p className="text-subheading text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
                {t("choirCalloutDesc")}
              </p>
              <a
                href={`/${locale}/contact`}
                className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all inline-block"
              >
                Audition & Join Team →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
