"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";
import Image from "next/image";
import VoteButton from "@/components/VoteButton";

const stories = [
  "Firmé y nunca respetaron el precio",
  "Me cambiaron la fecha 3 veces",
  "Perdí dinero por incumplimiento",
];

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface Inmobiliaria {
  _id: string;
  name: string;
  logoUrl: string;
}

export default function ReportedCasesSection() {
  const [pollOptions, setPollOptions] = useState<Inmobiliaria[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/inmobiliarias", {
          cache: "no-store",
        });
        const data = await res.json();

        console.log("data: ----->", data[0]);
        setPollOptions(data);
        setCompanies(data.map((item: Inmobiliaria) => item.logoUrl));
      } catch (error) {
        console.error("Error cargando inmobiliarias", error);
      }
    }

    load();
  }, []);
  return (
    <section className="relative overflow-hidden bg-elevated py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Companies */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-7">
            <h2 className="text-center text-lg font-extrabold text-[var(--color-text-primary)] sm:text-xl md:text-2xl">
              Inmobiliarias mencionadas por usuarios
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {companies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-white/6 bg-white/[0.03] transition-colors hover:border-white/12 hover:bg-white/[0.06]"
                >
                  {/* Monogram */}
                  <Image
                    src={company}
                    alt="Company"
                    width={96}
                    height={96}
                    className="w-full shrink-0 rounded-[var(--radius-sm)]"
                  />
                </motion.div>
              ))}
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-[var(--color-text-muted)] sm:text-xs">
              Empresas mencionadas por usuarios en sus relatos.
              <br />
              No constituye acusación formal.
            </p>
          </div>

          {/* Main image */}
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-white/8 shadow-[var(--shadow-medium)]">
            <img
              src="/images/reported-cases-main.jpg"
              alt="Personas revisando antecedentes de un caso inmobiliario"
              className="h-[200px] w-full object-cover sm:h-[280px] lg:h-[320px]"
            />
          </div>

          {/* Legal support */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-7">
            <h3 className="text-xl font-extrabold leading-tight text-[var(--color-text-primary)] md:text-2xl">
              Respaldo legal y acción colectiva
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Este espacio recopila antecedentes que pueden ser evaluados para
              acciones legales colectivas. Tu caso importa.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="space-y-8"
        >
          {/* Poll */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-6">
            <h3 className="text-lg font-extrabold leading-tight text-[var(--color-text-primary)] sm:text-xl">
              ¿Qué inmobiliaria{" "}
              <span className="text-[var(--color-primary)]">NO</span>{" "}
              recomendarías?
            </h3>

            <div className="mt-5 space-y-2.5">
              {pollOptions.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-white/15 hover:bg-white/[0.06] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-text-primary)]">
                    <Image
                      src={item.logoUrl}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="shrink-0 rounded-sm"
                    />
                    {item.name}
                  </span>

                  <span className="">
                    <VoteButton
                      inmobiliariaId={item._id}
                      inmobiliariaName={item.name}
                      inmobiliariaLogo={item.logoUrl}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stories */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] sm:text-xl">
                Relatos de Afectados
              </h3>
              <span className="text-sm tracking-wide text-[var(--color-primary)]">
                ★★★★
              </span>
              <span className="text-sm tracking-wide text-white/25">★</span>
            </div>

            <div className="mt-5 space-y-2.5">
              {stories.map((story) => (
                <div
                  key={story}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <span className="mt-0.5 text-xs text-[var(--color-primary)]">
                    ★
                  </span>
                  <p className="text-sm font-medium leading-snug text-[var(--color-text-primary)]">
                    {story}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <OpenCaseModalButton label="Sumar mi caso" variant="primary" />
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
