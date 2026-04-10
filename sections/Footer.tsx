"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[var(--color-bg-base)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
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
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.04 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Navegación
            </h4>

            {[
              { label: "Denunciar mi caso", href: "#" },
              { label: "Ver denuncias", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Contacto", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Legal
            </h4>

            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              La información publicada corresponde a relatos de usuarios y no
              constituye acusación formal. Este sitio actúa como canal de
              visibilización.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span>
            Estudio Jurídico Vidal y López Limitada, RUT 77.938.388-5 / ©{" "}
            {new Date().getFullYear()} Todos los derechos reservados
          </span>
          <div className="flex items-center gap-2">
            <span>creado por:</span>
            <a
              href="https://smartpro.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/images/logo-smartpro.png"
                alt="SmartPro — Desarrollo web profesional"
                width={80}
                height={30}
                className="w-auto object-contain bg-white rounded-[var(--radius-sm)] py-1.5 px-3"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
