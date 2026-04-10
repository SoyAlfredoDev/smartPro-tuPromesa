import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tupromesa.cl"),
  title: {
    default: "TuPromesa.cl — Denuncia Incumplimientos Inmobiliarios",
    template: "%s | TuPromesa.cl",
  },
  description:
    "Visibiliza y denuncia incumplimientos inmobiliarios en Chile. Retrasos en entrega, cambios de condiciones o problemas con tu promesa de compraventa.",
  keywords: [
    "incumplimiento inmobiliario Chile",
    "retraso entrega vivienda Chile",
    "promesa compraventa problemas",
    "inmobiliarias problemas Chile",
    "denunciar inmobiliaria Chile",
  ],
  alternates: {
    canonical: "https://tupromesa.cl",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://tupromesa.cl",
    siteName: "TuPromesa.cl",
    title: "¿Tu promesa inmobiliaria no se cumplió? - TuPromesa.cl",
    description:
      "Visibiliza y denuncia incumplimientos inmobiliarios en Chile. Retrasos en entrega, o problemas con tu promesa de compraventa. Registra tu caso ahora.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "¿Tu promesa inmobiliaria no se cumplió?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Tu promesa inmobiliaria no se cumplió? - TuPromesa.cl",
    description:
      "Visibiliza y denuncia incumplimientos inmobiliarios en Chile. Retrasos en entrega, o problemas con tu promesa de compraventa.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
