import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import Image from "next/image";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "../../components/ScrollReveal";

export default async function GetInvolvedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-[#f2ebd1]">
        <GetInvolvedContent locale={locale} />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function GetInvolvedContent({ locale }: { locale: string }) {
  const t = useTranslations("GetInvolved");

  const ministries = [
    { title: t("counseling"), desc: t("counselingDesc"), tag: "Counseling", img: "/images/ministries/guidance-counseling.jpg" },
    { title: t("visitation"), desc: t("visitationDesc"), tag: "Care", img: "https://framerusercontent.com/images/WpgTwT0ndOZLrmpVLOGMNE9Y.jpeg" },
    { title: t("childDedication"), desc: t("childDedicationDesc"), tag: "Family", img: "/images/ministries/child-dedication.jpg" },
    { title: t("families"), desc: t("familiesDesc"), tag: "Marriage", img: "/images/ministries/families-ministry.jpg" },
    { title: t("testimonies"), desc: t("testimoniesDesc"), tag: "Thanksgiving", img: "/images/testimonies.webp" },
    { title: t("loveFeast"), desc: t("loveFeastDesc"), tag: "Fellowship", img: "/images/ministries/love-feast.jpg" },
  ];

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="py-20 sm:py-28 bg-[#f2ebd1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
              Get Involved
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
                  className="btn-gradient-link text-xs sm:text-sm"
                >
                  <span>{t("cta")}</span>
                  <span className="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Family Banner Quote Card */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 text-center border border-white/10 shadow-md relative overflow-hidden">
              <span className="text-accent text-3xl font-serif block mb-2">”</span>
              <blockquote className="font-heading font-bold text-white text-xl sm:text-3xl leading-tight max-w-3xl mx-auto mb-3">
                "{t("quoteBanner")}"
              </blockquote>
              <p className="text-accent-light text-xs font-heading font-semibold uppercase tracking-widest">
                The Narrow Gate Foursquare Family Vision
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cultural Sunday Highlight Section */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-lg bg-[#f2ebd1] p-8 sm:p-10 border border-black/10 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                  Special Annual Gathering
                </span>
                <h2 className="text-h1 text-[#121212] mb-2">Cultural Sunday</h2>
                <p className="text-accent font-heading font-bold text-lg mb-4">
                  {t("culturalTheme")}
                </p>
                <p className="text-body text-[#525252] leading-relaxed">
                  {t("culturalDesc")}
                </p>
              </div>

              <div>
                <a
                  href={`/${locale}/contact`}
                  className="btn-gradient-link text-xs"
                >
                  <span>Join Event</span>
                  <span className="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ministries Grid Section with Staggered Scroll Entrance */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
              Ministries & Activities
            </div>
            <h2 className="text-h1 text-[#121212] mb-3">{t("ministriesTitle")}</h2>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m, i) => (
            <ScrollStaggerItem key={i}>
              <div
                className="rounded-lg bg-white border border-black/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5 h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent text-white shadow-sm z-10">
                    {m.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-h3 text-[#121212] mb-2">{m.title}</h3>
                    <p className="text-caption text-[#525252] text-xs leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5">
                    <a
                      href={`/${locale}/contact`}
                      className="btn-gradient-link text-xs"
                    >
                      <span>Get Involved</span>
                      <span className="arrow-icon">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </section>
    </div>
  );
}
