import crypto from "crypto";
import { getTurnosPorEmail as getTurnosPorEmailDB, getTurnosReservados, ReservaPorEmail, TurnoReservado, postTurnosDB } from "@/src/models/turnos.model";
import { enviarEmailConfirmacion } from "../service/emailService"
import { confirmarTurnoService } from "../service/turnoService";

type Turno = {
    idCancha: number;
    nombreCliente: string;
    telefonoCliente: string;
    emailCliente: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: string;
};

export async function obtenerTurnosPorCanchaYFecha( idCancha: string, fecha: string ): Promise<TurnoReservado[]> {
    const idCanchaNum = Number(idCancha);

    if (Number.isNaN(idCanchaNum)) {
        throw new Error("id_cancha inválido");
    }

    const turnos = await getTurnosReservados(idCanchaNum, fecha);
    return turnos;
}

export async function obtenerTurnosPorEmail(email: string): Promise<ReservaPorEmail[]> {
    return getTurnosPorEmailDB(email);
}

export async function postTurnos(turno: Turno) { // Con esta función almacenamos en la DB el turno pendiente
    const token = crypto.randomBytes(32).toString("hex");
    const result = await postTurnosDB(turno, token); // Le enviamos un objeto

    const link =
        `${process.env.NEXT_PUBLIC_APP_URL}` +
        `/confirmar-turno?token=${token}`;

    await enviarEmailConfirmacion(
        turno.emailCliente,
        link
    );

    return result;
}



export async function confirmarTurnoController(token: string) {
    const reserva =
        await confirmarTurnoService(token);

    return {
        message: "Turno confirmado correctamente",
        reserva
    };
}