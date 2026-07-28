import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";

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
      <main className="flex-1 bg-[#F8F8F8]">
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
    { title: t("counseling"), desc: t("counselingDesc"), tag: "Counseling", img: "https://framerusercontent.com/images/ulEa9UsvjLqBNL1roP8TxwmIuY.webp" },
    { title: t("visitation"), desc: t("visitationDesc"), tag: "Care", img: "https://framerusercontent.com/images/WpgTwT0ndOZLrmpVLOGMNE9Y.jpeg" },
    { title: t("childDedication"), desc: t("childDedicationDesc"), tag: "Family", img: "https://framerusercontent.com/images/zg48dmZYiffPanx8Qwvuq2YkP5M.jpeg" },
    { title: t("families"), desc: t("familiesDesc"), tag: "Marriage", img: "https://framerusercontent.com/images/Ho0BwXw6CF0WIxJh9LqZbxah0T0.jpeg" },
    { title: t("testimonies"), desc: t("testimoniesDesc"), tag: "Thanksgiving", img: "https://framerusercontent.com/images/LHytLqj1LAp19pIe5hVKEmCFw.jpeg" },
    { title: t("loveFeast"), desc: t("loveFeastDesc"), tag: "Fellowship", img: "https://framerusercontent.com/images/nXyNJr99Q0ww3MxaXh54neG1lQ.jpeg" },
  ];

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="py-20 sm:py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-6">
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
                className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all hover:scale-105"
              >
                {t("cta")} →
              </a>
            </div>
          </div>

          {/* Family Banner Quote Card (8px radius) */}
          <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-12 text-center border border-white/10 shadow-md relative overflow-hidden">
            <span className="text-accent text-3xl font-serif block mb-2">”</span>
            <blockquote className="font-heading font-bold text-white text-xl sm:text-3xl leading-tight max-w-3xl mx-auto mb-3">
              "{t("quoteBanner")}"
            </blockquote>
            <p className="text-accent-light text-xs font-heading font-semibold uppercase tracking-widest">
              The Narrow Gate Foursquare Family Vision
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Sunday Highlight Section (8px radius) */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-[#F8F8F8] p-8 sm:p-10 border border-black/10 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-accent text-white text-xs font-heading font-bold uppercase tracking-wider mb-4">
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
                className="px-6 py-3 rounded-lg bg-[#121212] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-accent transition-colors inline-block whitespace-nowrap"
              >
                Join Event →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Grid Section (8px radius) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-heading font-bold uppercase tracking-wider mb-4">
            Ministries & Activities
          </div>
          <h2 className="text-h1 text-[#121212] mb-3">{t("ministriesTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m, i) => (
            <div
              key={i}
              className="rounded-lg bg-white border border-black/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5"
            >
              <div className="h-48 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${m.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent text-white shadow-sm">
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
                    className="text-xs font-heading font-bold uppercase tracking-wider text-[#121212] group-hover:text-accent flex items-center gap-1.5 transition-colors"
                  >
                    Get Involved →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
