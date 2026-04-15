"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VoteButton from "@/components/VoteButton";
import FeaturedCase from "@/components/FeaturedCase";

interface Inmobiliaria {
  _id: string;
  name: string;
  logoUrl: string;
}
const cases = [
  {
    inmobiliariaName: "Inmobiliaria SSILVA",
    votes: 10,
    inmobiliariaId: "horizonte-001",
    inmobiliariaLogo: "/inmobiliarias/inmobiliaria-ssilva.png", // Ajusta la ruta a tus assets
    userName: "Carlos Morales",
    comment:
      "Llevamos más de 2 años esperando la entrega del departamento en el proyecto 'Altos del Parque'. Siempre inventan una excusa nueva con la recepción municipal de la municipalidad y ahora se niegan a devolver el dinero del pie argumentando multas en el contrato.",
    date: "14 Mar 2024",
    highlight: "2 años de atraso",
  },
  {
    inmobiliariaName: "Inmobiliaria SSILVA",
    votes: 10,
    inmobiliariaId: "vista-bella-002",
    inmobiliariaLogo: "/inmobiliarias/inmobiliaria-ssilva.png",
    userName: "Andrea Silva",
    comment:
      "Me entregaron la casa hace 6 meses y ya presenta filtraciones graves en el baño principal que están arruinando el piso flotante del pasillo. He llamado incontables veces a postventa, envían correos automáticos, pero ningún técnico ha venido a ver el problema.",
    date: "28 Feb 2024",
    highlight: "Postventa inactiva",
  },
  {
    inmobiliariaName: "Inmobiliaria SSILVA",
    votes: 5,
    inmobiliariaId: "valle-central-003",
    inmobiliariaLogo: "/inmobiliarias/inmobiliaria-ssilva.png",
    userName: "Felipe Arancibia",
    comment:
      "El proyecto quedó paralizado sin previo aviso. Desistí de la compra exigiendo la cláusula de salida, y ahora retienen ilegalmente las 100 UF de la reserva. Ya nos organizamos con 15 vecinos más para presentar una demanda colectiva.",
    date: "05 Abr 2024",
    highlight: "Retención de reserva",
  },
  {
    inmobiliariaName: "Inmobiliaria Manquehue",
    votes: 10,
    inmobiliariaId: "valle-central-003",
    inmobiliariaLogo: "/inmobiliarias/inmobiliaria-manquehue.png",
    userName: "Felipe Arancibia",
    comment:
      "El proyecto quedó paralizado sin previo aviso. Desistí de la compra exigiendo la cláusula de salida, y ahora retienen ilegalmente las 100 UF de la reserva. Ya nos organizamos con 15 vecinos más para presentar una demanda colectiva.",
    date: "05 Abr 2024",
    highlight: "Retención de reserva",
  },
  {
    inmobiliariaName: "Inmobiliaria Manquehue",
    votes: 5,
    inmobiliariaId: "valle-central-003",
    inmobiliariaLogo: "/inmobiliarias/inmobiliaria-manquehue.png",
    userName: "Felipe Arancibia",
    comment:
      "El proyecto quedó paralizado sin previo aviso. Desistí de la compra exigiendo la cláusula de salida, y ahora retienen ilegalmente las 100 UF de la reserva. Ya nos organizamos con 15 vecinos más para presentar una demanda colectiva.",
    date: "05 Abr 2024",
    highlight: "Retención de reserva",
  },
];

export default function ReportedCasesSection() {
  const [pollOptions, setPollOptions] = useState<Inmobiliaria[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/inmobiliarias", {
          cache: "no-store",
        });
        const data = await res.json();

        console.log("data: ----->", data[0]);
        setPollOptions(data);
        setCompanies(data.map((item: Inmobiliaria) => item.logoUrl));
      } catch (error) {
        console.error("Error cargando inmobiliarias", error);
      }
    }

    load();
  }, []);
  return (
    <section className="relative overflow-hidden bg-elevated py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Companies */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-7">
            <h2 className="text-center text-lg font-extrabold text-red sm:text-xl md:text-2xl">
              Inmobiliarias mencionadas por usuarios
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-4">
              {cases.map((caseItem) => (
                <FeaturedCase
                  key={caseItem.inmobiliariaId}
                  inmobiliariaName={caseItem.inmobiliariaName}
                  votes={caseItem.votes}
                  inmobiliariaId={caseItem.inmobiliariaId}
                  inmobiliariaLogo={caseItem.inmobiliariaLogo}
                  userName={caseItem.userName}
                  comment={caseItem.comment}
                  date={caseItem.date}
                  highlight={caseItem.highlight}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="space-y-8"
        >
          {/* Poll */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-6">
            <h3 className="text-lg font-extrabold leading-tight text-[var(--color-text-primary)] sm:text-xl">
              ¿Qué inmobiliaria{" "}
              <span className="text-[var(--color-primary)]">NO</span>{" "}
              recomendarías?
            </h3>

            <div className="mt-5 space-y-2.5">
              {pollOptions.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-white/15 hover:bg-white/[0.06] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-text-primary)]">
                    <Image
                      src={item.logoUrl}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="shrink-0 rounded-sm"
                    />
                    {item.name}
                  </span>

                  <span className="">
                    <VoteButton
                      inmobiliariaId={item._id}
                      inmobiliariaName={item.name}
                      inmobiliariaLogo={item.logoUrl}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stories */}
          <div className="rounded-[var(--radius-lg)] border border-white/8 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)] md:p-6">
            <img
              src="/images/reported-cases-main.jpg"
              alt="Personas revisando antecedentes de un caso inmobiliario"
              className="h-[200px] w-full object-cover sm:h-[280px] lg:h-[320px]"
            />

            <h3 className="text-xl font-extrabold leading-tight text-[var(--color-text-primary)] md:text-2xl">
              Respaldo legal y acción colectiva
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Este espacio recopila antecedentes que pueden ser evaluados para
              acciones legales colectivas. Tu caso importa.
            </p>

            <span className="text-sm tracking-wide text-white/50">
              Asociados con:{" "}
              <a
                href="https://www.estudiolyv.cl/"
                target="_blank"
                className="text-gold "
              >
                Estudio de Abogados Lopez y Vidal
              </a>
            </span>
          </div>
        </motion.aside>
      </div>
      {/**Logos Inmobiliarias */}

      <div className="relative overflow-hidden w-full mt-12">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-red via-red/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-red via-red/80 to-transparent z-10"></div>

        <div className="flex w-max animate-[scroll_50s_linear_infinite]">
          {[...companies, ...companies, ...companies, ...companies].map(
            (company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-8 flex items-center justify-center"
              >
                <img
                  src={company}
                  alt="Logo"
                  className="
                h-14 w-auto object-contain
                opacity-60 grayscale
                hover:grayscale-0 hover:opacity-100
                transition duration-300
              "
                />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
