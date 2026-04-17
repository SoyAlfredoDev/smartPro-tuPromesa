"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type CaseFormData = {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  phone: string;
  inmobiliariaId: string;
  incidentDate: string;
  claimedAmount: string;
  issueDescription: string;
  expectedSolution: string;
  priorCommunication: string;
  claimObjective: string;
  acceptTerms: boolean;
  declaracionVeracidad: boolean;
};

type Inmobiliaria = {
  _id: string;
  name: string;
  rut?: string;
  direccion?: string;
  contacto?: string;
};

type NewInmobiliariaData = {
  rut: string;
  name: string;
  direccion: string;
  contacto: string;
};

type RegisterCaseFormProps = {
  onSubmitSuccess?: (data: CaseFormData) => void;
};

// ─── Constants ──────────────────────────────────────────────────────────────

const STEP_LABELS = [
  "Datos personales",
  "Inmobiliaria",
  "Detalle del reclamo",
  "Confirmación",
];

const initialForm: CaseFormData = {
  firstName: "",
  lastName: "",
  rut: "",
  email: "",
  phone: "",
  inmobiliariaId: "",
  incidentDate: "",
  claimedAmount: "",
  issueDescription: "",
  expectedSolution: "",
  priorCommunication: "",
  claimObjective: "",
  acceptTerms: false,
  declaracionVeracidad: false,
};

