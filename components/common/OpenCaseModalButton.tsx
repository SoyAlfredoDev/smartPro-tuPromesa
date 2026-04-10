"use client";

import { useState } from "react";
import ModalButton from "@/components/common/ModalButton";
import RegisterCaseForm from "@/components/common/RegisterCaseForm";

type Props = {
  label?: string;
  variant?: "primary" | "secondary";
};

export default function OpenCaseModalButton({
  label = "Denunciar mi caso",
  variant = "primary",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* BOTÓN */}
      <button
        onClick={() => setIsOpen(true)}
        className={`px-6 py-3 font-bold uppercase transition rounded-md cursor-pointer
        ${
          variant === "primary"
            ? "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-active))] text-white shadow-[var(--shadow-primary-glow)] hover:brightness-110"
            : "border border-[var(--color-border-strong)] text-white hover:bg-[var(--color-bg-surface)]"
        }`}
      >
        {label}
      </button>

      {/* MODAL */}
      <ModalButton isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterCaseForm
          onSubmitSuccess={() => {
            setIsOpen(false);
          }}
        />
      </ModalButton>
    </>
  );
}
