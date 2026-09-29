import type { ReservaPorEmail } from "./MisTurnos";

export function obtenerEstadoTurno(
  turno: Pick<ReservaPorEmail, "estado" | "fecha" | "horaFin">,
) {
  const estado = turno.estado.trim();
  const estadoNormalizado = estado.toLowerCase();

  if (estadoNormalizado === "cancelado") return "Cancelado";
  if (estadoNormalizado === "finalizado") return "Finalizado";

  const fechaFin = new Date(
    `${turno.fecha.slice(0, 10)}T${turno.horaFin.slice(0, 5)}:00`,
  );
  if (fechaFin <= new Date()) return "Finalizado";
  if (estadoNormalizado.includes("confirm")) return "Confirmado";
  if (estadoNormalizado.includes("pend")) return "Pendiente";

  return estado;
}
