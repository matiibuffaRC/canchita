"use client";

import { FormEvent, useState } from "react";
import { AgendaSeccion } from "./AgendaSeccion";
import { BuscadorEmail } from "./BuscadorEmail";
import { FiltroEstado } from "./FiltroEstado";
import { MensajeVacio } from "./MensajeVacio";
import { separarProximosYAnteriores } from "./agenda";
import { useBuscarTurnos } from "./useBuscarTurnos";
import { obtenerEstadoTurno } from "./utils";

// Re-exportado para no romper imports viejos: import type { ReservaPorEmail } from "./MisTurnos"
export type { ReservaPorEmail } from "./types";

export function MisTurnos() {
    const [email, setEmail] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const { turnos, cargando, error, buscar } = useBuscarTurnos();

    const turnosFiltrados = (turnos ?? []).filter(
        (turno) => !estadoFiltro || obtenerEstadoTurno(turno) === estadoFiltro,
    );
    const { proximos, anteriores } = separarProximosYAnteriores(turnosFiltrados);
    const estadosDisponibles = turnos
        ? [...new Set(turnos.map(obtenerEstadoTurno))]
        : [];

    const buscarTurnos = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEstadoFiltro("");
        await buscar(email);
    };

    return (
        <div className="fadeTop">
            <BuscadorEmail
                email={email}
                cargando={cargando}
                onEmailChange={setEmail}
                onSubmit={buscarTurnos}
            />

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
                    {turnos.length === 0 ? (
                        <MensajeVacio
                            titulo="No encontramos turnos con ese email"
                            texto="Revisá que esté escrito igual que en la reserva e intentá nuevamente."
                        />
                    ) : (
                        <>
                            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <p className="text-sm text-[#243054]/60">
                                    {turnosFiltrados.length}{" "}
                                    {turnosFiltrados.length === 1
                                        ? "turno encontrado"
                                        : "turnos encontrados"}
                                </p>
                                <FiltroEstado
                                    valor={estadoFiltro}
                                    estados={estadosDisponibles}
                                    onChange={setEstadoFiltro}
                                />
                            </div>

                            {turnosFiltrados.length === 0 ? (
                                <MensajeVacio
                                    titulo="No hay turnos con ese estado"
                                    texto="Elegí otro estado para ver tus reservas."
                                />
                            ) : (
                                <>
                                    <AgendaSeccion titulo="Próximos" turnos={proximos} />
                                    <AgendaSeccion titulo="Anteriores" turnos={anteriores} />
                                </>
                            )}
                        </>
                    )}
                </section>
            )}
        </div>
    );
}
