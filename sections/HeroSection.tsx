"use client";

import ImpactStatsSection from "@/sections/ImpactStatusSection";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg-hero.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Stronger overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center gap-5 px-5 sm:px-6 py-24 md:py-28">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-shadow-hero text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight tracking-tight"
        >
          ¿Tu promesa inmobiliaria no se cumplió?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-shadow-sm text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed"
        >
          Retrasos, cambios de condiciones, incumplimientos… <br className="hidden sm:block" />
          Aquí puedes visibilizar tu caso.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
        >
          <OpenCaseModalButton />

          <button className="px-6 py-3 cursor-pointer rounded-[var(--radius-md)] font-semibold border border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-200">
            Ver denuncias reales →
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-6 w-full"
        >
          <ImpactStatsSection />
        </motion.div>
      </div>
    </section>
  );
}
