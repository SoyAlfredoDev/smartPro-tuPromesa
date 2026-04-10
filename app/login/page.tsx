"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError("Credenciales incorrectas");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg-base)] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-white/10 w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Login Admin</h1>

        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 bg-black/20 border border-white/10 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-3 bg-black/20 border border-white/10 rounded"
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button className="w-full bg-[var(--color-primary)] py-3 rounded font-bold">
          Ingresar
        </button>
      </form>
    </main>
  );
}
