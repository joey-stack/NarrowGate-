import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PlanVisitCardSection } from "../../../components/PlanVisitCardSection";
import { EventDetailClientView } from "../../../components/EventDetailClientView";
import { getChurchEventById, DEFAULT_EVENTS } from "../../../../lib/events-store";

export function generateStaticParams() {
  const locales = ["en", "it"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const event of DEFAULT_EVENTS) {
      params.push({ locale, slug: event.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getChurchEventById(slug);

  if (!event) {
    return {
      title: "Event Not Found | The Narrow Gate Foursquare Church",
    };
  }

  const title = `${event.title} | The Narrow Gate Foursquare Church`;
  const description =
    event.overview?.slice(0, 160) ||
    `Join us for ${event.title} in Motta di Livenza, Italy. Theme: ${event.theme}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://narrowgate-red.vercel.app/${locale}/events/${slug}`,
      languages: {
        en: `https://narrowgate-red.vercel.app/en/events/${slug}`,
        it: `https://narrowgate-red.vercel.app/it/events/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://narrowgate-red.vercel.app/${locale}/events/${slug}`,
      images: [
        {
          url: event.flyerUrl || "https://narrowgate-red.vercel.app/images/events/back-to-bethel-20th-anniversary.jpg",
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = await getChurchEventById(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <EventDetailClientView event={event} />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}