const initialNewInmobiliaria: NewInmobiliariaData = {
  rut: "",
  name: "",
  direccion: "",
  contacto: "",
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

// ─── Main Component ─────────────────────────────────────────────────────────

export default function RegisterCaseForm({
  onSubmitSuccess,
}: RegisterCaseFormProps) {
  const [form, setForm] = useState<CaseFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CaseFormData | string, string>>
  >({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Inmobiliarias state
  const [inmobiliarias, setInmobiliarias] = useState<Inmobiliaria[]>([]);
  const [loadingInmobiliarias, setLoadingInmobiliarias] = useState(false);
  const [showNewInmobiliaria, setShowNewInmobiliaria] = useState(false);
  const [newInmobiliaria, setNewInmobiliaria] = useState<NewInmobiliariaData>(
    initialNewInmobiliaria,
  );
  const [newInmobiliariaErrors, setNewInmobiliariaErrors] = useState<
    Partial<Record<keyof NewInmobiliariaData, string>>
  >({});
  const [creatingInmobiliaria, setCreatingInmobiliaria] = useState(false);

  // ─── Fetch inmobiliarias ────────────────────────────────────────────

  const fetchInmobiliarias = useCallback(async () => {
    setLoadingInmobiliarias(true);
    try {
      const res = await fetch("/api/inmobiliarias");
      const data = await res.json();
      setInmobiliarias(Array.isArray(data) ? data : []);
    } catch {
      setInmobiliarias([]);
    } finally {
      setLoadingInmobiliarias(false);
    }
  }, []);

  useEffect(() => {
    fetchInmobiliarias();
  }, [fetchInmobiliarias]);

  // ─── Handlers ───────────────────────────────────────────────────────

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

  function handleNewInmobiliariaChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewInmobiliaria((prev) => ({ ...prev, [name]: value }));
    setNewInmobiliariaErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // ─── Validation per step ────────────────────────────────────────────

  function validateStep(s: number): Partial<Record<string, string>> {
    const nextErrors: Partial<Record<string, string>> = {};

    if (s === 0) {
      if (!form.firstName.trim()) nextErrors.firstName = "Ingresa tu nombre.";
      if (!form.lastName.trim()) nextErrors.lastName = "Ingresa tu apellido.";
      if (!form.rut.trim()) nextErrors.rut = "Ingresa tu RUT.";
      if (!form.email.trim())
        nextErrors.email = "Ingresa tu correo electrónico.";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        nextErrors.email = "Correo no válido.";
      if (!form.phone.trim()) nextErrors.phone = "Ingresa tu teléfono.";
    }

    if (s === 1) {
      if (!form.inmobiliariaId.trim())
        nextErrors.inmobiliariaId = "Selecciona una inmobiliaria.";
      if (!form.declaracionVeracidad)
        nextErrors.declaracionVeracidad =
          "Debes declarar que la información es verídica.";
    }

    if (s === 2) {
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
    }

    if (s === 3) {
      if (!form.acceptTerms) {
        nextErrors.acceptTerms =
          "Debes aceptar las condiciones y el tratamiento de datos.";
      }
    }

    return nextErrors;
  }

  function validateNewInmobiliaria(): Partial<
    Record<keyof NewInmobiliariaData, string>
  > {
    const errs: Partial<Record<keyof NewInmobiliariaData, string>> = {};
    if (!newInmobiliaria.rut.trim())
      errs.rut = "Ingresa el RUT de la inmobiliaria.";
    if (!newInmobiliaria.name.trim())
      errs.name = "Ingresa el nombre de la inmobiliaria.";
    if (!newInmobiliaria.direccion.trim())
      errs.direccion = "Ingresa la dirección de la inmobiliaria.";
    if (!newInmobiliaria.contacto.trim())
      errs.contacto = "Ingresa un medio de contacto.";
    return errs;
  }

  // ─── Navigation ─────────────────────────────────────────────────────

  function handleNext() {
    const stepErrors = validateStep(step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function goToStep(s: number) {
    // Solo permite ir a pasos ya completados o al actual
    if (s <= step) {
      setStep(s);
    }
  }

  // ─── Create Inmobiliaria ────────────────────────────────────────────

  async function handleCreateInmobiliaria() {
    const errs = validateNewInmobiliaria();
    setNewInmobiliariaErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingInmobiliaria(true);
    try {
      const res = await fetch("/api/inmobiliarias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInmobiliaria),
      });
      const data = await res.json();

      if (data.ok && data.id) {
        // Refresh list & select the new one
        await fetchInmobiliarias();
        setForm((prev) => ({ ...prev, inmobiliariaId: data.id }));
        setNewInmobiliaria(initialNewInmobiliaria);
        setShowNewInmobiliaria(false);
        setErrors((prev) => ({ ...prev, inmobiliariaId: "" }));
      }
    } catch {
      setNewInmobiliariaErrors({
        name: "Error al crear la inmobiliaria. Inténtalo de nuevo.",
      });
    } finally {
      setCreatingInmobiliaria(false);
    }
  }

  // ─── Submit ─────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateStep(3);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const res = await fetch("/api/case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          rut: form.rut,
          email: form.email,
          phone: form.phone,
          inmobiliariaId: form.inmobiliariaId,
          incidentDate: form.incidentDate,
          claimedAmount: form.claimedAmount,
          issueDescription: form.issueDescription,
          expectedSolution: form.expectedSolution,
          priorCommunication: form.priorCommunication,
          claimObjective: form.claimObjective,
          acceptTerms: form.acceptTerms,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitError(data.error || "Ocurrió un error al enviar el reclamo.");
        return;
      }

      setSubmitSuccess(true);
      setStep(4); // <- Cambiamos al paso 4 (Vista de éxito)
      // ELIMINADO: onSubmitSuccess?.(form); -> Esto cerraba el modal inmediatamente. Lo pasamos al botón de "Entendido" en el paso 4.
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Selected inmobiliaria name ─────────────────────────────────────

  const selectedInmobiliariaName = useMemo(() => {
    const found = inmobiliarias.find((i) => i._id === form.inmobiliariaId);
    return found?.name || "—";
  }, [inmobiliarias, form.inmobiliariaId]);

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full space-y-6 p-1 z-[100]"
    >
      {/* Ocultamos el Header y el Stepper si estamos en la vista de éxito (step === 4) */}
      {step < 4 && (
        <>
          {/* Header */}
          <div>
            <h2 className="text-2xl font-extrabold text-dark">
              Registrar mi reclamo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-dark">
              Completa este formulario detallando tu situación para gestionar el
              incumplimiento.
            </p>
          </div>

          {/* Stepper */}
          <Stepper
            currentStep={step}
            labels={STEP_LABELS}
            onStepClick={goToStep}
          />
        </>
      )}

      {/* ─── STEP 0 : Datos Personales ───────────────────────────────── */}
      {step === 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <Label htmlFor="firstName">Nombre *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Tu nombre"
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
              placeholder="12.345.678-9"
            />
            <ErrorText message={errors.rut} />
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

          <Field className="md:col-span-2">
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
        </div>
      )}

      {/* ─── STEP 1 : Inmobiliaria ───────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-5">
          <Field>
            <Label htmlFor="inmobiliariaId">Selecciona la inmobiliaria *</Label>
            <Select
              id="inmobiliariaId"
              name="inmobiliariaId"
              value={form.inmobiliariaId}
              onChange={handleChange}
              disabled={loadingInmobiliarias}
            >
              <option value="">
                {loadingInmobiliarias
                  ? "Cargando inmobiliarias..."
                  : "Selecciona una inmobiliaria"}
              </option>
              {inmobiliarias.map((inm) => (
                <option key={inm._id} value={inm._id}>
                  {inm.name}
                </option>
              ))}
            </Select>
            <ErrorText message={errors.inmobiliariaId} />
          </Field>

          {/* Toggle crear nueva */}
          <button
            type="button"
            onClick={() => setShowNewInmobiliaria((prev) => !prev)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-red transition hover:text-[#01a863] cursor-pointer"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#01c676]/40 text-xs">
              {showNewInmobiliaria ? "−" : "+"}
            </span>
            {showNewInmobiliaria
              ? "Cancelar registro"
              : "¿No encuentras tu inmobiliaria? Regístrala aquí"}
          </button>

          {/* Sub-formulario nueva inmobiliaria */}
          {showNewInmobiliaria && (
            <div className="space-y-4 rounded-[var(--radius-md)] border border-[#01c676]/20 bg-[#021f41]/40 p-5">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                Registrar nueva inmobiliaria
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <Label htmlFor="newInm-rut">RUT de la inmobiliaria *</Label>
                  <Input
                    id="newInm-rut"
                    name="rut"
                    value={newInmobiliaria.rut}
                    onChange={handleNewInmobiliariaChange}
                    placeholder="76.123.456-7"
                  />
                  <ErrorText message={newInmobiliariaErrors.rut} />
                </Field>

                <Field>
                  <Label htmlFor="newInm-name">Nombre *</Label>
                  <Input
                    id="newInm-name"
                    name="name"
                    value={newInmobiliaria.name}
                    onChange={handleNewInmobiliariaChange}
                    placeholder="Nombre de la inmobiliaria"
                  />
                  <ErrorText message={newInmobiliariaErrors.name} />
                </Field>

                <Field>
                  <Label htmlFor="newInm-direccion">Dirección *</Label>
                  <Input
                    id="newInm-direccion"
                    name="direccion"
                    value={newInmobiliaria.direccion}
                    onChange={handleNewInmobiliariaChange}
                    placeholder="Av. Ejemplo 1234, Santiago"
                  />
                  <ErrorText message={newInmobiliariaErrors.direccion} />
                </Field>

                <Field>
                  <Label htmlFor="newInm-contacto">Medio de contacto *</Label>
                  <Input
                    id="newInm-contacto"
                    name="contacto"
                    value={newInmobiliaria.contacto}
                    onChange={handleNewInmobiliariaChange}
                    placeholder="Email, teléfono o red social"
                  />
                  <ErrorText message={newInmobiliariaErrors.contacto} />
                </Field>
              </div>

              <button
                type="button"
                onClick={handleCreateInmobiliaria}
                disabled={creatingInmobiliaria}
                className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-red px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(1,198,118,0.39)] transition hover:bg-[#01a863] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creatingInmobiliaria ? "Creando..." : "Registrar inmobiliaria"}
              </button>
            </div>
          )}

          {/* Checkbox veracidad */}
          <div className="space-y-3 rounded-[var(--radius-md)] border border-[#01c676]/20 bg-white p-5">
            <CheckboxRow>
              <input
                id="declaracionVeracidad"
                name="declaracionVeracidad"
                type="checkbox"
                checked={form.declaracionVeracidad}
                onChange={handleChange}
                className="mt-1 h-5 w-5 shrink-0 rounded-full accent-[#01c676] cursor-pointer text-red"
              />
              <div>
                <Label
                  htmlFor="declaracionVeracidad"
                  className="cursor-pointer text-sm font-medium leading-relaxed "
                >
                  Declaro que la información proporcionada es verídica y
                  correcta. *
                </Label>
                <ErrorText message={errors.declaracionVeracidad} />
              </div>
            </CheckboxRow>
          </div>
        </div>
      )}

      {/* ─── STEP 2 : Detalle del Reclamo ────────────────────────────── */}
      {step === 2 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <Label htmlFor="incidentDate">Fecha de los hechos *</Label>
            <Input
              id="incidentDate"
              name="incidentDate"
              type="date"
              value={form.incidentDate}
              onChange={handleChange}
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
            >
              <option value="">Selecciona un rango</option>
              {amountOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <ErrorText message={errors.claimedAmount} />
          </Field>

          <Field className="md:col-span-2">
            <Label htmlFor="issueDescription">¿Cuál es el problema? *</Label>
            <Textarea
              id="issueDescription"
              name="issueDescription"
              value={form.issueDescription}
              onChange={handleChange}
              placeholder="Describe detalladamente el incumplimiento o problema..."
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
              placeholder="Ej: Devolución del dinero, entrega inmediata, compensación..."
            />
            <ErrorText message={errors.expectedSolution} />
          </Field>

          <Field>
            <Label htmlFor="priorCommunication">
              ¿Se ha comunicado previamente con la empresa? *
            </Label>
            <Select
              id="priorCommunication"
              name="priorCommunication"
              value={form.priorCommunication}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              {communicationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <ErrorText message={errors.priorCommunication} />
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
            />
            <ErrorText message={errors.claimObjective} />
          </Field>
        </div>
      )}

      {/* ─── STEP 3 : Confirmación ───────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-5">
          {/* Resumen */}
          <div className="space-y-4 rounded-[var(--radius-md)] border border-white/10 bg-[#021f41]/40 p-5">
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Resumen de tu reclamo
            </h3>

            <SummarySection title="Datos personales">
              <SummaryRow
                label="Nombre"
                value={`${form.firstName} ${form.lastName}`}
              />
              <SummaryRow label="RUT" value={form.rut} />
              <SummaryRow label="Email" value={form.email} />
              <SummaryRow label="Teléfono" value={form.phone} />
            </SummarySection>

            <SummarySection title="Inmobiliaria">
              <SummaryRow
                label="Inmobiliaria"
                value={selectedInmobiliariaName}
              />
            </SummarySection>

            <SummarySection title="Detalle del reclamo">
              <SummaryRow
                label="Fecha de los hechos"
                value={form.incidentDate}
              />
              <SummaryRow label="Precio reclamado" value={form.claimedAmount} />
              <SummaryRow label="Problema" value={form.issueDescription} />
              <SummaryRow
                label="Solución esperada"
                value={form.expectedSolution}
              />
              <SummaryRow
                label="Comunicación previa"
                value={form.priorCommunication}
              />
              <SummaryRow
                label="Objetivo del reclamo"
                value={form.claimObjective}
              />
            </SummarySection>
          </div>

          {/* Checkbox Terms */}
          <div className="space-y-3 rounded-[var(--radius-md)] border border-white/10 bg-white p-5">
            <CheckboxRow>
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={handleChange}
                className="mt-1 h-5 w-5 shrink-0 accent-[#01c676] cursor-pointer"
              />
              <div>
                <Label
                  htmlFor="acceptTerms"
                  className="cursor-pointer text-sm font-medium leading-relaxed"
                >
                  Estoy interesado en ser contactado y autorizo a promesa.cl a
                  enviar y gestionar los datos de mi reclamo con:
                  <ul className="list-disc pl-5 mt-2 mb-3 space-y-1 font-normal text-dark">
                    <li>Empresas o instituciones aludidas</li>
                    <li>Periodistas y medios de comunicación</li>
                    <li>ONG para procesos de mediación colectiva</li>
                  </ul>
                  <span className="text-red">
                    Además, acepto los términos y condiciones del servicio y
                    declaro conocerlos. *
                  </span>
                </Label>
                <ErrorText message={errors.acceptTerms} />
              </div>
            </CheckboxRow>
          </div>

          {submitError && (
            <p className="text-sm font-medium text-red-400">{submitError}</p>
          )}
        </div>
      )}

      {/* ─── STEP 4 : Success (Quinta Vista) ────────────────────────────── */}
      {step === 4 && (
        <div className="relative z-10 w-full space-y-6 py-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#01c676]/20">
            <svg
              className="h-8 w-8 text-[#01c676]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-dark">
            ¡Reclamo enviado exitosamente!
          </h2>
          <p className="text-sm leading-relaxed text-dark max-w-md mx-auto">
            Tu caso ha sido registrado correctamente. Nuestro equipo lo revisará
            y nos pondremos en contacto contigo a la brevedad.
          </p>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => onSubmitSuccess?.(form)}
              className="inline-flex items-center justify-center rounded-md bg-red px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(215,38,46,0.39)] transition hover:bg-red-hover cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* ─── Navigation buttons ──────────────────────────────────────── */}
      {/* Ocultamos los botones de navegación en el paso de éxito */}
      {step < 4 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
            {step < 3
              ? "Los campos marcados con * son obligatorios."
              : "Revisa toda la información antes de enviar."}
          </p>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)] transition hover:bg-white/5 cursor-pointer"
              >
                Atrás
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-md bg-red px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(215,38,46,0.39)] transition hover:bg-red-hover cursor-pointer"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                disabled={!form.acceptTerms || isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-red px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_0_rgba(215,38,46,0.39)] transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar reclamo"}
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

