"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

/**
 * CONFIGURACIÓN CENTRALIZADA
 * 👉 aquí modificas links, tipos, orden, etc.
 */
const floatingActions = [
  {
    id: "instagram",
    type: "link",
    href: "https://www.instagram.com/groups/1000000000000000/",
    icon: FaInstagram,
    color: "white",
  },
  {
    id: "facebook",
    type: "link",
    href: "https://www.facebook.com/groups/1000000000000000/",
    icon: FaFacebook,
    color: "white",
  },
  {
    id: "whatsapp",
    type: "link",
    href: "https://wa.me/56900000000", // 🔁 cambiar aquí
    icon: FaWhatsapp,
    color: "green",
  },
] as const;

export default function FloatingActionBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP */}
      <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <div className="rounded-[var(--radius-md)] border border-white/10 bg-[var(--color-bg-surface)]/80 p-2 backdrop-blur-xl shadow-[var(--shadow-medium)]">
          <div className="flex flex-col gap-2">
            {floatingActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.id}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border transition-all duration-200
                     ${action.color === "green" ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white" : ""} 
                     ${action.color === "white" ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : ""} `}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="fixed bottom-5 right-5 z-50 lg:hidden">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="open"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(true)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-active))] text-white shadow-[var(--shadow-primary-glow)]"
            >
              <IoChevronUpOutline size={24} />
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="w-[80px] rounded-[20px] border border-white/10 bg-[var(--color-bg-surface)]/90 p-2 backdrop-blur-xl shadow-[var(--shadow-strong)]"
            >
              {/* Close */}
              <div className="mb-2 flex justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/70"
                >
                  <IoClose size={20} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-2">
                {floatingActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <motion.a
                      key={action.id}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border transition-all duration-200
                     ${action.color === "green" ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white" : ""} 
                     ${action.color === "white" ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : ""} `}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Collapse */}
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center text-white/50 hover:text-white"
                >
                  <IoChevronDownOutline size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
