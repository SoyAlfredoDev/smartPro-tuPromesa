"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const reasons = [
  "Mal servicios post venta",
  "Incumplimiento de plazos",
  "Promesas Abusivas",
  "Precios Inflados",
];

export default function VoteButton({
  inmobiliariaId,
  inmobiliariaName = "Teomemgrandi",
  inmobiliariaLogo = "https://via.placeholder.com/80",
}) {
  const [open, setOpen] = useState(false);

  const handleVote = () => {
    setOpen(true);
  };

  return (
    <>
      {/* Button */}
      <button
        type="button"
        onClick={handleVote}
        className="relative z-30 inline-flex items-center gap-1.5 rounded-sm border border-red/30 bg-red/10 px-3 py-1.5 text-xs font-bold text-red transition hover:bg-primary hover:text-white cursor-pointer"
      >
        Votar
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal container */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Modal */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg overflow-hidden rounded-[24px] border border-default bg-light shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                {/* Header con inmobiliaria */}
                <div className="flex items-center gap-4 border-b border-default bg-background px-6 py-4">
                  <Image
                    src={inmobiliariaLogo}
                    alt={inmobiliariaName}
                    width={100}
                    height={100}
                    className=" w-60 rounded-sm object-cover border border-lg rounded-lg"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-red">
                      {inmobiliariaName}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Estás votando por esta inmobiliaria
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-5">
                    <h4 className="text-lg font-semibold text-text-primary">
                      Registrar voto
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      Completa la información para continuar.
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOpen(false);
                    }}
                    className="space-y-4"
                  >
                    {/* Nombre */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-text-secondary">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-default bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Tu nombre"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-text-secondary">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-xl border border-default bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>

                    {/* Reasons */}
                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        ¿Por qué votas por esta inmobiliaria?
                      </label>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {reasons.map((reason) => (
                          <label
                            key={reason}
                            className="flex items-center gap-2 rounded-lg border border-default bg-background px-3 py-2 text-sm text-text-primary"
                          >
                            <input type="checkbox" className="accent-primary" />
                            {reason}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Otros */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-text-secondary">
                        Otros motivos
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl border border-default bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Puedes agregar más detalles..."
                      />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-2 text-xs text-text-secondary">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 accent-primary"
                      />
                      Acepto que mi información sea tratada conforme a la
                      legislación chilena y autorizo el contacto.
                    </label>

                    {/* Actions */}
                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-default px-4 py-2 text-sm text-text-secondary transition hover:bg-background"
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                      >
                        Enviar voto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
