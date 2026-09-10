import { getTurnosReservados, TurnoReservado, postTurnosDB } from "@/src/models/turnos.model";

type Turno = {
    idCancha: number,
    nombreCliente: string,
    telefonoCliente: string,
    emailCliente: string,
    fecha: string,
    horaInicio: string,
    horaFin: string
    estado: string
}

export async function obtenerTurnosPorCanchaYFecha( idCancha: string, fecha: string, ): Promise<TurnoReservado[]> {
    const idCanchaNum = Number(idCancha);

    if (Number.isNaN(idCanchaNum)) {
        throw new Error("id_cancha inválido");
    }

    const turnos = await getTurnosReservados(idCanchaNum, fecha);
    return turnos;
}

export async function postTurnos (turno: Turno) {
    const result = await postTurnosDB(turno); // Le enviamos un objeto
    return result;
}