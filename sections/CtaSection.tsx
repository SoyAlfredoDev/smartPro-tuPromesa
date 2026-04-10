"use client";

import { motion } from "framer-motion";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-base)] py-16 md:py-24">
      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,38,46,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        {/* Decorative lines + text */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35 }}
            className="shrink-0 text-center text-base sm:text-lg md:text-2xl font-semibold leading-tight text-[var(--color-text-primary)]"
          >
            Mientras más casos se visibilicen,{" "}
            <span className="font-extrabold">más fuerza tenemos.</span>
          </motion.p>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="mt-8 flex justify-center"
        >
          <OpenCaseModalButton label="Sumar mi caso" variant="primary" />
        </motion.div>
      </div>
    </section>
  );
}
