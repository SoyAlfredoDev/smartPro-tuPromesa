"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// Separé el número del prefijo para poder animar solo el valor numérico
const stats = [
  { value: 1200, prefix: "+", label: "Casos reportados" },
  { value: 80, prefix: "+", label: "Inmobiliarias mencionadas" },
  { value: 350, prefix: "+", label: "En revisión legal" },
];

// Subcomponente para el contador numérico
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5, // Duración del conteo en segundos
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            // Formateamos para que agregue el punto de miles (ej: 1200 -> 1.200)
            ref.current.textContent = new Intl.NumberFormat("es-CL").format(
              Math.round(v),
            );
          }
        },
      });

      return () => controls.stop();
    }
  }, [value, isInView]);

  return <span ref={ref}>0</span>;
}

export default function ImpactStatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full rounded-[var(--radius-lg)] border border-white/10 bg-black/40 backdrop-blur-md shadow-[var(--shadow-medium)] overflow-hidden"
    >
      {/* Brillo sutil de fondo para darle volumen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />

      <div className="relative px-4 sm:px-6 py-6 md:py-8">
        {/* Header Animado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 md:gap-5"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <p className="shrink-0 text-center text-xs sm:text-sm font-semibold text-white/80 tracking-wide">
            Lo que te pasó, le está pasando a{" "}
            <span className="font-extrabold text-white">muchos más.</span>
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 text-center"
            >
              <div className="flex items-baseline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-white">
                <span>{stat.prefix}</span>
                <AnimatedNumber value={stat.value} />
              </div>
              <span className="mt-2 text-[11px] sm:text-xs md:text-sm font-medium leading-snug text-white/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
