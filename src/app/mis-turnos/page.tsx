"use client";

import { Header } from "@/src/components/header/userPages/Header";
import { MisTurnos } from "@/src/components/mis-turnos/MisTurnos";

export default function Page() {
  return (
    <div className="nunito flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054]">
      <Header titulo="Mis turnos" />
      <main className="w-full max-w-3xl px-4 py-6 sm:px-5 sm:py-8">
        <MisTurnos />
      </main>
    </div>
  );
}
