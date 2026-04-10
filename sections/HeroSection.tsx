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
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/10 " />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white-secondary leading-tight"
        >
          ¿Tu promesa inmobiliaria no se cumplió?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base md:text-lg text-gray-light max-w-2xl"
        >
          Retrasos, cambios de condiciones, incumplimientos… <br />
          Aquí puedes visibilizar tu caso.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <OpenCaseModalButton />

          <button className="px-6 py-3 cursor-pointer bg-white/80 rounded-md font-semibold border border-[var(--color-border-strong)] text-black hover:bg-[var(--color-bg-surface)] transition">
            Ver denuncias reales →
          </button>
        </motion.div>
        <ImpactStatsSection />
      </div>
    </section>
  );
}
