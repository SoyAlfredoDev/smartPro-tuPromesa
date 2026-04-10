"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--color-bg-base)]">
      {/* subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
              TuPromesa<span className="text-[var(--color-primary)]">.cl</span>
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Plataforma para visibilizar incumplimientos inmobiliarios y reunir
              antecedentes para posibles acciones legales colectivas.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)]">
              Navegación
            </h4>

            <Link
              href="#"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition"
            >
              Denunciar mi caso
            </Link>
            <Link
              href="#"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition"
            >
              Ver denuncias
            </Link>
            <Link
              href="#"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition"
            >
              Contacto
            </Link>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)]">
              Legal
            </h4>

            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              La información publicada corresponde a relatos de usuarios y no
              constituye acusación formal. Este sitio actúa como canal de
              visibilización.
            </p>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative mt-8 border-t border-white/10 pt-6 text-center max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a8a29e]">
          <span>
            Estudio Jurídico Vidal y López Limitada, RUT 77.938.388-5 / ©{" "}
            {new Date().getFullYear()} Todos los derechos reservados
          </span>
          <div className="flex items-center justify-center gap-2">
            <span>creado por:</span>
            <a
              href="https://smartpro.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/images/logo-smartpro.png"
                alt="SmartPro — Desarrollo web profesional"
                width={80}
                height={30}
                className="w-auto object-contain bg-white rounded-lg py-2 px-4"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
