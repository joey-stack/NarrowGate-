import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import { EventsClientView } from "../../components/EventsClientView";
import { DEFAULT_EVENTS } from "../../../lib/events-store";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  return {
    title: `${t("heroTitle")} | The Narrow Gate Foursquare Church`,
    description: t("heroSubtitle"),
    alternates: {
      canonical: `https://narrowgate-red.vercel.app/${locale}/events`,
      languages: {
        en: "https://narrowgate-red.vercel.app/en/events",
        it: "https://narrowgate-red.vercel.app/it/events",
      },
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <EventsClientView initialEvents={DEFAULT_EVENTS} />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}
