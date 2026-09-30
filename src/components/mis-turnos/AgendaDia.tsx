import { ReservaTurnoCard } from "./ReservaTurnoCard";
import { parsearFecha } from "./agenda";
import type { ReservaPorEmail } from "./types";

// Muestra el día una sola vez y, al lado, todos los turnos de esa fecha.
export function AgendaDia({
    fecha,
    turnos,
}: {
    fecha: string;
    turnos: ReservaPorEmail[];
}) {
    const date = parsearFecha(fecha);
    const diaSemana = new Intl.DateTimeFormat("es-AR", { weekday: "short" })
        .format(date)
        .replace(".", "");
    const fechaCompleta = new Intl.DateTimeFormat("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(date);

    return (
        <div className="grid grid-cols-[3.25rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
            <div className="pt-3 text-center" aria-hidden="true">
                <p className="text-2xl font-extrabold leading-none sm:text-3xl">
                    {date.getDate()}
                </p>
                <p className="mt-1 text-xs font-bold capitalize text-[#243054]/55">
                    {diaSemana}
                </p>
            </div>
            <div className="min-w-0">
                <h4 className="sr-only">{fechaCompleta}</h4>
                <ul className="space-y-3">
                    {turnos.map((turno) => (
                        <li key={turno.id_reserva}>
                            <ReservaTurnoCard turno={turno} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
