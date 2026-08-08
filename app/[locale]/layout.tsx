import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";

  const title = isIt
    ? "The Narrow Gate Foursquare Church | Motta di Livenza, Italia"
    : "The Narrow Gate Foursquare Church | Motta di Livenza, Italy";

  const description = isIt
    ? "Benvenuti alla Chiesa Foursquare The Narrow Gate a Motta di Livenza (TV). Una comunità cristiana internazionale e bilingue guidata dal Rev. Uyi Evbuomwan."
    : "Welcome to The Narrow Gate Foursquare Church in Motta di Livenza, Italy. A welcoming bilingual international Christian family led by Rev. Uyi Evbuomwan.";

  return {
    title,
    description,
    keywords: [
      "Foursquare Church Motta di Livenza",
      "Chiesa Cristiana Motta di Livenza",
      "Church in Treviso Italy",
      "International Church Italy",
      "English service Motta di Livenza",
      "Reverend Uyi Loveday Evbuomwan",
      "The Narrow Gate Foursquare",
    ],
    metadataBase: new URL("https://narrowgate-red.vercel.app"),
    alternates: {
      canonical: `https://narrowgate-red.vercel.app/${locale}`,
      languages: {
        en: "https://narrowgate-red.vercel.app/en",
        it: "https://narrowgate-red.vercel.app/it",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://narrowgate-red.vercel.app/${locale}`,
      siteName: "The Narrow Gate Foursquare Church",
      images: [
        {
          url: "https://framerusercontent.com/images/BJfx98tg96KSw6rzvYL6jgfVU.jpeg",
          width: 1200,
          height: 630,
          alt: "The Narrow Gate Foursquare Church Motta di Livenza",
        },
      ],
      locale: isIt ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://framerusercontent.com/images/BJfx98tg96KSw6rzvYL6jgfVU.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

import { PlanVisitProvider } from "../components/PlanVisitContext";
import { PlanVisitModal } from "../components/PlanVisitModal";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  // JSON-LD Schema Markup for Church & PlaceOfWorship
  const churchSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "The Narrow Gate Foursquare Church",
    "alternateName": "Foursquare Gospel Church Italy Motta di Livenza",
    "url": `https://narrowgate-red.vercel.app/${locale}`,
    "logo": "https://narrowgate-red.vercel.app/logo.png",
    "image": "https://framerusercontent.com/images/BJfx98tg96KSw6rzvYL6jgfVU.jpeg",
    "description": "Bilingual (English & Italian) Foursquare Gospel Church located in Motta di Livenza, Treviso, Italy.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Cadamure, N1/19",
      "addressLocality": "Motta di Livenza",
      "postalCode": "31045",
      "addressRegion": "Treviso",
      "addressCountry": "IT"
    },
    "telephone": "+393883629233",
    "email": "fgcititaly@aol.com",
    "pastor": {
      "@type": "Person",
      "name": "Reverend Uyi Loveday Evbuomwan"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "12:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Wednesday",
        "opens": "18:30",
        "closes": "20:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "16:30",
        "closes": "18:00"
      }
    ]
  };

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://framerusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary font-body antialiased" suppressHydrationWarning>
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B91C1C] focus:text-white focus:rounded-lg focus:font-heading focus:font-bold focus:text-xs focus:uppercase focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <PlanVisitProvider>
            {children}
            <PlanVisitModal />
          </PlanVisitProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
