"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { ReservaTurnoCard } from "./ReservaTurnoCard";
import { obtenerEstadoTurno } from "./utils";

export type ReservaPorEmail = {
    id_reserva: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: string;
    nombreCancha: string;
    nombrePredio: string;
};

export function MisTurnos() {
    const [email, setEmail] = useState("");
    const [turnos, setTurnos] = useState<ReservaPorEmail[] | null>(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const turnosFiltrados = (turnos ?? []).filter(
        (turno) => !estadoFiltro || obtenerEstadoTurno(turno) === estadoFiltro,
    );
    const estadosDisponibles = turnos
        ? [...new Set(turnos.map(obtenerEstadoTurno))]
        : [];

    const buscarTurnos = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCargando(true);
        setError(null);
        setTurnos(null);

        try {
            const response = await fetch(`/api/turnos/email?email=${encodeURIComponent(email.trim())}`,
                { cache: "no-store" },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message ?? "No se pudieron buscar los turnos.");
            }

            setTurnos(data.turnos);
            setEstadoFiltro("");
        } catch (requestError) {
            setError(
                requestError instanceof Error
                ? requestError.message
                : "No se pudieron buscar los turnos. Probá nuevamente.",
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fadeTop">
            <section className="border-b border-[#243054]/10 pb-6 sm:pb-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#26846B]">
                    Tus reservas
                </p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    Encontrá tus turnos
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#243054]/65">
                    Ingresá el email que usaste al reservar para ver tus turnos
                    registrados.
                </p>

                <form
                    onSubmit={buscarTurnos}
                    className="mt-5 flex flex-col gap-3 sm:flex-row"
                >
                    <label className="sr-only" htmlFor="email-turnos">
                        Email de la reserva
                    </label>
                    <input
                        id="email-turnos"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="tu@email.com"
                        className="min-w-0 flex-1 rounded-lg border border-[#243054]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#26846B] focus:ring-2 focus:ring-[#26846B]/15"
                    />
                    <button
                        type="submit"
                        disabled={cargando}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#243054] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1A2340] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#26846B] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                    >
                        <Search aria-hidden="true" className="h-4 w-4" />
                        {cargando ? "Buscando..." : "Buscar turnos"}
                    </button>
                </form>
            </section>

            {error && (
                <p
                    role="alert"
                    className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                    {error}
                </p>
            )}

            {turnos && (
                <section aria-live="polite" className="pt-6 sm:pt-8">
                {turnos.length > 0 ? (
                    <>
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-baseline justify-between gap-3 sm:justify-start">
                            <h3 className="text-lg font-extrabold">Turnos encontrados</h3>
                            <span className="text-sm text-[#243054]/55">
                                {turnosFiltrados.length}{" "}
                                {turnosFiltrados.length === 1 ? "turno" : "turnos"}
                            </span>
                        </div>
                        <label
                            className="flex flex-col gap-1 text-sm font-bold sm:min-w-52"
                            htmlFor="filtro-estado-turnos"
                        >
                            Filtrar por estado
                            <select
                                id="filtro-estado-turnos"
                                value={estadoFiltro}
                                onChange={(event) => setEstadoFiltro(event.target.value)}
                                className="min-h-11 rounded-lg border border-[#243054]/15 bg-white px-4 font-normal outline-none transition focus:border-[#26846B] focus:ring-2 focus:ring-[#26846B]/15"
                            >
                                <option value="">Todos los estados</option>
                                    {estadosDisponibles.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    {turnosFiltrados.length > 0 ? (
                        <ul className="space-y-3">
                        {turnosFiltrados.map((turno) => (
                            <li key={turno.id_reserva}>
                                <ReservaTurnoCard turno={turno} />
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div className="border-l-4 border-[#26846B] bg-white px-5 py-5">
                            <h3 className="font-extrabold">
                                No hay turnos con ese estado
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-[#243054]/60">
                                Elegí otro estado para ver tus reservas.
                            </p>
                        </div>
                    )}
                    </>
                ) : (
                    <div className="border-l-4 border-[#26846B] bg-white px-5 py-5">
                        <h3 className="font-extrabold">
                            No encontramos turnos con ese email
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-[#243054]/60">
                            Revisá que esté escrito igual que en la reserva e intentá
                            nuevamente.
                        </p>
                    </div>
                )}
                </section>
            )}
        </div>
    );
}
