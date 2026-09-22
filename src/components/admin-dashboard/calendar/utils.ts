import type { CalendarMetrics, EstadoTurno, Reserva } from "./types";

export const estadoStyles: Record<
  EstadoTurno,
  { label: string; className: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "border-amber-300 bg-amber-50 text-amber-900",
  },
  confirmado: {
    label: "Confirmado",
    className: "border-emerald-300 bg-emerald-50 text-emerald-900",
  },
  finalizado: {
    label: "Finalizado",
    className: "border-slate-300 bg-slate-100 text-slate-700",
  },
};

export function toMinutes(time: string) {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);
  return hours * 60 + minutes;
}

export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function getEstado(reserva: Reserva, selectedDate: string): EstadoTurno {
  const estado = reserva.estado.toLowerCase();
  if (selectedDate < getToday()) return "finalizado";
  if (
    new Date(`${selectedDate}T${reserva.horaFin.slice(0, 5)}:00`) <= new Date()
  ) {
    return "finalizado";
  }
  return estado.includes("confirm") ? "confirmado" : "pendiente";
}

export function getCalendarMetrics(
  reservas: Reserva[],
  date: string,
): CalendarMetrics {
  const estados = reservas.map((reserva) => getEstado(reserva, date));
  return {
    pendientes: estados.filter((estado) => estado === "pendiente").length,
    confirmados: estados.filter((estado) => estado === "confirmado").length,
    finalizados: estados.filter((estado) => estado === "finalizado").length,
  };
}

export function getScheduleHours(
  canchas: { horario_apertura?: string; horario_cierre?: string }[],
) {
  const openings = canchas
    .map((cancha) =>
      cancha.horario_apertura ? toMinutes(cancha.horario_apertura) : null,
    )
    .filter(
      (opening): opening is number =>
        opening !== null && Number.isFinite(opening),
    );
  const closings = canchas
    .map((cancha) =>
      cancha.horario_cierre ? toMinutes(cancha.horario_cierre) : null,
    )
    .filter(
      (closing): closing is number =>
        closing !== null && Number.isFinite(closing),
    );

  const earliestOpening = openings.length > 0 ? Math.min(...openings) : 8 * 60;
  const latestClosing = closings.length > 0 ? Math.max(...closings) : 22 * 60;

  return {
    firstHour: Math.floor(earliestOpening / 60),
    lastHour: Math.ceil(latestClosing / 60),
  };
}
