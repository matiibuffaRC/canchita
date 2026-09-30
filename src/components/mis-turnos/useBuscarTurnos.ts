"use client";

import { useState } from "react";
import type { ReservaPorEmail } from "./types";

export function useBuscarTurnos() {
    const [turnos, setTurnos] = useState<ReservaPorEmail[] | null>(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buscar = async (email: string) => {
        setCargando(true);
        setError(null);
        setTurnos(null);

        try {
            const response = await fetch(
                `/api/turnos/email?email=${encodeURIComponent(email.trim())}`,
                { cache: "no-store" },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message ?? "No se pudieron buscar los turnos.");
            }

            setTurnos(data.turnos);
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

    return { turnos, cargando, error, buscar };
}
