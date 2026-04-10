"use client";

import { motion } from "framer-motion";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";

const legalPoints = [
  "Evaluación inicial de antecedentes y viabilidad del caso",
  "Orientación legal frente a incumplimientos y cambios de condiciones",
  "Acompañamiento en reclamos, gestiones y acciones colectivas",
  "Revisión de contratos, promesas, anexos y respaldos documentales",
];

export default function LegalSupportSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-base)] py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(215,38,46,0.08),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <div className="inline-flex rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--color-primary)]">
            Respaldo jurídico
          </div>

          <div>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-[var(--color-text-primary)] sm:text-4xl md:text-5xl">
              Tu caso no solo se visibiliza:
              <span className="block">
                también puede ser evaluado por un equipo legal.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Esta plataforma cuenta con el apoyo de{" "}
              <span className="font-semibold text-[var(--color-text-primary)]">
                Estudio Jurídico Vidal y López
              </span>
              , un equipo que puede revisar antecedentes, orientar a los
              afectados y apoyar la búsqueda de soluciones frente a
              incumplimientos inmobiliarios.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {legalPoints.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-[var(--radius-lg)] border border-white/10 bg-[var(--color-bg-surface)]/75 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-sm font-bold text-[var(--color-primary)]">
                    ✓
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-[var(--color-text-primary)] sm:text-base">
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <OpenCaseModalButton label="Solicitar evaluación de mi caso" />
            <a
              href="#footer"
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-white/10 px-6 py-3 text-sm font-bold text-[var(--color-text-primary)] transition hover:bg-white/5"
            >
              Conocer más del respaldo legal
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-[var(--color-bg-surface)] shadow-[var(--shadow-strong)]">
            <div className="aspect-[4/5] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.18))]">
              <img
                src="/images/legal-team.jpg"
                alt="Equipo legal de apoyo revisando antecedentes"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="border-t border-white/10 p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Equipo aliado
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-[var(--color-text-primary)]">
                    Estudio Jurídico Vidal y López
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Apoyo legal para la revisión de antecedentes, orientación y
                    posibles acciones frente a incumplimientos inmobiliarios.
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Enfoque
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    Defensa, orientación y acción colectiva
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-6 -right-4 hidden h-28 w-28 rounded-full bg-[var(--color-primary)]/20 blur-3xl md:block" />
        </motion.div>
      </div>
    </section>
  );
}
