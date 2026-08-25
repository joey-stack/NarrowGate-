import { notFound } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { PlanVisitCardSection } from "../../../components/PlanVisitCardSection";

export function generateStaticParams() {
  const locales = ["en", "it"];
  const slugs = ["education-fund", "banco-alimentare", "shelter-widows"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

const PROJECT_CONFIGS: Record<
  string,
  {
    translationKey: "educationFund" | "bancoAlimentare" | "shelterWidows";
    img: string;
  }
> = {
  "education-fund": {
    translationKey: "educationFund",
    img: "/images/education-fund.webp",
  },
  "banco-alimentare": {
    translationKey: "bancoAlimentare",
    img: "/images/banco-alimentare.webp",
  },
  "shelter-widows": {
    translationKey: "shelterWidows",
    img: "/images/shelter-widows.webp",
  },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const config = PROJECT_CONFIGS[slug];

  if (!config) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-[#f2ebd1]">
        <ProjectDetailContent locale={locale} slug={slug} config={config} />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailContent({
  locale,
  slug,
  config,
}: {
  locale: string;
  slug: string;
  config: (typeof PROJECT_CONFIGS)[string];
}) {
  const t = useTranslations("ProjectDetails");
  const projectKey = config.translationKey;

  const otherProjects = Object.entries(PROJECT_CONFIGS)
    .filter(([s]) => s !== slug)
    .map(([s, cfg]) => ({
      slug: s,
      title: t(`${cfg.translationKey}.title`),
      badge: t(`${cfg.translationKey}.badge`),
      img: cfg.img,
    }));

  return (
    <div>
      {/* Hero Header Section */}
      <section className="py-16 sm:py-24 bg-[#f2ebd1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Back Navigation Link */}
            <a
              href={`/${locale}/support-mission`}
              className="btn-gradient-link text-xs sm:text-sm inline-flex items-center gap-2 mb-8"
            >
              <span>{t("backLink")}</span>
            </a>

            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm block w-fit">
              {t(`${projectKey}.badge`)}
            </div>

            <h1 className="text-display text-[#121212] mb-4 leading-tight max-w-4xl">
              {t(`${projectKey}.title`)}
            </h1>

            <p className="text-subheading text-[#525252] leading-relaxed max-w-3xl mb-12">
              {t(`${projectKey}.subtitle`)}
            </p>

            {/* Main High-Res Hero Image Card */}
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-lg overflow-hidden border border-black/10 shadow-md">
              <Image
                src={config.img}
                alt={t(`${projectKey}.title`)}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                quality={85}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Stats Highlight Bar (Shown for other projects) */}
      {slug !== "education-fund" && (
        <section className="py-12 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-lg bg-[#f2ebd1] border border-black/5">
                  <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-[#B91C1C] mb-1">
                    {t(`${projectKey}.stat1Num`)}
                  </span>
                  <span className="block text-xs uppercase tracking-wider font-heading font-bold text-[#121212]">
                    {t(`${projectKey}.stat1Label`)}
                  </span>
                </div>

                <div className="p-6 rounded-lg bg-[#f2ebd1] border border-black/5">
                  <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-[#B91C1C] mb-1">
                    {t(`${projectKey}.stat2Num`)}
                  </span>
                  <span className="block text-xs uppercase tracking-wider font-heading font-bold text-[#121212]">
                    {t(`${projectKey}.stat2Label`)}
                  </span>
                </div>

                <div className="p-6 rounded-lg bg-[#f2ebd1] border border-black/5">
                  <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-[#B91C1C] mb-1">
                    {t(`${projectKey}.stat3Num`)}
                  </span>
                  <span className="block text-xs uppercase tracking-wider font-heading font-bold text-[#121212]">
                    {t(`${projectKey}.stat3Label`)}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Detailed Overview & Action Card Section */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Deep Overview */}
          <ScrollReveal className="lg:col-span-8 space-y-10">
            <div className={`rounded-lg p-8 sm:p-12 border border-black/10 shadow-sm space-y-8 ${slug === "education-fund" ? "bg-[#f2ebd1]" : "bg-white"}`}>
              <h2 className="text-h2 text-[#121212]">
                {t(`${projectKey}.overviewTitle`)}
              </h2>
              <p className="text-body text-[#525252] leading-relaxed text-base sm:text-lg">
                {t(`${projectKey}.overviewP1`)}
              </p>

              {/* Official Emblem Graphic for Education Fund placed between P1 and P2 */}
              {slug === "education-fund" && (
                <div className="my-8 w-full">
                  <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[540px] rounded-lg overflow-hidden">
                    <Image
                      src="/images/student-trust-fund-emblem.webp"
                      alt="Student's Trust Fund Official Emblem"
                      fill
                      sizes="(max-width: 1024px) 100vw, 850px"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              )}

              <p className="text-body text-[#525252] leading-relaxed text-base sm:text-lg">
                {t(`${projectKey}.overviewP2`)}
              </p>
            </div>

            {slug !== "education-fund" && (
              <div className="rounded-lg bg-white p-8 sm:p-12 border border-black/10 shadow-sm space-y-6">
                <h3 className="text-h3 text-[#121212]">
                  {t(`${projectKey}.keyObjectivesTitle`)}
                </h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-eyebrow-gradient text-white flex items-center justify-center font-bold text-xs mt-0.5 shadow-sm">
                        ✓
                      </span>
                      <span className="text-body text-[#121212] font-medium leading-relaxed">
                        {t(`${projectKey}.obj${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollReveal>

          {/* Right Column: Giving & Support Action Box + Other Initiatives Stack */}
          <ScrollReveal className="lg:col-span-4 space-y-8 sticky top-28">
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-10 border border-white/10 shadow-md space-y-6">
              <span className="inline-block px-3 py-1 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm">
                {t("howToHelp")}
              </span>
              <h3 className="text-h3 text-white">Support This Initiative</h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {t("givingInfo")}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <a
                  href={`/${locale}/contact`}
                  className="w-full text-center py-3.5 px-6 rounded-lg bg-white text-[#121212] font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/90 hover:scale-105 transition-all inline-block shadow-sm"
                >
                  {t("contactBtn")} →
                </a>

                <div className="text-center pt-2">
                  <span className="block text-[11px] text-white/60 font-body">
                    Official Church Office (Motta di Livenza)
                  </span>
                  <span className="block text-xs font-heading font-bold text-white mt-1">
                    +39 - 3883629233
                  </span>
                </div>
              </div>
            </div>

            {/* Other Outreach Initiatives Stacked Directly Under How You Can Help Card */}
            <div className="space-y-4 pt-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#121212] px-1">
                {t("otherProjects")}
              </h4>
              <div className="space-y-4">
                {otherProjects.map((proj) => (
                  <a
                    key={proj.slug}
                    href={`/${locale}/support-mission/${proj.slug}`}
                    className="rounded-lg bg-white border border-black/10 overflow-hidden group hover:shadow-md transition-all duration-200 flex flex-col block"
                  >
                    <div className="h-36 relative overflow-hidden">
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        quality={75}
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent text-white shadow-sm z-10">
                        {proj.badge}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <h5 className="font-heading font-bold text-xs sm:text-sm text-[#121212] group-hover:text-[#B91C1C] transition-colors">
                        {proj.title}
                      </h5>
                      <span className="btn-gradient-link text-xs shrink-0 ml-2">
                        <span>View</span>
                        <span className="arrow-icon">→</span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
