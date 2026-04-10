"use client";

import { motion } from "framer-motion";

const companies = [
  "Grupo XYZ",
  "InmoChile",
  "EDIFICA",
  "Acerra",
  "Inmohogar",
  "Omega",
  "ciu2AD+",
  "UrbanReal",
  "ALIANZA",
  "NEX",
  "Desarrollos ABC",
  "AP3",
];

const pollOptions = [
  "Inmobiliaria X",
  "Construcciones Z",
  "Edifica ABC",
  "Proyectos Omega",
  "Otra: ¿Por qué?",
];

const stories = [
  "Firmé y nunca respetaron el precio",
  "Me cambiaron la fecha 3 veces",
  "Perdí dinero por incumplimiento",
];

export default function ReportedCasesSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-base)] py-10 md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          {/* Companies */}
          <div className="border border-white/10 bg-[var(--color-bg-surface)]/70 p-4 shadow-[var(--shadow-medium)] backdrop-blur-sm md:p-6">
            <h2 className="text-center text-xl font-extrabold text-[var(--color-text-primary)] sm:text-2xl">
              Inmobiliarias mencionadas por usuarios
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {companies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="flex min-h-[84px] items-center justify-center border border-black/40 bg-[#efede8] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                >
                  <span className="text-sm font-semibold tracking-tight text-[#4a4a4a] sm:text-base">
                    {company}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-[var(--color-text-secondary)] sm:text-sm">
              Los logos corresponden a empresas mencionadas por usuarios en sus
              relatos.
              <br />
              No constituye acusación formal.
            </p>
          </div>

          {/* Large image */}
          <div className="overflow-hidden border border-white/10 bg-[var(--color-bg-surface)] shadow-[var(--shadow-medium)]">
            <img
              src="/reported-cases-main.jpg"
              alt="Personas revisando antecedentes de un caso inmobiliario"
              className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[360px]"
            />
          </div>

          {/* Legal support */}
          <div className="border border-white/10 bg-[var(--color-bg-surface)]/70 p-5 shadow-[var(--shadow-medium)] backdrop-blur-sm md:p-6">
            <h3 className="text-2xl font-extrabold leading-tight text-[var(--color-text-primary)]">
              Respaldo legal y acción colectiva
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
              Este espacio recopila antecedentes que pueden ser evaluados para
              acciones legales colectivas.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="space-y-6"
        >
          {/* Poll */}
          <div className="border border-white/10 bg-[var(--color-bg-surface)]/70 p-4 shadow-[var(--shadow-medium)] backdrop-blur-sm md:p-5">
            <h3 className="text-xl font-extrabold leading-tight text-[var(--color-text-primary)] sm:text-2xl">
              ¿Qué inmobiliaria{" "}
              <span className="text-[var(--color-primary)]">NO</span>{" "}
              recomendarías?
            </h3>

            <div className="mt-4 space-y-2">
              {pollOptions.map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between gap-3 border border-white/10 bg-black/25 px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/5"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] sm:text-base">
                    <span className="text-[var(--color-primary)]">★</span>
                    {item}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-sm bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-active))] px-3 py-1.5 text-sm font-bold text-white shadow-[var(--shadow-primary-glow)]">
                    <span>👥</span>
                    Votar
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stories */}
          <div className="border border-white/10 bg-[var(--color-bg-surface)]/70 p-4 shadow-[var(--shadow-medium)] backdrop-blur-sm md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] sm:text-2xl">
                Relatos de Afectados
              </h3>
              <span className="text-lg tracking-wide text-[var(--color-primary)]">
                ★★★★
              </span>
              <span className="text-lg tracking-wide text-white/35">★</span>
            </div>

            <div className="mt-4 space-y-2">
              {stories.map((story) => (
                <div
                  key={story}
                  className="flex items-center gap-2 border border-white/10 bg-black/25 px-3 py-3"
                >
                  <span className="text-[var(--color-primary)]">★</span>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] sm:text-base">
                    {story}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-active))] px-5 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-[var(--shadow-primary-glow)] transition hover:brightness-110 sm:text-lg">
              Sumar mi caso
            </button>
          </div>

          {/* Secondary image */}
          <div className="overflow-hidden border border-white/10 bg-[var(--color-bg-surface)] shadow-[var(--shadow-medium)]">
            <img
              src="/reported-cases-secondary.jpg"
              alt="Personas afectadas conversando sobre un problema inmobiliario"
              className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[300px]"
            />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
