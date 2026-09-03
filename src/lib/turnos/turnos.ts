import dayjs, { Dayjs, } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export type Turno = {
    inicio: string; // "HH:mm"
    fin: string;    // "HH:mm"
    disponible: boolean;
};

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
    duracionMinutos: number,
    turnosOcupados: string[] = []
): Turno[] {
    const [horaApertura, minApertura] = horarioApertura.split(':').map(Number);
    const [horaCierre, minCierre] = horarioCierre.split(':').map(Number);

    let cursor = fecha.hour(horaApertura).minute(minApertura).second(0);
    const cierre = fecha.hour(horaCierre).minute(minCierre).second(0);

    const turnos: Turno[] = [];

    while (cursor.add(duracionMinutos, 'minute').isSameOrBefore(cierre)) {
        const inicio = cursor.format('HH:mm');
        const fin = cursor.add(duracionMinutos, 'minute').format('HH:mm');

        turnos.push({
            inicio,
            fin,
            disponible: !turnosOcupados.includes(inicio),
        });

        cursor = cursor.add(duracionMinutos, 'minute');
    }

    return turnos;
}