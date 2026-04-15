"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/site";

type EconomicIndicators = {
  uf: number | null;
  dolar: number | null;
};

const footerLinks = [
  { label: "Denunciar mi caso", href: "#" },
  { label: "Ver denuncias", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contacto", href: "#" },
] as const;

export default function Footer() {
  const [indicators, setIndicators] = useState<EconomicIndicators>({
    uf: null,
    dolar: null,
  });
  const [isLoadingIndicators, setIsLoadingIndicators] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadIndicators() {
      try {
        setIsLoadingIndicators(true);

        const response = await fetch("https://mindicador.cl/api", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener los indicadores");
        }

        const data = await response.json();

        setIndicators({
          uf: typeof data?.uf?.valor === "number" ? data.uf.valor : null,
          dolar:
            typeof data?.dolar?.valor === "number" ? data.dolar.valor : null,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        setIndicators({
          uf: null,
          dolar: null,
        });
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingIndicators(false);
        }
      }
    }

    loadIndicators();

    return () => controller.abort();
  }, []);

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }, []);

  const formattedUf =
    indicators.uf !== null ? currencyFormatter.format(indicators.uf) : "--";

  const formattedDolar =
    indicators.dolar !== null
      ? currencyFormatter.format(indicators.dolar)
      : "--";

  // Extraemos datos de contacto y redes sociales (ajusta según tu siteConfig)
  const socialLinks = {
    whatsapp: siteConfig?.contact?.whatsappLink || "#",
    instagram: siteConfig?.social?.instagram || "#",
    facebook: siteConfig?.social?.facebook || "#",
    email: siteConfig?.contact?.email || "contacto@tupromesa.cl",
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/8 bg-[var(--color-bg-base)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-14">
        {/* Top Section: Grid de 4 columnas para mejor distribución */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="flex flex-col"
          >
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
              TuPromesa<span className="text-[var(--color-primary)]">.cl</span>
            </h3>

            <p className="mt-3 mb-6 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Plataforma para visibilizar incumplimientos inmobiliarios y reunir
              antecedentes para posibles acciones legales colectivas.
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-4 mt-auto">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* 2. Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.04 }}
            className="flex flex-col gap-3 lg:pl-8"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Navegación
            </h4>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* 3. Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Contacto
            </h4>
            <a
              href={`mailto:${socialLinks.email}`}
              className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-white"
            >
              <svg
                className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {socialLinks.email}
            </a>
          </motion.div>

          {/* 4. Legal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Legal
            </h4>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              La información publicada corresponde a relatos de usuarios y no
              constituye acusación formal. Este sitio actúa como canal de
              visibilización.
            </p>
          </motion.div>
        </div>

        {/* Separador e Indicadores compactos */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 md:flex-row md:items-center"
        >
          {/* Indicadores Económicos - Diseño reducido */}
          <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] border border-white/8 bg-white/[0.02] px-4 py-2.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Indicadores de Hoy:
            </span>
            <div className="flex items-center gap-4 pl-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  UF
                </span>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  {isLoadingIndicators ? "..." : formattedUf}
                </span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  Dólar
                </span>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  {isLoadingIndicators ? "..." : formattedDolar}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-[var(--color-text-muted)] md:flex-row">
          <span>
            © {new Date().getFullYear()} TuPromesa.cl. Todos los derechos
            reservados.
          </span>

          <div className="flex items-center gap-2">
            <span>creado por:</span>
            <a
              href="https://smartpro.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/images/logo-smartpro.png"
                alt="SmartPro — Desarrollo web profesional"
                width={80}
                height={30}
                className="w-auto rounded-[var(--radius-sm)] bg-white object-contain px-3 py-1.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
