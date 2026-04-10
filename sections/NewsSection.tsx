"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const newsItems = [
  {
    id: 1,
    title: "Retraso por años en entrega de viviendas afectó a 268 compradores",
    image: "/images/news-01.webp",
    category: "Noticias",
    date: "25/01/2026",
    excerpt:
      "Cientos de familias en Valdivia enfrentaron años de retraso en la entrega de sus viviendas, lo que generó gastos adicionales e incertidumbre. La justicia ordenó indemnizaciones mensuales a los afectados.",

    source: "El Desconcierto",
    href: "https://eldesconcierto.cl/2026/01/25/retraso-por-anos-en-entrega-de-viviendas-afecto-a-268-compradores-inmobiliaria-debera-pagarles-350-mil-por-cada-mes-de-atraso",
  },
  {
    id: 2,
    title: "Sernac obliga a inmobiliarias a cumplir fechas prometidas",
    image: "/images/news-02.jpeg",
    category: "Noticias",
    date: "25/01/2026",
    excerpt:
      "El Sernac estableció que todas las fechas prometidas, incluso antes de firmar contrato, son vinculantes y deben cumplirse por las inmobiliarias.",

    source: "CNN Chile",
    href: "https://www.cnnchile.com/servicios/que-pasa-si-la-inmobiliaria-no-entrega-a-tiempo-nuevo-dictamen-del-sernac-lo-aclara_20250501/",
  },
  {
    id: 3,
    title: "Corte de Santiago ordena cumplir promesa de compraventa",
    image: "/images/news-03.jpg",
    category: "Noticias",
    date: "25/01/2026",
    excerpt:
      "La justicia confirmó que una inmobiliaria debía cumplir lo prometido en contratos de compraventa tras una demanda de los afectados.",
    source: "Poder Judicial de Chile",
    href: "https://www.pjud.cl/prensa-y-comunicaciones/noticias-del-poder-judicial/135478",
    summary:
      "La justicia confirmó que una inmobiliaria debía cumplir lo prometido en contratos de compraventa tras una demanda de los afectados.",
    impact_angle:
      "Valida que las promesas inmobiliarias tienen peso legal real y pueden ser exigidas judicialmente.",
  },
  {
    id: 4,
    title: "Sernac fija reglas: inmobiliarias deben respetar fechas de entrega",
    image: "/images/news-04.jpg",
    category: "Noticias",
    date: "25/01/2026",
    excerpt:
      "El organismo aclaró que no respetar plazos constituye incumplimiento contractual y habilita a los consumidores a exigir compensaciones.",
    impact_angle:
      "Conecta directamente con el problema de tu landing: incumplimientos que permiten reclamar, exigir devolución o indemnización.",
    href: "https://www.sernac.cl/portal/618/w3-propertyvalue-105271.html",
  },
] as const;

export default function NewsSection() {
  return (
    <section className="relative overflow-hidden bg-elevated  py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(215,38,46,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-red bg-red/10 px-4 py-1.5 text-sm font-semibold text-red">
              Noticias y actualidad
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-light sm:text-4xl md:text-5xl">
              Información útil para entender mejor el problema
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-light sm:text-lg">
              Revisa noticias, análisis y contenidos relacionados con
              incumplimientos, retrasos, cambios de condiciones y otros temas
              que afectan a quienes compran en proyectos inmobiliarios.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex h-fit items-center justify-center rounded-[var(--radius-md)] border border-white/10 px-5 py-3 text-sm font-bold text-[var(--color-text-primary)] transition hover:bg-white/5"
          >
            Ver todas las noticias
          </a>
        </motion.div>

        {/* Desktop / Tablet grid */}
        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: index * 0.06 }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-light shadow-[var(--shadow-medium)]"
            >
              <a href={item.href} className="block h-full" target="_blank">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    src={item.image}
                    alt={item.title}
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.35))]" />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    {item.date}
                  </p>

                  <h3 className="mt-3 text-xl font-extrabold leading-snug text-dark transition group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {item.excerpt}
                  </p>

                  <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red hover:scale-105 cursor-pointer">
                    Leer más
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Mobile carousel-like scroll */}
        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="w-[86%] min-w-[86%] snap-center overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-[var(--color-bg-surface)] shadow-[var(--shadow-medium)]"
              >
                <a href={item.href} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      fill
                      sizes="86vw"
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.38))]" />

                    <div className="absolute left-4 top-4">
                      <span className="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      {item.date}
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold leading-snug text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {item.excerpt}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]">
                      Leer más
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {newsItems.map((item) => (
              <span
                key={item.id}
                className="h-2 w-2 rounded-full bg-white/20"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
