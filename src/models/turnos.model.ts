import { db } from "@/src/lib/db";

export type TurnoReservado = {
    horaInicio: string;
};

type Turno = {
    idCancha: number,
    nombreCliente: string,
    telefonoCliente: string,
    emailCliente: string,
    fecha: string,
    horaInicio: string,
    horarioCierre: string
    estado: string
}

export async function getTurnosReservados( idCancha: number, fecha: string, ): Promise<TurnoReservado[]> {
    const query = `
        SELECT "horaInicio"
        FROM "Reserva"
        WHERE id_cancha = $1
            AND "fecha"::date = $2::date
            AND estado != 'Cancelado'
    `;

    const result = await db.query<TurnoReservado>(query, [idCancha, fecha]);

    return result.rows;
}

export async function postTurnosDB(turno: Turno){
    const result = await db.query(`
            INSERT INTO Reserva (id_reserva, id_cancha, nombreCliente, telefonoCliente, emailCliente, fecha, horaInicio, horaFin, estado) 
            VALUES($1, $2, $3, $4, $5, $6, %7, $8, $9)
            RETURNING *;
        `
        ,[turno.idCancha, turno.nombreCliente, turno.telefonoCliente, turno.emailCliente, turno.fecha, turno.horaInicio, turno.horarioCierre, turno.estado],
    )
    if (result.rowCount === 0) {
        throw new Error("No se pudo crear la reserva");
    }

    return result.rows[0];
}