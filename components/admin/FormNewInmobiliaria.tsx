"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

/* ================= TYPES ================= */

type FormDataType = {
  name: string;
  observation: string;
  logoUrl: string;
  website: string;
  status: "Activa" | "Oculta";
};

type Props = {
  onSubmit: (data: FormDataType) => Promise<{ success: boolean }>;
  initialData?: FormDataType;
};

/* ================= INITIAL STATE ================= */

const initialFormState: FormDataType = {
  name: "",
  observation: "",
  logoUrl: "",
  website: "",
  status: "Activa",
};

/* ================= COMPONENT ================= */

export default function FormNewInmobiliaria({ onSubmit, initialData }: Props) {
  const [form, setForm] = useState<FormDataType>(
    initialData || initialFormState,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    setForm(initialData || initialFormState);
    setErrors({});
  }, [initialData]);

  /* ================= HANDLERS ================= */

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors: Partial<Record<keyof FormDataType, string>> = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.logoUrl.trim())
      newErrors.logoUrl = "La URL del logo es obligatoria.";

    return newErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCreating(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsCreating(false);
      return;
    }

    const result = await onSubmit({
      name: form.name.trim(),
      observation: form.observation.trim(),
      logoUrl: form.logoUrl.trim(),
      website: form.website.trim(),
      status: form.status,
    });

    if (result.success) {
      setForm(initialFormState);
      setErrors({});
      setIsCreating(false);
    } else {
      setIsCreating(false);
      alert("Error al crear la inmobiliaria");
    }
  }

  /* ================= UI ================= */

  return (
    <div className="rounded-[var(--radius-xl)] border border-white/10 bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-medium)]">
      <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">
        Nueva inmobiliaria
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field>
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej: Inmobiliaria Los Robles"
          />
          <ErrorText message={errors.name} />
        </Field>

        <Field>
          <Label htmlFor="observation">Descripción / Observación</Label>
          <Textarea
            id="observation"
            name="observation"
            value={form.observation}
            onChange={handleChange}
            placeholder="Agrega una descripción breve o una observación interna"
          />
          <ErrorText message={errors.observation} />
        </Field>

        <Field>
          <Label htmlFor="logoUrl">Logo URL *</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
          <ErrorText message={errors.logoUrl} />
        </Field>

        <Field>
          <Label htmlFor="website">Sitio web</Label>
          <Input
            id="website"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://sitio.cl"
          />
          <ErrorText message={errors.website} />
        </Field>

        <Field>
          <Label htmlFor="status">Estado</Label>
          <Select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Activa">Activa</option>
            <option value="Oculta">Oculta</option>
          </Select>
          <ErrorText message={errors.status} />
        </Field>

        <div className="rounded-[var(--radius-md)] border border-white/10 bg-black/20 p-4">
          {form.logoUrl ? (
            <img
              src={form.logoUrl}
              alt="Vista previa del logo"
              className="mx-auto max-h-16 w-auto object-contain"
            />
          ) : (
            <p className="text-center text-sm text-gray-400">
              Vista previa del logo
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-[var(--radius-md)] bg-[var(--color-primary)] py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isCreating}
        >
          {isCreating ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Field({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-sm font-semibold text-[var(--color-text-primary)]"
    >
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full resize-none rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[var(--color-primary)]"
    />
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-400">{message}</p>;
}
