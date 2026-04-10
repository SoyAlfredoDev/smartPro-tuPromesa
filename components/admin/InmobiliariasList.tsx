"use client";

import { useMemo, useState } from "react";

type RealEstateCompany = {
  _id: string;
  name: string;
  slug: string;
  observation: string;
  logoUrl: string;
  website: string;
  status: "Activa" | "Oculta";
  createdAt: string;
};

type Props = {
  companies: RealEstateCompany[];
  onEdit: (company: RealEstateCompany) => void;
  onDelete: (id: string) => void;
};

export default function InmobiliariasList({
  companies,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.slug.toLowerCase().includes(term),
    );
  }, [companies, search]);

  function handleDeleteConfirm(id: string) {
    const confirmDelete = confirm(
      "¿Estás seguro que deseas eliminar esta inmobiliaria?\n\nEsta acción no se puede deshacer.",
    );

    if (!confirmDelete) return;

    onDelete(id);
  }

  return (
    <div className="bg-[var(--color-bg-surface)] p-5 rounded-xl border border-white/10">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar inmobiliaria..."
        className="w-full mb-4 px-4 py-2 bg-black/20 border border-white/10 rounded"
      />

      {/* LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">No hay resultados</p>
        ) : (
          filtered.map((company) => (
            <div
              key={company._id}
              className="flex items-center justify-between bg-black/20 p-4 rounded border border-white/10"
            >
              <div className="flex items-center gap-4">
                <img src={company.logoUrl} className="h-10 object-contain" />
                <div>
                  <p className="font-bold">{company.name}</p>
                  <p className="text-xs text-gray-400">{company.observation}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(company)}
                  className="text-sm hover:text-white"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDeleteConfirm(company._id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
