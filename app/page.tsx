import HeroSection from "@/sections/HeroSection";
import ReportedCasesSection from "@/sections/ReportedCasesSection";
import CtaSection from "@/sections/CtaSection";
import Footer from "@/sections/Footer";
import FloatingActionBar from "@/components/common/FloatingActionBar";
import Navbar from "@/sections/NavBar";
import LegalSupportSection from "@/sections/LegalSupportSection";
import NewsSection from "@/sections/NewsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ReportedCasesSection />
      <LegalSupportSection />
      <NewsSection />
      <CtaSection />
      <Footer />
      <FloatingActionBar />
    </>
  );
}
