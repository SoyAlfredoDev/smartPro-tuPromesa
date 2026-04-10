import HeroSection from "@/sections/HeroSection";
import ReportedCasesSection from "@/sections/ReportedCasesSection";
import CtaSection from "@/sections/CtaSection";
import Footer from "@/sections/Footer";
import FloatingActionBar from "@/components/common/FloatingActionBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReportedCasesSection />
      <CtaSection />
      <Footer />
      <FloatingActionBar />
    </>
  );
}
