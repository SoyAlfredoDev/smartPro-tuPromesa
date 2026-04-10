"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+1.200", label: "Casos reportados" },
  { value: "+80", label: "Inmobiliarias mencionadas" },
  { value: "+350", label: "En revisión legal" },
];

export default function ImpactStatsSection() {
  return (
    <section className="relative border-y border-white/10 bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.15))]" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="h-px flex-1 bg-white/10" />
          <p className="shrink-0 text-center text-sm font-semibold text-white md:text-lg">
            Lo que te pasó, le está pasando a{" "}
            <span className="font-extrabold">muchos más.</span>
          </p>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-6 grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex flex-col items-center justify-center px-6 py-5 text-center md:py-6"
            >
              <span className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-base font-semibold leading-snug text-white md:text-xl">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
