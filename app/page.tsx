import HeroSection from "@/sections/HeroSection";
import ReportedCasesSection from "@/sections/ReportedCasesSection";
import CtaSection from "@/sections/CtaSection";
import Footer from "@/sections/Footer";
import FloatingActionBar from "@/components/common/FloatingActionBar";
import Navbar from "@/sections/NavBar";
import LegalSupportSection from "@/sections/LegalSupportSection";
import NewsSection from "@/sections/NewsSection";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TuPromesa.cl",
    url: "https://tupromesa.cl",
    logo: "https://tupromesa.cl/og-image.jpg",
    description:
      "Plataforma para visibilizar y denunciar incumplimientos inmobiliarios en Chile.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
