import { setRequestLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AboutHeroSection } from "../../components/AboutHeroSection";
import { AboutMissionSection } from "../../components/AboutMissionSection";
import { AboutBeliefsDarkSection } from "../../components/AboutBeliefsDarkSection";
import { AboutLeadershipSection } from "../../components/AboutLeadershipSection";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";

export default async function AboutPage({
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
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutBeliefsDarkSection />
        <AboutLeadershipSection />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}
