import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";

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
      <main className="flex-1 bg-[#F8F8F8]">
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
      <section className="py-20 sm:py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-6">
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
                className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all hover:scale-105"
              >
                Donate Now →
              </a>
            </div>
          </div>

          {/* Mission Motto Card (8px radius) */}
          <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 text-center border border-white/10 shadow-md relative overflow-hidden">
            <p className="font-heading font-bold text-white text-2xl sm:text-4xl leading-tight max-w-3xl mx-auto mb-3">
              {t("missionBanner")}
            </p>
            <p className="text-accent-light text-xs font-heading font-semibold uppercase tracking-widest">
              The Narrow Gate Foursquare Church Mission Statement
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section (8px radius) */}
      <section className="py-20 sm:py-28 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-4">
              Community Outreach Projects
            </div>
            <h2 className="text-h1 text-[#121212]">{t("waysToGive")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {projects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#F8F8F8] border border-black/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5"
              >
                <div className="h-52 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${p.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F8F8F8] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent text-white shadow-sm">
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
                      className="text-xs font-heading font-bold uppercase tracking-wider text-[#121212] group-hover:text-accent flex items-center gap-1.5 transition-colors"
                    >
                      Support Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bank & Giving Card (8px radius) */}
          <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 max-w-3xl mx-auto text-center border border-white/10 shadow-md">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent bg-accent/20 px-3.5 py-1 rounded-md inline-block mb-4">
              Financial Integrity & Transparency
            </span>
            <h3 className="text-h2 text-white mb-4">{t("bankDetails")}</h3>
            <p className="text-white/80 font-body text-base max-w-xl mx-auto leading-relaxed">
              {t("bankContact")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
