"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import {
  getPrivacyPolicyWhatsAppUrl,
  privacyPolicyContactCta,
} from "@/constants/privacy-policy";
import { siteConfig } from "@/site";

export function PrivacyPolicyContactCta() {
  const reducedMotion = useReducedMotion();
  const whatsAppUrl = getPrivacyPolicyWhatsAppUrl(siteConfig.contact.phone);

  return (
    <motion.section
      id={privacyPolicyContactCta.id}
      aria-labelledby={`${privacyPolicyContactCta.id}-title`}
      className="scroll-mt-28"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-primary)]/25 bg-gradient-to-br from-[var(--color-primary)]/15 via-[var(--color-bg-surface)] to-[var(--color-bg-base)] p-6 sm:p-8">
        <div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-primary)]/20 blur-2xl"
          aria-hidden
        />

        <div className="relative space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
            {privacyPolicyContactCta.eyebrow}
          </p>
          <h2
            id={`${privacyPolicyContactCta.id}-title`}
            className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-2xl"
          >
            {privacyPolicyContactCta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            {privacyPolicyContactCta.description}
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
            >
              <Mail className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
              {siteConfig.contact.email}
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[#25D366]/50 hover:bg-[#25D366]/15"
              aria-label={`WhatsApp ${siteConfig.contact.phoneDisplay} (abre en nueva pestaña)`}
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-[#128C7E]" aria-hidden />
              WhatsApp {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
