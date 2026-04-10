"use client";

import { motion } from "framer-motion";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-base)] py-10 md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="h-px flex-1 bg-white/10" />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="shrink-0 text-center text-lg font-semibold leading-tight text-[var(--color-text-primary)] sm:text-2xl"
          >
            Mientras más casos se visibilicen,{" "}
            <span className="font-extrabold">más fuerza tenemos.</span>
          </motion.p>

          <span className="h-px flex-1 bg-white/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-5 flex justify-center"
        >
          <OpenCaseModalButton label="Sumar mi caso" variant="primary" />
        </motion.div>
      </div>
    </section>
  );
}
