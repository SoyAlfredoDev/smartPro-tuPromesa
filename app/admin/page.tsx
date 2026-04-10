"use client";

import { useEffect, useState } from "react";
import FormNewInmobiliaria from "@/components/admin/FormNewInmobiliaria";
import InmobiliariasList from "@/components/admin/InmobiliariasList";

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

export default function AdminPage() {
  const [companies, setCompanies] = useState<RealEstateCompany[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= LOAD ================= */

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/inmobiliarias");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.log(error);
      }
    }

    load();
  }, []);

  /* ================= HANDLERS ================= */

  async function handleCreate(data: any) {
    try {
      const res = await fetch("/api/inmobiliarias", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      setCompanies((prev) => [
        {
          _id: result.id,
          ...data,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch("/api/inmobiliarias", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      setCompanies((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(company: RealEstateCompany) {
    setEditingId(company._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const editingData = companies.find((c) => c._id === editingId);

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-elevated text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold">Panel Admin</h1>
          <p className="text-sm text-gray-400 mt-2">
            Gestiona inmobiliarias y logos
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
          {/* FORM */}
          <FormNewInmobiliaria onSubmit={handleCreate} />

          {/* LIST COMPONENT */}
          <InmobiliariasList
            companies={companies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}
