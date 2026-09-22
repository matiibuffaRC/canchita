import { UserRound } from "lucide-react";

import type { Cancha } from "../SideBar";
import { estadoStyles, getEstado, toMinutes } from "./utils";
import type { Reserva } from "./types";

type ScheduleGridProps = {
    canchas: Cancha[];
    reservas: Reserva[];
    date: string;
    firstHour: number;
    lastHour: number;
};

export function ScheduleGrid({ canchas, reservas, date, firstHour, lastHour }: ScheduleGridProps) {
    const hourHeight = 72;
    const columnCount = Math.max(canchas.length, 1);

    return (
        <div className="relative" style={{ height: `${Math.max(lastHour - firstHour, 1) * hourHeight}px` }} >
            {Array.from({ length: Math.max(lastHour - firstHour, 1) }, (_, index) => {
                const hour = firstHour + index;
                return (
                    <div key={hour} className="absolute inset-x-0 grid border-b border-[#243054]/10" style={{ top: `${index * hourHeight}px`, height: `${hourHeight}px`, gridTemplateColumns: `72px repeat(${columnCount}, minmax(180px, 1fr))`, }} >
                        <div className="p-2 text-xs text-[#243054]/50">
                            {String(hour).padStart(2, "0")}:00
                        </div>
                        {canchas.map((cancha) => (
                            <div
                                key={cancha.id_cancha}
                                className="border-l border-[#243054]/10"
                            />
                        ))}
                    </div>
                );
            })}

            {canchas.map((cancha, columnIndex) =>
                reservas
                .filter((reserva) => reserva.id_cancha === cancha.id_cancha)
                .map((reserva) => {
                    const top =
                    ((toMinutes(reserva.horaInicio) - firstHour * 60) / 60) *
                    hourHeight;
                    const height = Math.max(
                        ((toMinutes(reserva.horaFin) - toMinutes(reserva.horaInicio)) /
                            60) *
                            hourHeight,
                        42,
                    );
                    const style = estadoStyles[getEstado(reserva, date)];

                    return (
                    <div key={reserva.id_reserva} className={`absolute overflow-hidden rounded-lg border p-2 text-xs shadow-sm ${style.className}`} style={{ top: `${top}px`, height: `${height}px`, left: `calc(72px + ${columnIndex} * (100% - 72px) / ${canchas.length} + 6px)`, width: `calc((100% - 72px) / ${canchas.length} - 12px)`, }} >
                        <p className="font-extrabold">
                            {reserva.horaInicio.slice(0, 5)} -{" "}
                            {reserva.horaFin.slice(0, 5)}
                        </p>
                        <p className="mt-1 flex items-center gap-1 truncate">
                            <UserRound className="size-3" />
                            {reserva.nombreCliente || "Sin nombre"}
                        </p>
                        <p className="mt-1 font-bold">{style.label}</p>
                    </div>
                    );
                }),
            )}
        </div>
    );
}
