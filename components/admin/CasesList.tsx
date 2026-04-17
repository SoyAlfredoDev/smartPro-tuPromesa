"use client";

import { useEffect, useMemo, useState } from "react";

export type CaseRecord = {
  _id: string;
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  phone: string;
  incidentDate: string;
  claimedAmount: string;
  issueDescription: string;
  inmobiliariaName: string;
  createdAt?: string;
};

type Props = {
  onViewDetail?: (caseItem: CaseRecord) => void;
  onDelete?: (id: string) => void;
};

export default function CasesList({ onViewDetail, onDelete }: Props) {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCases() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/case");

        if (!res.ok) throw new Error("Error al obtener los casos");

        const data = await res.json();
        setCases(Array.isArray(data) ? data : data.casos || []);
      } catch (err: any) {
        setError(err.message || "Error de conexión");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCases();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return cases.filter(
      (c) =>
        c.firstName.toLowerCase().includes(term) ||
        c.lastName.toLowerCase().includes(term) ||
        c.rut.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term),
    );
  }, [cases, search]);

  function handleDeleteConfirm(id: string) {
    if (!confirm("¿Eliminar este caso? Esta acción no se puede deshacer."))
      return;
    onDelete?.(id);
    setCases((prev) => prev.filter((c) => c._id !== id));
  }

  return (
    <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-white/10 shadow-xl mt-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Casos</h2>
          <p className="text-sm text-gray-400">
            Gestiona y revisa los reclamos registrados
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="w-full lg:w-80 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition"
        />
      </div>

      {/* STATES */}
      {isLoading && (
        <p className="text-center text-gray-400 py-10">Cargando casos...</p>
      )}

      {error && <p className="text-center text-red-400 py-10">{error}</p>}

      {!isLoading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-10">No hay resultados</p>
      )}

      {/* GRID DASHBOARD */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <div
            key={c._id}
            className="group relative bg-black/30 border border-white/10 rounded-2xl p-5 hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(255,0,0,0.15)] transition-all duration-300"
            style={{
              animation: `fadeUp 0.4s ease forwards`,
              animationDelay: `${i * 0.05}s`,
              opacity: 0,
            }}
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-white font-semibold">
                  {c.firstName} {c.lastName}
                </p>
                <p className="text-xs text-gray-500">{c.email}</p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Activo
              </span>
            </div>

            {/* INFO */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>RUT</span>
                <span className="text-gray-200">{c.rut}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Monto</span>
                <span className="text-white font-medium">
                  {c.claimedAmount}
                </span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Inmobiliaria</span>
                <span className="text-[var(--color-primary)] font-medium">
                  {c.inmobiliariaName}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 mt-3 line-clamp-2">
              {c.issueDescription}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
              <button
                onClick={() => onViewDetail?.(c)}
                className="text-sm text-[var(--color-primary)] hover:opacity-80 transition cursor-pointer"
              >
                Ver detalle →
              </button>

              {onDelete && (
                <button
                  onClick={() => handleDeleteConfirm(c._id)}
                  className="text-sm text-red-400 hover:text-red-300 transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
