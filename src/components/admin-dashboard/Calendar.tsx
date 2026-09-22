"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";

import type { Cancha, SidebarSelection } from "./SideBar";
import { MetricCard } from "./calendar/MetricCard";
import { ScheduleGrid } from "./calendar/ScheduleGrid";
import { getCalendarMetrics, getScheduleHours, getToday } from "./calendar/utils";
import type { Reserva } from "./calendar/types";

function Calendar({ selection }: { selection: SidebarSelection | null }) {
    const [date, setDate] = useState(getToday);
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canchas = useMemo<Cancha[]>(
        () =>
            selection
                ? selection.tipo === "cancha" && selection.cancha
                ? [selection.cancha]
                : selection.predio.canchas
                : [],
        [selection],
    );

    useEffect(() => {
        if (canchas.length === 0) return;

        const fetchReservas = async () => {
            setLoading(true);
            setError(null);
            try {
                const responses = await Promise.all( canchas.map((cancha) => fetch(`/api/turnos?id_cancha=${cancha.id_cancha}&fecha=${date}`), ), );
                if (responses.some((response) => !response.ok)) {
                    throw new Error("No se pudieron obtener los turnos del calendario");
                }
                const data = await Promise.all( responses.map( (response) => response.json() as Promise<{ turnos: Reserva[] }>, ), );
                setReservas(data.flatMap((item) => item.turnos));
            } catch (requestError) {
                setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudieron cargar los turnos",
                );
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    }, [date, selection, canchas]);

    const { firstHour, lastHour } = useMemo(
        () => getScheduleHours(canchas),
        [canchas],
    );
    const metrics = getCalendarMetrics(reservas, date);

    if (!selection) {
        return (
            <section className="flex min-h-[calc(100vh-3.5rem)] flex-1 items-center justify-center p-6 text-[#243054]/60">
                Cargando el primer predio...
            </section>
        );
    }

    return (
        <section className="min-h-full min-w-0 w-full bg-[#f4f6f9] p-4 md:p-7 md:py-0 nunito">
            <div className="mx-auto max-w-375">
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-[#243054]/55">
                            Cronograma
                        </p>
                        <h2 className="text-2xl font-extrabold text-[#161b2e] md:text-3xl">
                            {selection.tipo === "cancha"
                                ? selection.cancha?.nombre
                                : selection.predio.nombre}
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#243054]/60">
                            <MapPin className="size-4" />
                            {selection.predio.nombre}
                        </p>
                    </div>
                    <label className="flex items-center gap-2 rounded-lg border border-[#243054]/10 bg-white px-3 py-2 text-sm font-semibold text-[#243054] shadow-sm">
                        <CalendarDays className="size-4" />
                        <span className="sr-only">Fecha del calendario</span>
                        <input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="bg-transparent outline-none"
                        />
                    </label>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    <MetricCard label="Turnos" value={reservas.length} icon={<Clock3 />} />
                    <MetricCard label="Pendientes" value={metrics.pendientes} color="text-amber-700" icon={<Clock3 />} />
                    <MetricCard label="Confirmados" value={metrics.confirmados} color="text-emerald-700" icon={<CheckCircle2 />} className="col-span-2 md:col-span-1" />
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#243054]/65">
                    <span className="flex items-center gap-1">
                        <i className="size-2 rounded-full bg-amber-400" />
                        Pendiente
                    </span>
                    <span className="flex items-center gap-1">
                        <i className="size-2 rounded-full bg-emerald-500" />
                        Confirmado
                    </span>
                    <span className="flex items-center gap-1">
                        <i className="size-2 rounded-full bg-slate-400" />
                        Finalizado
                    </span>
                </div>
                {error && (
                    <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div className="overflow-x-auto rounded-xl border border-[#243054]/10 bg-white shadow-sm">
                    <div className="min-w-160">
                        <div className="grid border-b border-[#243054]/10" style={{ gridTemplateColumns: `72px repeat(${Math.max(canchas.length, 1)}, minmax(180px, 1fr))`, }} >
                            <div className="p-3 text-xs font-bold text-[#243054]/50">
                                Hora
                            </div>
                            {canchas.map((cancha) => (
                                <div key={cancha.id_cancha} className="border-l border-[#243054]/10 p-3 text-sm font-extrabold text-[#161b2e]" >
                                    {cancha.nombre}
                                </div>
                            ))}
                        </div>
                        {loading ? (
                            <div className="p-10 text-center text-sm text-[#243054]/60">
                                Cargando turnos...
                            </div>
                        ) : (
                        <ScheduleGrid canchas={canchas} reservas={reservas} date={date} firstHour={firstHour} lastHour={lastHour} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Calendar;
