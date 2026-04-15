"use client";

import { motion } from "framer-motion";
import VoteButton from "./VoteButton";

type FeaturedCaseProps = {
  inmobiliariaName: string;
  inmobiliariaId: string;
  inmobiliariaLogo: string;
  votes: number;
  userName: string;
  comment: string;
  date: string;
  highlight?: string;
};

export default function FeaturedCase({
  inmobiliariaName,
  inmobiliariaId,
  inmobiliariaLogo,
  userName,
  comment,
  date,
  highlight,
  votes,
}: FeaturedCaseProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-default bg-light shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] md:flex-row"
    >
      {/* Contenido */}
      <div className="flex w-full flex-col justify-between py-2 px-4">
        {/* Top */}
        <div>
          {/* Nombre + fecha */}
          <div className="flex flex-col g sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm  md:text-lg font-semibold text-red pb-0 mb-0">
                {inmobiliariaName} <span className="text-red">{votes}</span>
              </h3>
              <span className="text-[11px]">{date}</span>
              <p className="text-xs">
                Reportado por{" "}
                <span className="font-medium text-primary font-bold">
                  {userName}
                </span>
              </p>
            </div>

            <div>
              <img
                src={inmobiliariaLogo}
                alt={`Logo de ${inmobiliariaName}`}
                className="w-[120px] rounded-lg"
              />
            </div>
          </div>
          {/* Comentario */}
          <p className="mt-2 text-sm leading-[1.2] text-text-secondary line-clamp-3 sm:line-clamp-4">
            “{comment}”
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] font-bold text-text-secondary text-green-700">
            Caso verificado
          </span>
        </div>
      </div>
    </motion.article>
  );
}
