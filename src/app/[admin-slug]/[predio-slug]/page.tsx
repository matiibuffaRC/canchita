'use client';

// Import dependencies
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

type Cancha = {
    id_cancha: number,
    id_predio: number,
    duracion: number,
    nombre: string,
    precio: number,
    tipo: string
}

// Tags y miniatura a mostrar según el tipo de cancha que llega del back.
const TIPO_INFO: Record<string, { techo: string; superficie: string }> = {
    futbol5: { techo: "Techada", superficie: "Césped Sintético" },
    futbol7: { techo: "Al aire libre", superficie: "Césped Sintético" },
    padel: { techo: "Techada", superficie: "Cristal y Césped" },
};

function page() {
    const { "predio-slug": slug } = useParams<{ "predio-slug": string }>();
    const [canchas, setCanchas] = useState<Cancha[]>([]);

    const nombrePredio = slug
        ? (() => {
            const texto = decodeURIComponent(slug).replace(/-/g, " ");
            return texto.charAt(0).toUpperCase() + texto.slice(1);
        })()
        : "";

    useEffect(()=>{
        if (!slug) return;
        const fetchCanchas = async() => {
            try{
                const result = await fetch(`/api/predios/${slug}/canchas`);
                if (!result.ok) {
                    const body = await result.json().catch(() => null);

                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener las canchas del predio",
                    );
                }
                const data = await result.json();
                console.log("Esto se obtuvo: ", data);
                setCanchas(data.canchas)
            }catch(error){
                console.log("Ocurrió un error obteniendo las canchas del predio: ", error)
            }finally{
                console.log("Poné el componente de carga")
            }
        }
        fetchCanchas().catch((error: Error) => console.error(error.message));
    },[slug])


    return (
        <div className="min-h-screen bg-[#F5F6F8]">
            <header className="flex items-center justify-center border-b border-black/5 bg-white px-4 py-3">
                <button type="button" aria-label="Volver" className="absolute left-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#1A1D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-[17px] font-semibold text-[#1A1D29]">
                    {nombrePredio}
                </h1>
            </header>

            <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
                <div className="relative h-44 overflow-hidden rounded-2xl sm:h-56 lg:h-64">
                    <StadiumHero />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-[13px] font-medium text-white">
                        Abierto hasta las 00:00
                    </span>
                </div>
            </div>

            <section className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
                <h2 className="mb-3 text-[19px] font-bold text-[#1A1D29]">Canchas disponibles</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {canchas.map((cancha) => {
                        const info = TIPO_INFO[cancha.tipo];
                        return (
                            <article
                                key={cancha.id_cancha}
                                className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                            >
                                <div className="relative h-36 w-full overflow-hidden sm:h-40">
                                    <CanchaThumbnail tipo={cancha.tipo} />
                                </div>

                                <div className="px-4 py-3.5">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-[16px] font-bold text-[#1A1D29]">{cancha.nombre}</h3>
                                        <span className="whitespace-nowrap text-[16px] font-bold text-[#1D5FD6]">
                                            ${Math.round(cancha.precio).toLocaleString("es-AR", { maximumFractionDigits: 0 })}/h
                                        </span>
                                    </div>

                                    {info && (
                                        <div className="mt-2.5 flex flex-wrap gap-2">
                                            <span className="rounded-full bg-[#F1F2F5] px-3 py-1 text-[12.5px] font-medium text-[#5B5F6B]">
                                                {info.techo}
                                            </span>
                                            <span className="rounded-full bg-[#E7F0FE] px-3 py-1 text-[12.5px] font-medium text-[#1D5FD6]">
                                                {info.superficie}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    )
}

function StadiumHero() {
    return (
        <svg viewBox="0 0 400 176" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="176" fill="#0F1220" />
            <rect x="0" y="118" width="400" height="58" fill="#12162A" />
            <path d="M0 118 L60 96 L120 118 Z" fill="#1B2036" />
            <path d="M280 118 L340 92 L400 118 Z" fill="#1B2036" />
            <rect x="150" y="70" width="100" height="48" rx="4" fill="#1C2138" />
            <rect x="164" y="86" width="72" height="32" fill="#0B0E1A" />
            <rect x="188" y="98" width="24" height="20" fill="#F2B94D" />
        </svg>
    );
}

function CanchaThumbnail({ tipo }: { tipo: string }) {
    if (tipo === "padel") {
        return (
            <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="58" fill="#0F1424" />
                <rect y="58" width="400" height="102" fill="#2782B5" />
                <g stroke="#F4FAFD" strokeWidth="2" fill="none">
                    <rect x="26" y="70" width="348" height="78" />
                    <line x1="200" y1="70" x2="200" y2="148" />
                    <line x1="26" y1="109" x2="374" y2="109" />
                </g>
            </svg>
        );
    }

    const techada = tipo === "futbol5";
    return (
        <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="70" fill={techada ? "#241C0F" : "#0B0E1A"} />
            <rect y="70" width="400" height="90" fill="#256B31" />
            {techada && <path d="M0 70 L60 44 L120 70 Z M280 70 L340 40 L400 70 Z" fill="#1B2036" />}
            <g stroke="#EAF4EA" strokeWidth="2" fill="none">
                <line x1="0" y1="112" x2="400" y2="112" />
                <circle cx="200" cy="112" r="26" />
                <rect x="0" y="92" width="46" height="40" />
                <rect x="354" y="92" width="46" height="40" />
            </g>
        </svg>
    );
}

export default page