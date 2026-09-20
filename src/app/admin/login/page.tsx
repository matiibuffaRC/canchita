"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLogin from "@/src/components/admin-login/AdminLogin";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    setErrorMessage(null);
    // console.log(email + " | " + password);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await res.json();
      if (!data.admin?.slug) {
        throw new Error("La cuenta no tiene un identificador válido");
      }

      sessionStorage.setItem("canchita-admin-slug", data.admin.slug);
      router.push("/admin/dashboard");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "No pudimos iniciar sesión",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AdminLogin
      isLoading={isLoading}
      errorMessage={errorMessage}
      onSubmit={handleLogin}
    />
  );
}
