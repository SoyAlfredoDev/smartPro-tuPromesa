"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import OpenCaseModalButton from "@/components/common/OpenCaseModalButton";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Casos", href: "#casos" },
  { label: "Relatos", href: "#relatos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#footer" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 16);

      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // bajando
      } else {
        setIsVisible(true); // subiendo
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isVisible || isOpen ? 0 : -120,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
      >
        <motion.div
          initial={false}
          animate={{
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            backgroundColor: isScrolled
              ? "rgba(26, 26, 28, 0.82)"
              : "rgba(26, 26, 28, 0)",
            borderColor: isScrolled
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0)",
            boxShadow: isScrolled
              ? "0 10px 30px rgba(0,0,0,0.24)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.25 }}
          className="mx-auto max-w-7xl rounded-2xl border"
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-5">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Ir al inicio"
            >
              <span className="text-lg font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-xl">
                TuPromesa
                <span className="text-[var(--color-primary)]">.cl</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <OpenCaseModalButton
                label="Denunciar mi caso"
                styless="text-xs"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menú"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-text-primary)] transition hover:bg-white/10 lg:hidden"
            >
              <HiOutlineMenuAlt3 size={22} />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-sm flex-col border-l border-white/10 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-strong)] lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-[var(--color-text-primary)]">
                  TuPromesa
                  <span className="text-[var(--color-primary)]">.cl</span>
                </span>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-text-primary)] transition hover:bg-white/10"
                >
                  <HiOutlineX size={22} />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4 text-base font-semibold text-[var(--color-text-primary)] transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <OpenCaseModalButton
                  label="Denunciar mi caso"
                  styless="w-full"
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
