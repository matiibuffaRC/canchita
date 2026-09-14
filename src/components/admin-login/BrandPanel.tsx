import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BrandPanelProps {
    facilityName: string;
    title: string;
    description: string;
}

const slots = [
    { time: "08:00", court: "Cancha 1", status: "Libre" },
    { time: "09:30", court: "Cancha 2", status: "Reservada" },
    { time: "11:00", court: "Cancha 3", status: "Reservada" },
];

export default function BrandPanel({ facilityName, title, description }: BrandPanelProps) {
    return (
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#2b3763] via-[#1c2544] to-[#12162a] px-8 pb-16 pt-8 md:min-h-[calc(100vh-3rem)] md:rounded-[28px] md:pb-10">
            {/* Grafismo de cancha, puramente decorativo */}
            <svg viewBox="0 0 400 400" className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 opacity-[0.06]" fill="none" aria-hidden="true">
                <rect x="20" y="20" width="360" height="360" rx="4" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="70" stroke="white" strokeWidth="3" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="4" fill="white" />
            </svg>

            {/* Fila superior: logo del predio + volver al sitio */}
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="/icons/IconPNG.png" alt="" width={28} height={28} />
                    <span className="text-sm font-bold tracking-wide text-white/80">{facilityName}</span>
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/15"
                >
                    Volver al sitio
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            {/* Hero: vista rápida de turnos del día */}
            <div className="relative z-10 my-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm md:my-0">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/50">Hoy</span>
                    <span className="text-xs text-white/40">{slots.length} turnos</span>
                </div>
                <ul className="space-y-2">
                    {slots.map((slot) => (
                        <li
                            key={slot.time + slot.court}
                            className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 text-sm"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-12 font-semibold text-white/90">{slot.time}</span>
                                <span className="text-white/60">{slot.court}</span>
                            </div>
                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    slot.status === "Libre"
                                        ? "bg-emerald-400/15 text-emerald-300"
                                        : "bg-white/10 text-white/60"
                                }`}
                            >
                                {slot.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Título y descripción */}
            <div className="relative z-10 max-w-sm">
                <h1 className="mb-2 text-3xl font-bold leading-[1.1] text-white md:text-4xl">{title}</h1>
                <p className="hidden text-sm leading-relaxed text-white/60 md:block">{description}</p>
            </div>

            {/* Curva de transición hacia el blanco, solo en mobile */}
            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full md:hidden"
                aria-hidden="true"
            >
                <path
                    d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L0,120Z"
                    fill="#ffffff"
                />
            </svg>
        </div>
    );
}