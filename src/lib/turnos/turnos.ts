import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export type Turno = {
  inicio: string; // "HH:mm"
  fin: string; // "HH:mm"
  disponible: boolean;
};

function minutosDesdeMedianoche(horario: string): number | null {
  const coincidencia = horario.match(/(?:^|T|\s)(\d{1,2}):(\d{2})/);
  const hora = coincidencia ? Number(coincidencia[1]) : NaN;
  const minuto = coincidencia ? Number(coincidencia[2]) : NaN;

  if (
    !Number.isInteger(hora) ||
    !Number.isInteger(minuto) ||
    hora < 0 ||
    hora > 23 ||
    minuto < 0 ||
    minuto > 59
  ) {
    return null;
  }

  return hora * 60 + minuto;
}

/**
 * Genera los turnos posibles para un día según horario de apertura/cierre y duración.
 * @param fecha Día seleccionado
 * @param horarioApertura "HH:mm:ss" o "HH:mm"
 * @param horarioCierre "HH:mm:ss" o "HH:mm"
 * @param duracionMinutos duración de cada turno en minutos
 * @param turnosOcupados lista de horarios de inicio ya reservados, ej. ["10:00", "14:30"]
 */
export function generarTurnos(
  fecha: Dayjs,
  horarioApertura: string,
  horarioCierre: string,
  duracionMinutos: number | string,
  turnosOcupados: string[] = [],
): Turno[] {
  const apertura = minutosDesdeMedianoche(horarioApertura);
  const cierre = minutosDesdeMedianoche(horarioCierre);
  const duracion = Number(duracionMinutos);

  if (
    apertura === null ||
    cierre === null ||
    !Number.isFinite(duracion) ||
    duracion <= 0 ||
    cierre === apertura
  ) {
    return [];
  }

  let cursor = fecha.startOf("day").add(apertura, "minute");
  const finDeLaJornada = fecha
    .startOf("day")
    .add(cierre, "minute")
    .add(cierre < apertura ? 1 : 0, "day");

  const turnos: Turno[] = [];

  while (cursor.add(duracion, "minute").isSameOrBefore(finDeLaJornada)) {
    const inicio = cursor.format("HH:mm");
    const fin = cursor.add(duracion, "minute").format("HH:mm");

    turnos.push({
      inicio,
      fin,
      disponible: !turnosOcupados.includes(inicio),
    });

    cursor = cursor.add(duracion, "minute");
  }

  return turnos;
}
