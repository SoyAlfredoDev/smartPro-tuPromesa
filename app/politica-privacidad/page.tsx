import type { Metadata } from "next";

import PrivacyPolicyView from "@/components/privacy-policy/privacy-policy-view";
import { privacyPolicyMeta } from "@/constants/privacy-policy";
import Footer from "@/sections/Footer";
import Navbar from "@/sections/NavBar";
import { siteConfig } from "@/site";

export const metadata: Metadata = {
  title: privacyPolicyMeta.title,
  description: `Conoce cómo ${siteConfig.name} trata tus datos personales conforme a la Ley chilena N° 21.719 sobre protección de datos personales.`,
  alternates: {
    canonical: `${siteConfig.url}${privacyPolicyMeta.path}`,
  },
  openGraph: {
    title: privacyPolicyMeta.title,
    description: `Conoce cómo ${siteConfig.name} trata tus datos personales conforme a la Ley chilena N° 21.719.`,
    url: `${siteConfig.url}${privacyPolicyMeta.path}`,
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <main>
      <Navbar />
      <PrivacyPolicyView />
      <Footer />
    </main>
  );
}
