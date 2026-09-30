"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type Props = {
    predio?: string;
    cancha: string;
    fecha: string;   // ej: "Miércoles 14 de Agosto"
    horario: string; // ej: "20:00 - 21:00"
    precio?: string; // ej: "$15.000"
    qr?: ReactNode;  // el QR / código de ingreso, cuando lo tengas
};

function Fila({ label, children, destacado }: { label: string; children: ReactNode; destacado?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-4 py-1.5">
            <dt className="text-xs text-[#243054]/50">{label}</dt>
            <dd className={destacado ? "text-xl font-extrabold" : "text-sm font-extrabold"}>
                {children}
            </dd>
        </div>
    );
}

export function TurnoConfirmado({ predio, cancha, fecha, horario, precio }: Props) {
    const router = useRouter();

    return (
        <section className="flex flex-col items-center px-2 pt-6 pb-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#243054]/10">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#243054"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M21 12a9 9 0 1 1-4.5-7.8" />
                    <path d="M8 12l3 3 9-9" />
                </svg>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-[#243054]">
                ¡Turno Confirmado!
            </h2>
            <p className="mt-1 text-sm font-semibold text-[#243054]/70">
                Tu reserva está lista para jugar
            </p>

            <div className="mt-8 w-full rounded-2xl border border-[#243054]/10 bg-white p-5 text-left shadow-sm">
                <h3 className="text-sm font-extrabold text-[#243054]/60">
                    Detalles de la reserva
                </h3>

                <dl className="mt-3 text-[#243054]">
                    {predio && <Fila label="Predio">{predio}</Fila>}
                    <Fila label="Cancha">{cancha}</Fila>
                    <Fila label="Fecha">{fecha}</Fila>
                    <Fila label="Horario">{horario}</Fila>
                    {precio && <Fila label="Precio" destacado>{precio}</Fila>}
                </dl>

                <hr className="my-4 border-[#243054]" />

                <p className="text-center text-xs text-[#243054]/50">
                    Código de ingreso al complejo
                </p>
            </div>

            <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-6 w-full cursor-pointer rounded-xl bg-[#243054] px-5 py-4 text-sm font-extrabold text-white transition-colors hover:bg-[#1c2644] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243054]"
            >
                Volver al Inicio
            </button>
        </section>
    );
}