import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import Image from "next/image";
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from "../../components/ScrollReveal";

export default async function SupportMissionPage({
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
        <SupportMissionContent locale={locale} />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function SupportMissionContent({ locale }: { locale: string }) {
  const t = useTranslations("SupportMission");

  const projects = [
    {
      title: t("educationFund"),
      desc: t("educationFundDesc"),
      badge: "Fully Funded by Church",
      img: "https://framerusercontent.com/images/bjdWEdmLsmlHJ6nkyV6S4kBw4.jpeg",
    },
    {
      title: t("foodBank"),
      desc: t("foodBankDesc"),
      badge: "Banco Alimentare",
      img: "https://framerusercontent.com/images/e84uUhqW7kjrsUbllcDRJQjlOY.jpeg",
    },
    {
      title: t("shelter"),
      desc: t("shelterDesc"),
      badge: "Shelter & Widows",
      img: "https://framerusercontent.com/images/0RdQhzQ3ySrU6ryPntVtPzhEP20.jpeg",
    },
  ];

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="py-20 sm:py-28 bg-[#f2ebd1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
              Support Our Mission
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
                  <span>Donate Now</span>
                  <span className="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Mission Motto Card */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 text-center border border-white/10 shadow-md relative overflow-hidden">
              <p className="font-heading font-bold text-white text-2xl sm:text-4xl leading-tight max-w-3xl mx-auto mb-3">
                {t("missionBanner")}
              </p>
              <p className="text-accent-light text-xs font-heading font-semibold uppercase tracking-widest">
                The Narrow Gate Foursquare Church Mission Statement
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 sm:py-28 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
                Community Outreach Projects
              </div>
              <h2 className="text-h1 text-[#121212]">{t("waysToGive")}</h2>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {projects.map((p, idx) => (
              <ScrollStaggerItem key={idx}>
                <div
                  className="rounded-lg bg-[#f2ebd1] border border-black/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5 h-full"
                >
                  <div className="h-52 relative overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f2ebd1] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent text-white shadow-sm z-10">
                      {p.badge}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-h3 text-[#121212] mb-3">{p.title}</h3>
                      <p className="text-caption text-[#525252] text-sm leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/5">
                      <a
                        href={`/${locale}/contact`}
                        className="btn-gradient-link text-xs"
                      >
                        <span>Support Project</span>
                        <span className="arrow-icon">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>

          {/* Bank & Giving Card */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 max-w-3xl mx-auto text-center border border-white/10 shadow-md">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-white bg-eyebrow-gradient px-3.5 py-1 rounded-md inline-block mb-4 shadow-sm">
                Financial Integrity & Transparency
              </span>
              <h3 className="text-h2 text-white mb-4">{t("bankDetails")}</h3>
              <p className="text-white/80 font-body text-base max-w-xl mx-auto leading-relaxed">
                {t("bankContact")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
