"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+1.200", label: "Casos reportados" },
  { value: "+80", label: "Inmobiliarias mencionadas" },
  { value: "+350", label: "En revisión legal" },
];

export default function ImpactStatsSection() {
  return (
    <section className="relative w-full rounded-[var(--radius-lg)] border border-white/10 bg-black/40 backdrop-blur-md shadow-[var(--shadow-medium)]">
      <div className="px-4 sm:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-5">
          <span className="h-px flex-1 bg-white/15" />
          <p className="shrink-0 text-center text-xs sm:text-sm font-semibold text-white/80 tracking-wide">
            Lo que te pasó, le está pasando a{" "}
            <span className="font-extrabold text-white">muchos más.</span>
          </p>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 text-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-white">
                {stat.value}
              </span>
              <span className="mt-1.5 text-[11px] sm:text-xs md:text-sm font-medium leading-snug text-white/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
