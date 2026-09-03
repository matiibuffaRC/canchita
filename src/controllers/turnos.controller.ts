import { getTurnosReservados, TurnoReservado } from "@/src/models/turnos.model";

export async function obtenerTurnosPorCanchaYFecha( idCancha: string, fecha: string, ): Promise<TurnoReservado[]> {
    const idCanchaNum = Number(idCancha);

    if (Number.isNaN(idCanchaNum)) {
        throw new Error("id_cancha inválido");
    }

    const turnos = await getTurnosReservados(idCanchaNum, fecha);
    return turnos;
}