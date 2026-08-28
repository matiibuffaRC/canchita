"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

type Predio = {
    id: number,
    nombre: string,
    direccion: string,
    numero: string
}

// Ícono de cancha genérica — placeholder hasta que exista una foto real por predio
function FotoGenerica() {
    return (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-[#2f7a4f] via-[#1f5c3a] to-[#123322]">
            <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 h-full w-full text-white/25" >
                <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </div>
    );
}

function PinIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[#243054]/50">
            <path d="M8 1.5c-2.6 0-4.7 2.1-4.7 4.7 0 3.5 4.7 8.3 4.7 8.3s4.7-4.8 4.7-8.3c0-2.6-2.1-4.7-4.7-4.7Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="8" cy="6.2" r="1.6" fill="currentColor" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[#243054]/50">
            <path d="M3.5 2.5h2l1 3-1.5 1a8 8 0 0 0 4.5 4.5l1-1.5 3 1v2c0 .8-.7 1.5-1.5 1.4C6.9 13.4 2.6 9.1 2.1 3.9 2 3.1 2.7 2.5 3.5 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-[#243054]/40">
            <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Lo que esperamos recibir del backend
function Page() {

    const { "admin-slug": slug } = useParams<{ "admin-slug": string }>();
    const [predios, setPredios] = useState<Predio[]>([])

    useEffect(() => {
        if (!slug) return;
        const peticionFetch = async () => {
            const result = await fetch(`/api/admins/${slug}/predio`);

            if (!result.ok) {
                const body = await result.json().catch(() => null);

                throw new Error(
                    body?.message ??
                        "Ha ocurrido un error al obtener los predios del administrador",
                );
            }

            const data = await result.json();
            setPredios(data.predios);
        };

        peticionFetch().catch((error: Error) => console.error(error.message));

    }, [slug]);

    // Función para imprimir los predios
    const printPredios = () => {
        return predios.map((predio) => {
            return (
                <div key={predio.id} className="flex w-full items-center gap-4 rounded-xl border border-[#243054]/10 bg-white p-4 shadow-sm transition hover:border-[#243054]/20 hover:shadow-md" >
                    <FotoGenerica />
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-base font-extrabold text-[#161B2E]">
                            {predio.nombre}
                        </h2>

                        <p className="mt-.5 flex items-center gap-1.5 text-xs text-[#243054]/60">
                            <PinIcon />
                            <span className="truncate">{predio.direccion}</span>
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#243054]/60">
                            <PhoneIcon />
                            <span className="truncate">{predio.telefono}</span>
                        </p>
                    </div>

                    <button aria-label={`Gestionar ${predio.nombre}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-[#243054]/5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]" >
                        <ChevronIcon />
                    </button>
                </div>
            )
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] p-5 text-[#243054] nunito">

            <div className="w-full max-w-3xl">
                {/* Header con logo — sacá este bloque si ya tenés uno compartido en el layout */}
                <div className="mb-6 flex items-center gap-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ">
                        <Image src="/icons/IconPNG.png" alt="Canchita" width={40} height={40} />
                    </div>
                    <span className="text-xl font-extrabold text-[#161B2E]">Canchita</span>
                </div>

                <div className="mb-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-[#161B2E]">
                        ¿Donde jugamos hoy?
                    </h1>
                    <p className="text-[#243054]/60">
                        {predios.length === 1 ? "Predio disponible" : "Predios disponibles"}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {printPredios()}
                </div>

            </div>

        </div>
    );
}

export default Page;