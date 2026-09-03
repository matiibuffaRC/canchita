import { db } from "@/src/lib/db";

export type TurnoReservado = {
    horaInicio: string;
};

export async function getTurnosReservados(
    idCancha: number,
    fecha: string, // "YYYY-MM-DD"
): Promise<TurnoReservado[]> {
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