import { CalendarDays, Clock3, MapPin, XCircle } from "lucide-react";
import type { ReservaPorEmail } from "./MisTurnos";
import { obtenerEstadoTurno } from "./utils";

type ReservaTurnoCardProps = {
    turno: ReservaPorEmail;
};

const estadoStyles: Record<string, string> = {
    pendiente: "border-amber-300 bg-amber-50 text-amber-900",
    confirmado: "border-emerald-300 bg-emerald-50 text-emerald-900",
    cancelado: "border-red-200 bg-red-50 text-red-800",
};

function formatearFecha(fecha: string) {
    const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);
    return new Intl.DateTimeFormat("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(anio, mes - 1, dia));
}

export function ReservaTurnoCard({ turno }: ReservaTurnoCardProps) {
    const estado = obtenerEstadoTurno(turno);
    const estadoClass =
        estadoStyles[estado.toLowerCase()] ??
        "border-[#243054]/15 bg-[#F4F6F9] text-[#243054]/75";
    const puedeCancelar =
        ["pendiente", "confirmado"].includes(estado.toLowerCase()) &&
        estado.toLowerCase() !== "finalizado";

    return (
        <article className={`${estado === "Confirmado" ? "border-emerald-300" : (estado === "Pendiente" ? "border-amber-300" : (estado === "Finalizado" ? "border-gray-300" : "border-red-200"))} border-l-3 border-[#243054]/10 bg-white p-4 shadow-sm shadow-[#243054]/5 sm:p-5`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex items-start gap-3">
                        <CalendarDays
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#26846B]"
                        />
                        <div className="min-w-0">
                            <h4 className="wrap-break-word font-extrabold capitalize">
                                {formatearFecha(turno.fecha)}
                            </h4>
                            <p className="mt-1 flex items-center gap-2 text-sm text-[#243054]/65">
                                <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0" />
                                <span>
                                    {turno.horaInicio.slice(0, 5)} a {turno.horaFin.slice(0, 5)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-start gap-3 sm:ml-8">
                        <MapPin
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#243054]/45"
                        />
                        <p className="min-w-0 text-sm leading-5">
                            <span className="block font-bold">{turno.nombreCancha}</span>
                            <span className="text-[#243054]/60 text-xs">{turno.nombrePredio}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end   h-26">
                    <span className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${estadoClass}`} >
                        {estado}
                    </span>
                    {puedeCancelar && (
                        <button
                            type="button"
                            disabled
                            title="La cancelación estará disponible próximamente"
                            className="inline-flex min-h-5 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 opacity-60 disabled:cursor-not-allowed"
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