// ─── Stepper Component ────────────────────────────────────────────────────

type StepperProps = {
  currentStep: number;
  labels: string[];
  onStepClick: (step: number) => void;
};

function Stepper({ currentStep, labels, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center gap-1">
      {labels.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={label}
            className="flex items-center flex-1 last:flex-initial"
          >
            {/* Step circle + label */}
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className={`flex flex-col items-center gap-1.5 transition cursor-pointer group min-w-[60px] ${
                isActive || isCompleted ? "" : "opacity-40"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-red text-white shadow-red"
                    : isCompleted
                      ? "bg-dark/20 t ext-dark border border-dark/40"
                      : "border border-dark text-dark"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={`text-[10px] font-semibold leading-tight text-center hidden sm:block ${
                  isActive
                    ? "text-dark font-bold"
                    : isCompleted
                      ? "text-dark" // avanzado
                      : "text-gray-light" // pendiente
                }`}
              >
                {label}
              </span>
            </button>

            {/* Connector line */}
            {index < labels.length - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={`h-[2px] w-full rounded-full transition-all ${
                    index < currentStep ? "bg-red" : "bg-gray-light"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Summary sub-components ──────────────────────────────────────────────

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wider text-dark">
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <span className="text-sm font-semibold text-dark sm:w-40 shrink-0 text-start">
        {label}:
      </span>
      <span className="text-sm text-dark break-words">{value || "—"} </span>
    </div>
  );
}

// ─── UI sub-components (preserved from original) ────────────────────────

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
      className={`mb-2 block text-sm font-semibold text-dark ${className}`}
    >
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-sm border border-white/10 bg-white px-4 py-3 text-sm text-dark outline-none transition placeholder:text-gray-light focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-sm border border-white/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-red"
    >
      {props.children}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows || 6}
      className="w-full resize-none rounded-sm border border-white/10 bg-white px-4 py-3 text-sm text-dark outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[#01c676] focus:ring-2 focus:ring-[#01c676]/20"
    />
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-xs font-medium text-red">{message}</p>;
}

function CheckboxRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-start gap-3 ">{children}</div>;
}
