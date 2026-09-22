import { db } from "@/src/lib/db";

export type TurnoReservado = {
  id_reserva: number;
  id_cancha: number;
  nombreCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
};

export type ProximaReserva = TurnoReservado & {
  nombreCancha: string;
  nombrePredio: string;
};

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

export async function getTurnosReservados(
  idCancha: number,
  fecha: string,
): Promise<TurnoReservado[]> {
  const query = `
        SELECT id_reserva, id_cancha, "nombreCliente", "telefonoCliente", "emailCliente", "fecha", "horaInicio", "horaFin", estado
        FROM "Reserva"
        WHERE id_cancha = $1
            AND "fecha"::date = $2::date
            AND estado != 'Cancelado'
    `;

  const result = await db.query<TurnoReservado>(query, [idCancha, fecha]);

  return result.rows;
}

export async function getProximasReservasPorAdmin(
  adminSlug: string,
): Promise<ProximaReserva[]> {
  const query = `
    SELECT r.id_reserva, r.id_cancha, r."nombreCliente", r."telefonoCliente",
      r."emailCliente", r."fecha", r."horaInicio", r."horaFin", r.estado,
      c.nombre AS "nombreCancha", p.nombre AS "nombrePredio"
    FROM "Reserva" r
    INNER JOIN "Cancha" c ON c.id_cancha = r.id_cancha
    INNER JOIN "Predio" p ON p.id_predio = c.id_predio
    INNER JOIN "Administrador" a ON a.id_administrador = p.id_administrador
    WHERE a.slug = $1
      AND r.estado != 'Cancelado'
      AND (r."fecha"::date > CURRENT_DATE
        OR (r."fecha"::date = CURRENT_DATE AND r."horaFin"::time >= CURRENT_TIME))
    ORDER BY r."fecha"::date ASC, r."horaInicio"::time ASC
    LIMIT 3;
  `;

  const result = await db.query<ProximaReserva>(query, [adminSlug]);
  return result.rows;
}

export async function postTurnosDB(turno: Turno) {
  const result = await db.query(
    `
            INSERT INTO "Reserva" (id_cancha, "nombreCliente", "telefonoCliente", "emailCliente", "fecha", "horaInicio", "horaFin", "estado")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `,
    [
      turno.idCancha,
      turno.nombreCliente,
      turno.telefonoCliente,
      turno.emailCliente,
      turno.fecha,
      turno.horaInicio,
      turno.horaFin,
      turno.estado,
    ],
  );
  if (result.rowCount === 0) {
    throw new Error("No se pudo crear la reserva");
  }

  return result.rows[0];
}
