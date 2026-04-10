"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/8 bg-[var(--color-bg-base)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
              TuPromesa<span className="text-[var(--color-primary)]">.cl</span>
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Plataforma para visibilizar incumplimientos inmobiliarios y reunir
              antecedentes para posibles acciones legales colectivas.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.04 }}
            className="flex flex-col gap-3"
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

          {/* Legal */}
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

        {/* Economic indicators */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-10 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-2"
        >
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  Indicador
                </p>
                <h4 className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
                  UF
                </h4>
              </div>

              <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Hoy
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[var(--color-text-primary)]">
              {isLoadingIndicators ? "Cargando..." : formattedUf}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
              Valor actualizado de la Unidad de Fomento.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  Indicador
                </p>
                <h4 className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
                  Dólar observado
                </h4>
              </div>

              <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Hoy
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[var(--color-text-primary)]">
              {isLoadingIndicators ? "Cargando..." : formattedDolar}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
              Tipo de cambio referencial en peso chileno.
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-[var(--color-text-muted)] md:flex-row">
          <span>
            © {new Date().getFullYear()} Todos los derechos reservados
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
