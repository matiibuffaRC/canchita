
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BrandPanelProps {
    facilityName: string;
    title: string;
    description: string;
}

const slots = [
    { time: "18:00", court: "Cancha 1", status: "Libre" },
    { time: "19:30", court: "Cancha 2", status: "Pendiente" },
    { time: "21:00", court: "Cancha 3", status: "Confirmada" },
];

export default function BrandPanel({
    facilityName,
    title,
    description,
}: BrandPanelProps) {
    return (
        <div className="relative flex flex-col justify-between overflow-hidden bg-linear-to-b from-[#2b3763] via-[#1c2544] to-[#12162a] px-5 pb-16 pt-6 sm:px-8 sm:pt-8 md:min-h-[calc(100vh-3rem)] md:rounded-[28px] md:px-8 md:pb-10">

            {/* Grafismo de cancha, puramente decorativo */}
            <svg viewBox="0 0 400 400" className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 opacity-[0.06]" fill="none" aria-hidden="true" >
                <rect x="20" y="20" width="360" height="360" rx="4" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="70" stroke="white" strokeWidth="3" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="4" fill="white" />
            </svg>

            {/* Fila superior */}
            <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center">
                    <Image src="/icons/IconPNG.png" alt="" width={35} height={35} className="shrink-0" />

                    <span className="truncate text-xl font-bold tracking-wide text-white/80 sm:text-2xl">
                        {facilityName}
                    </span>
                </div>

                <Link href="/" className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/15 sm:px-3.5 sm:text-sm" >
                        Volver al inicio
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            {/* Hero: vista rápida de turnos del día */}
            <div className="relative z-10 my-6 w-full rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-sm sm:p-4 md:my-0 md:px-10 md:py-5">

                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wide text-white/50">
                        Hoy
                    </span>

                    <span className="text-xs font-bold text-white/40">
                        {slots.length} turnos
                    </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                    {slots.map((slot, index) => (
                        <li key={slot.time + slot.court} className={`items-center justify-between rounded-xl bg-white/4 px-3 py-3 text-sm sm:px-4 ${ index === 2 ? "hidden md:flex" : "flex" }`} >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="w-12 shrink-0 font-semibold text-white/90">
                                    {slot.time}
                                </span>

                                <span className="truncate text-white/60">
                                    {slot.court}
                                </span>
                            </div>

                            <span className={`ml-2 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${ slot.status === "Libre" ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60" }`} >
                                {slot.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Título y descripción */}
            <div className="relative z-10 max-w-sm">
                <h1 className="mb-2 text-3xl font-bold leading-[1.1] text-white md:text-4xl">
                    {title}
                </h1>

                <p className="hidden text-sm leading-relaxed text-white/60 md:block">
                    {description}
                </p>
            </div>

            {/* Curva de transición hacia el blanco, solo en mobile */}
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full md:hidden" aria-hidden="true" >
                <path d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L0,120Z" fill="#ffffff" />
            </svg>
        </div>
    );
}
