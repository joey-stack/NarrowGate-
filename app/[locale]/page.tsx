import { setRequestLocale } from "next-intl/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { WhoWeAreSection } from "../components/WhoWeAreSection";
import { WatchSermonsSection } from "../components/WatchSermonsSection";
import { WeeklyGatheringsDarkSection } from "../components/WeeklyGatheringsDarkSection";
import { MinistriesGridSection } from "../components/MinistriesGridSection";
import { SupportMissionFullBleedSection } from "../components/SupportMissionFullBleedSection";
import { MomentsGallerySection } from "../components/MomentsGallerySection";
import { PlanVisitCardSection } from "../components/PlanVisitCardSection";

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
        <MinistriesGridSection />
        <SupportMissionFullBleedSection />
        <MomentsGallerySection />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}
