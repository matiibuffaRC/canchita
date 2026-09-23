"use client";

import { useEffect, useState } from "react";
import { CalendarClock, MapPin, UserRound } from "lucide-react";

import type { Reserva } from "../calendar/types";

type UpcomingReservation = Reserva & {
    nombreCancha: string;
    nombrePredio: string;
};

type UpcomingReservationsProps = {
    adminSlug: string;
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
    }).format(new Date(date.includes("T") ? date : `${date}T00:00:00`));
}

export function UpcomingReservations({ adminSlug }: UpcomingReservationsProps) {
    const [reservas, setReservas] = useState<UpcomingReservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await fetch(`/api/admins/${adminSlug}/reservas`);
                if (!response.ok) throw new Error("No se pudieron cargar las reservas");
                const data = (await response.json()) as {
                reservas: UpcomingReservation[];
                };
                setReservas(data.reservas);
            } catch {
                setReservas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
    }, [adminSlug]);

    return (
        <section className="rounded-xl border border-[#243054]/10 bg-white p-4 shadow-sm h-full">
            <div className="mb-3 flex items-center justify-between gap-2 text-[#243054]">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#243054]/50">
                        Mirá lo que sigue
                    </p>
                    <h2 className="font-extrabold text-[#161b2e]">
                        Próximas actividades
                    </h2>
                </div>
                <CalendarClock className="size-5" />
            </div>
            {loading ? (
                <p className="text-sm text-[#243054]/55">Cargando reservas...</p>
            ) : reservas.length === 0 ? (
                <p className="text-sm text-[#243054]/55">No hay próximas reservas.</p>
            ) : (
                <div className="space-y-3">
                {reservas.map((reserva) => (
                    <article key={reserva.id_reserva} className="border-b border-gray-300 p-2 py-3 flex gap-5 items-center justify-between" >
                        <div className="flex flex-row items-center gap-5">
                            <div className="flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#243054]/65">
                            <span>
                                {formatDate(reserva.fecha)}
                            </span>
                            <span>
                                {reserva.horaInicio.slice(0, 5)} hs
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <p className="mt-1 truncate text-sm font-extrabold text-[#161b2e]">
                                {reserva.nombreCancha}
                            </p>
                            <p className="mt-1 flex items-center gap-1 truncate text-xs text-[#243054]/60">
                                <MapPin className="size-3" />
                                {reserva.nombrePredio}
                            </p>
                        </div>
                        </div>
                        <div className={`${reserva.estado === "Confirmado" ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-amber-300 bg-amber-50 text-amber-900"} px-3 py-2 rounded-3xl`}>
                            <p className="text-xs font-extrabold">
                                {reserva.estado === "Confirmado" ? ( "Confirmada" ) : ("Pendiente") }
                            </p>
                        </div>
                    </article>
                ))}
                </div>
            )}
        </section>
    );
}
