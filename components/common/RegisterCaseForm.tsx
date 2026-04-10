"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type CaseFormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  realEstateCompany: string;
  projectName: string;
  issueType: string;
  reservationDate: string;
  estimatedLoss: string;
  caseDescription: string;
  hasDocuments: boolean;
  acceptTerms: boolean;
};

type RegisterCaseFormProps = {
  onSubmitSuccess?: (data: CaseFormData) => void;
};

const initialForm: CaseFormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  realEstateCompany: "",
  projectName: "",
  issueType: "",
  reservationDate: "",
  estimatedLoss: "",
  caseDescription: "",
  hasDocuments: false,
  acceptTerms: false,
};

const issueOptions = [
  "Retraso en entrega",
  "Cambio de condiciones",
  "Alza de precio",
  "Incumplimiento contractual",
  "Problemas con devolución",
  "Falta de respuesta",
  "Otro",
];

export default function RegisterCaseForm({
  onSubmitSuccess,
}: RegisterCaseFormProps) {
  const [form, setForm] = useState<CaseFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CaseFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof CaseFormData, string>> = {};

    if (!form.fullName.trim())
      nextErrors.fullName = "Ingresa tu nombre completo.";
    if (!form.email.trim()) nextErrors.email = "Ingresa tu correo.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      nextErrors.email = "Correo no válido.";
    if (!form.phone.trim()) nextErrors.phone = "Ingresa tu teléfono.";
    if (!form.realEstateCompany.trim()) {
      nextErrors.realEstateCompany = "Ingresa la inmobiliaria.";
    }
    if (!form.projectName.trim())
      nextErrors.projectName = "Ingresa el proyecto.";
    if (!form.issueType.trim()) nextErrors.issueType = "Selecciona un motivo.";
    if (!form.caseDescription.trim()) {
      nextErrors.caseDescription = "Cuéntanos brevemente lo ocurrido.";
    }
    if (form.caseDescription.trim().length < 30) {
      nextErrors.caseDescription =
        "Describe el caso con un poco más de detalle.";
    }
    if (!form.acceptTerms) {
      nextErrors.acceptTerms = "Debes aceptar el tratamiento de datos.";
    }

    return nextErrors;
  }

  const isFormValid = useMemo(() => {
    return (
      form.fullName.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.trim() &&
      form.realEstateCompany.trim() &&
      form.projectName.trim() &&
      form.issueType.trim() &&
      form.caseDescription.trim().length >= 30 &&
      form.acceptTerms
    );
  }, [form]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      // Reemplaza esta parte luego por tu fetch real
      await new Promise((resolve) => setTimeout(resolve, 800));

      onSubmitSuccess?.(form);
      setForm(initialForm);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6 p-1"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
          Registrar mi caso
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          Completa este formulario para visibilizar tu situación y evaluar
          posibles acciones colectivas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <Label htmlFor="fullName">Nombre completo *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Tu nombre completo"
          />
          <ErrorText message={errors.fullName} />
        </Field>

        <Field>
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
          <ErrorText message={errors.email} />
        </Field>

        <Field>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
          />
          <ErrorText message={errors.phone} />
        </Field>

        <Field>
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Ej: Santiago"
          />
        </Field>

        <Field>
          <Label htmlFor="realEstateCompany">Inmobiliaria *</Label>
          <Input
            id="realEstateCompany"
            name="realEstateCompany"
            value={form.realEstateCompany}
            onChange={handleChange}
            placeholder="Nombre de la inmobiliaria"
          />
          <ErrorText message={errors.realEstateCompany} />
        </Field>

        <Field>
          <Label htmlFor="projectName">Proyecto inmobiliario *</Label>
          <Input
            id="projectName"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Nombre del proyecto"
          />
          <ErrorText message={errors.projectName} />
        </Field>

        <Field>
          <Label htmlFor="issueType">Motivo principal *</Label>
          <Select
            id="issueType"
            name="issueType"
            value={form.issueType}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            {issueOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <ErrorText message={errors.issueType} />
        </Field>

        <Field>
          <Label htmlFor="reservationDate">
            Fecha aproximada de promesa / reserva
          </Label>
          <Input
            id="reservationDate"
            name="reservationDate"
            type="date"
            value={form.reservationDate}
            onChange={handleChange}
          />
        </Field>

        <Field className="md:col-span-2">
          <Label htmlFor="estimatedLoss">
            Monto estimado comprometido o perdido
          </Label>
          <Input
            id="estimatedLoss"
            name="estimatedLoss"
            value={form.estimatedLoss}
            onChange={handleChange}
            placeholder="Ej: $5.000.000"
          />
        </Field>

        <Field className="md:col-span-2">
          <Label htmlFor="caseDescription">Describe tu caso *</Label>
          <Textarea
            id="caseDescription"
            name="caseDescription"
            value={form.caseDescription}
            onChange={handleChange}
            placeholder="Explica qué ocurrió, qué te prometieron, qué incumplimiento hubo y si has recibido respuestas."
          />
          <ErrorText message={errors.caseDescription} />
        </Field>
      </div>

      <div className="space-y-3 rounded-[var(--radius-md)] border border-white/10 bg-black/20 p-4">
        <CheckboxRow>
          <input
            id="hasDocuments"
            name="hasDocuments"
            type="checkbox"
            checked={form.hasDocuments}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
          />
          <Label
            htmlFor="hasDocuments"
            className="cursor-pointer text-sm font-medium"
          >
            Tengo documentos o respaldos relacionados con el caso.
          </Label>
        </CheckboxRow>

        <CheckboxRow>
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={form.acceptTerms}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
          />
          <div>
            <Label
              htmlFor="acceptTerms"
              className="cursor-pointer text-sm font-medium"
            >
              Acepto el tratamiento de mis datos para revisar y visibilizar mi
              caso. *
            </Label>
            <ErrorText message={errors.acceptTerms} />
          </div>
        </CheckboxRow>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
          Los campos marcados con * son obligatorios.
        </p>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-active))] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[var(--shadow-primary-glow)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar caso"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  children: React.ReactNode;
  className?: string;
};

function Field({ children, className = "" }: FieldProps) {
  return <div className={className}>{children}</div>;
}

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

function Label({ children, htmlFor, className = "" }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-2 block text-sm font-semibold text-[var(--color-text-primary)] ${className}`}
    >
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(215,38,46,0.18)]"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(215,38,46,0.18)]"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={6}
      className="w-full resize-none rounded-[var(--radius-md)] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(215,38,46,0.18)]"
    />
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs font-medium text-[var(--color-primary)]">
      {message}
    </p>
  );
}

function CheckboxRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-start gap-3">{children}</div>;
}
