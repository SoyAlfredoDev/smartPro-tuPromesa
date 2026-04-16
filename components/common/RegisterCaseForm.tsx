"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type CaseFormData = {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  phone: string;
  companyName: string;
  incidentDate: string;
  claimedAmount: string;
  issueDescription: string;
  expectedSolution: string;
  priorCommunication: string;
  claimObjective: string;
  acceptTerms: boolean;
};

type RegisterCaseFormProps = {
  onSubmitSuccess?: (data: CaseFormData) => void;
};

const initialForm: CaseFormData = {
  firstName: "",
  lastName: "",
  rut: "",
  email: "",
  phone: "",
  companyName: "",
  incidentDate: "",
  claimedAmount: "",
  issueDescription: "",
  expectedSolution: "",
  priorCommunication: "",
  claimObjective: "",
  acceptTerms: false,
};

const amountOptions = [
  "Menos de 100 UF",
  "Más de 100 UF",
  "Más de 500 UF",
  "Más de 1.000 UF",
];

const communicationOptions = [
  "Sí, me he comunicado con ellos",
  "No me he comunicado aún",
];

// Variantes de animación para Framer Motion
const formVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function RegisterCaseForm({
  onSubmitSuccess,
}: RegisterCaseFormProps) {
  const [step, setStep] = useState(1);
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

  // Validación por pasos
  function validateStep1() {
    const nextErrors: Partial<Record<keyof CaseFormData, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Ingresa tu nombre.";
    if (!form.lastName.trim()) nextErrors.lastName = "Ingresa tu apellido.";
    if (!form.rut.trim()) nextErrors.rut = "Ingresa tu RUT.";
    if (!form.email.trim()) nextErrors.email = "Ingresa tu correo electrónico.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      nextErrors.email = "Correo no válido.";
    if (!form.phone.trim()) nextErrors.phone = "Ingresa tu teléfono.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep2() {
    const nextErrors: Partial<Record<keyof CaseFormData, string>> = {};
    if (!form.companyName.trim())
      nextErrors.companyName = "Ingresa la empresa contra la que reclamas.";
    if (!form.incidentDate.trim())
      nextErrors.incidentDate = "Ingresa la fecha de los hechos.";
    if (!form.claimedAmount.trim())
      nextErrors.claimedAmount = "Selecciona un rango de precio.";

    if (!form.issueDescription.trim()) {
      nextErrors.issueDescription = "Describe cuál es el problema.";
    } else if (form.issueDescription.trim().length < 30) {
      nextErrors.issueDescription =
        "Por favor, detalla un poco más el problema (mín. 30 caracteres).";
    }

    if (!form.expectedSolution.trim())
      nextErrors.expectedSolution = "Indica qué debe hacer la empresa.";
    if (!form.priorCommunication.trim())
      nextErrors.priorCommunication = "Selecciona una opción.";
    if (!form.claimObjective.trim())
      nextErrors.claimObjective = "Indica qué objetivo esperas lograr.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep3() {
    const nextErrors: Partial<Record<keyof CaseFormData, string>> = {};
    if (!form.acceptTerms) {
      nextErrors.acceptTerms =
        "Debes aceptar las condiciones y el tratamiento de datos para continuar.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // Navegación
  function handleNext() {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateStep3()) return;

    try {
      setIsSubmitting(true);
      // Simulación de envío a la API (800ms)
      await new Promise((resolve) => setTimeout(resolve, 800));

      onSubmitSuccess?.(form);
      setForm(initialForm);
      setStep(1);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl bg-white p-6 sm:p-8">
      {/* Indicador de Progreso (Stepper) */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className={step >= 1 ? "text-red" : "text-gray-400"}>
            1. Datos
          </span>
          <div
            className={`h-px flex-1 mx-4 ${step >= 2 ? "bg-red" : "bg-gray-200"}`}
          />
          <span className={step >= 2 ? "text-red" : "text-gray-400"}>
            2. Reclamo
          </span>
          <div
            className={`h-px flex-1 mx-4 ${step >= 3 ? "bg-red" : "bg-gray-200"}`}
          />
          <span className={step >= 3 ? "text-red" : "text-gray-400"}>
            3. Confirmación
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full text-left overflow-y-auto scrollbar-hide"
      >
        <AnimatePresence mode="wait">
          {/* PASO 1: DATOS PERSONALES */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-dark">
                  Datos personales
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Ingresa tu información de contacto principal.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    error={!!errors.firstName}
                  />
                  <ErrorText message={errors.firstName} />
                </Field>

                <Field>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    error={!!errors.lastName}
                  />
                  <ErrorText message={errors.lastName} />
                </Field>

                <Field>
                  <Label htmlFor="rut">RUT *</Label>
                  <Input
                    id="rut"
                    name="rut"
                    value={form.rut}
                    onChange={handleChange}
                    placeholder="Ej: 12.345.678-9"
                    error={!!errors.rut}
                  />
                  <ErrorText message={errors.rut} />
                </Field>

                <Field>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    error={!!errors.phone}
                  />
                  <ErrorText message={errors.phone} />
                </Field>

                <Field className="md:col-span-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    error={!!errors.email}
                  />
                  <ErrorText message={errors.email} />
                </Field>
              </div>
            </motion.div>
          )}

          {/* PASO 2: INFORMACIÓN DEL RECLAMO */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-dark">
                  Información del reclamo
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Detalla lo ocurrido con la empresa.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <Label htmlFor="companyName">
                    ¿Contra qué empresa reclama? *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Nombre de la empresa"
                    error={!!errors.companyName}
                  />
                  <ErrorText message={errors.companyName} />
                </Field>

                <Field>
                  <Label htmlFor="incidentDate">Fecha de los hechos *</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={form.incidentDate}
                    onChange={handleChange}
                    error={!!errors.incidentDate}
                  />
                  <ErrorText message={errors.incidentDate} />
                </Field>

                <Field>
                  <Label htmlFor="claimedAmount">Precio reclamado *</Label>
                  <Select
                    id="claimedAmount"
                    name="claimedAmount"
                    value={form.claimedAmount}
                    onChange={handleChange}
                    error={!!errors.claimedAmount}
                  >
                    <option value="">Selecciona un rango</option>
                    {amountOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  <ErrorText message={errors.claimedAmount} />
                </Field>

                <Field>
                  <Label htmlFor="priorCommunication">
                    ¿Se ha comunicado previamente? *
                  </Label>
                  <Select
                    id="priorCommunication"
                    name="priorCommunication"
                    value={form.priorCommunication}
                    onChange={handleChange}
                    error={!!errors.priorCommunication}
                  >
                    <option value="">Selecciona una opción</option>
                    {communicationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  <ErrorText message={errors.priorCommunication} />
                </Field>

                <Field className="md:col-span-2">
                  <Label htmlFor="issueDescription">
                    ¿Cuál es el problema? *
                  </Label>
                  <Textarea
                    id="issueDescription"
                    name="issueDescription"
                    value={form.issueDescription}
                    onChange={handleChange}
                    placeholder="Describe detalladamente el incumplimiento..."
                    error={!!errors.issueDescription}
                  />
                  <ErrorText message={errors.issueDescription} />
                </Field>

                <Field className="md:col-span-2">
                  <Label htmlFor="expectedSolution">
                    ¿Qué debe hacer la empresa para solucionarlo? *
                  </Label>
                  <Textarea
                    id="expectedSolution"
                    name="expectedSolution"
                    rows={3}
                    value={form.expectedSolution}
                    onChange={handleChange}
                    placeholder="Ej: Devolución del dinero..."
                    error={!!errors.expectedSolution}
                  />
                  <ErrorText message={errors.expectedSolution} />
                </Field>

                <Field className="md:col-span-2">
                  <Label htmlFor="claimObjective">
                    ¿Qué objetivo espera lograr con su reclamo? *
                  </Label>
                  <Textarea
                    id="claimObjective"
                    name="claimObjective"
                    rows={3}
                    value={form.claimObjective}
                    onChange={handleChange}
                    placeholder="Tu objetivo final al presentar este caso..."
                    error={!!errors.claimObjective}
                  />
                  <ErrorText message={errors.claimObjective} />
                </Field>
              </div>
            </motion.div>
          )}

          {/* PASO 3: CONFIRMACIÓN Y TÉRMINOS */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-dark">
                  Confirmación final
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Revisa tu información y acepta los términos.
                </p>
              </div>

              {/* Resumen de la información */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-2">
                    Datos personales
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">Nombre:</span>{" "}
                      {form.firstName} {form.lastName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">RUT:</span>{" "}
                      {form.rut}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Correo:</span>{" "}
                      {form.email}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Teléfono:
                      </span>{" "}
                      {form.phone}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200" />
                <div>
                  <h3 className="text-sm font-bold text-dark mb-2">
                    Detalle del reclamo
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">
                        Empresa:
                      </span>{" "}
                      {form.companyName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Fecha:</span>{" "}
                      {form.incidentDate}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Monto:</span>{" "}
                      {form.claimedAmount}
                    </p>
                    <p className="sm:col-span-2 mt-1">
                      <span className="font-medium text-gray-800 block mb-1">
                        Problema:
                      </span>{" "}
                      <span className="line-clamp-2 italic">
                        {form.issueDescription}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkbox de términos */}
              <div
                className={`space-y-3 rounded-xl border ${errors.acceptTerms ? "border-red-300 bg-red-50" : "border-[#01c676]/20 bg-[#01c676]/5"} p-5 transition-colors`}
              >
                <CheckboxRow>
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#01c676] rounded border-gray-300"
                  />
                  <div>
                    <Label
                      htmlFor="acceptTerms"
                      className="cursor-pointer text-sm font-medium leading-relaxed text-dark mb-0"
                    >
                      Estoy interesado en ser contactado y autorizo a promesa.cl
                      a enviar y gestionar los datos de mi reclamo con:
                      <ul className="list-disc pl-5 mt-2 mb-3 space-y-1 font-normal text-gray-600">
                        <li>Empresas o instituciones aludidas</li>
                        <li>Periodistas y medios de comunicación</li>
                        <li>ONG para procesos de mediación colectiva</li>
                      </ul>
                      Además, acepto los términos y condiciones del servicio y
                      declaro conocerlos. *
                    </Label>
                    <ErrorText message={errors.acceptTerms} />
                  </div>
                </CheckboxRow>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controles de Navegación */}
        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              ← Anterior
            </button>
          ) : (
            <div /> // Espaciador para alinear el botón 'Siguiente' a la derecha
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-md bg-red px-8 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(1,198,118,0.39)] transition hover:bg-red-hover focus:outline-none focus:ring-2 focus:ring-red-hover"
            >
              Siguiente →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-red px-8 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(1,198,118,0.39)] transition hover:bg-red-hover focus:outline-none focus:ring-2 focus:ring-red-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : "Enviar reclamo"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// --- Subcomponentes de UI ---

type FieldProps = { children: React.ReactNode; className?: string };
function Field({ children, className = "" }: FieldProps) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
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
      className={`mb-1.5 block text-sm font-semibold text-gray-800 ${className}`}
    >
      {children}
    </label>
  );
}

// Interfaces extendidas para incluir la prop "error"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 
      ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-[#01c676] focus:ring-[#01c676]/20"} ${className || ""}`}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}
function Select({ error, className, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:ring-2 
      ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-[#01c676] focus:ring-[#01c676]/20"} ${className || ""}`}
    >
      {props.children}
    </select>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      rows={props.rows || 5}
      className={`w-full resize-none rounded-md border bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 
      ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-[#01c676] focus:ring-[#01c676]/20"} ${className || ""}`}
    />
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs font-medium text-red-500"
    >
      {message}
    </motion.p>
  );
}

function CheckboxRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-start gap-3">{children}</div>;
}
