import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { WhoWeAreSection } from "../components/WhoWeAreSection";
import { WeeklyGatheringsDarkSection } from "../components/WeeklyGatheringsDarkSection";
import { MinistriesGridSection } from "../components/MinistriesGridSection";

// Dynamically import below-the-fold heavy components to reduce initial JS payload
const WatchSermonsSection = dynamic(
  () => import("../components/WatchSermonsSection").then((m) => m.WatchSermonsSection),
  { ssr: true }
);

const FeaturedEventSection = dynamic(
  () => import("../components/FeaturedEventSection").then((m) => m.FeaturedEventSection),
  { ssr: true }
);

const SupportMissionFullBleedSection = dynamic(
  () => import("../components/SupportMissionFullBleedSection").then((m) => m.SupportMissionFullBleedSection),
  { ssr: true }
);

const MomentsGallerySection = dynamic(
  () => import("../components/MomentsGallerySection").then((m) => m.MomentsGallerySection),
  { ssr: true }
);

const PlanVisitCardSection = dynamic(
  () => import("../components/PlanVisitCardSection").then((m) => m.PlanVisitCardSection),
  { ssr: true }
);

export default async function HomePage({
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
        <HeroSection />
        <WhoWeAreSection />
        <WatchSermonsSection />
        <WeeklyGatheringsDarkSection />
        <FeaturedEventSection />
        <MinistriesGridSection />
        <SupportMissionFullBleedSection />
        <MomentsGallerySection />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}
