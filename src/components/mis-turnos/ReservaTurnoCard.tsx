import { Clock3, MapPin, XCircle } from "lucide-react";
import type { ReservaPorEmail } from "./types";
import { obtenerEstadoTurno } from "./utils";

type ReservaTurnoCardProps = {
    turno: ReservaPorEmail;
};

// Borde lateral + badge según estado. El azul #243054 queda para los estados neutros.
const estadoStyles: Record<string, { borde: string; badge: string }> = {
    pendiente: {
        borde: "border-amber-400",
        badge: "border-amber-300 bg-amber-50 text-amber-900",
    },
    confirmado: {
        borde: "border-emerald-500",
        badge: "border-emerald-300 bg-emerald-50 text-emerald-900",
    },
    cancelado: {
        borde: "border-red-400",
        badge: "border-red-200 bg-red-50 text-red-800",
    },
    finalizado: {
        borde: "border-[#243054]/25",
        badge: "border-[#243054]/15 bg-[#243054]/5 text-[#243054]/70",
    },
};

const estadoDefault = estadoStyles.finalizado;

// Solo dibuja el turno. El día lo muestra una sola vez AgendaDia.
export function ReservaTurnoCard({ turno }: ReservaTurnoCardProps) {
    const estado = obtenerEstadoTurno(turno);
    const estilos = estadoStyles[estado.toLowerCase()] ?? estadoDefault;
    const puedeCancelar = ["pendiente", "confirmado"].includes(
        estado.toLowerCase(),
    );

    return (
        <article
            className={`min-w-0 rounded-r-lg border-l-4 bg-white p-4 shadow-sm shadow-[#243054]/5 ${estilos.borde}`}
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="flex items-center gap-2 text-base font-extrabold">
                        <Clock3
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#243054]/50"
                        />
                        {turno.horaInicio.slice(0, 5)} a {turno.horaFin.slice(0, 5)}
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-sm leading-5">
                        <MapPin
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#243054]/45"
                        />
                        <span className="min-w-0">
                            <span className="block wrap-break-words font-bold">
                                {turno.nombreCancha}
                            </span>
                            <span className="block wrap-break-words text-xs text-[#243054]/60">
                                {turno.nombrePredio}
                            </span>
                        </span>
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span
                        className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${estilos.badge}`}
                    >
                        {estado}
                    </span>
                    {puedeCancelar && (
                        <button
                            type="button"
                            disabled
                            title="La cancelación estará disponible próximamente"
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 opacity-60 disabled:cursor-not-allowed"
                        >
                            <XCircle aria-hidden="true" className="h-4 w-4" />
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
