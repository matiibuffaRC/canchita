import {
  getTurnosPorEmail as getTurnosPorEmailDB,
  getTurnosReservados,
  ReservaPorEmail,
  TurnoReservado,
  postTurnosDB,
  turnoSolapadoDB,
} from "@/src/models/turnos.model";

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

export async function obtenerTurnosPorCanchaYFecha(
  idCancha: string,
  fecha: string,
): Promise<TurnoReservado[]> {
  const idCanchaNum = Number(idCancha);

  if (Number.isNaN(idCanchaNum)) {
    throw new Error("id_cancha inválido");
  }

  const turnos = await getTurnosReservados(idCanchaNum, fecha);
  return turnos;
}

export async function obtenerTurnosPorEmail(
  email: string,
): Promise<ReservaPorEmail[]> {
  return getTurnosPorEmailDB(email);
}

export async function postTurnos(turno: Turno) {
  const result = await postTurnosDB(turno); // Le enviamos un objeto
  return result;
}

export async function turnoSolapado({
  idCancha,
  fecha,
  horaInicio,
  horaFin,
}: {
  idCancha: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
}) {
  return turnoSolapadoDB({
    idCancha,
    fecha,
    horaInicio,
    horaFin,
  });
}
