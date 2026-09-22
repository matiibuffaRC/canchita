import type { Cancha } from "../SideBar";

export type Reserva = {
  id_reserva: number;
  id_cancha: number;
  nombreCliente: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
};

export type EstadoTurno = "pendiente" | "confirmado" | "finalizado";

export type CalendarSelection = {
  tipo: "predio" | "cancha";
  predio: {
    nombre: string;
    canchas: Cancha[];
  };
  cancha?: Cancha;
};

export type CalendarMetrics = {
  pendientes: number;
  confirmados: number;
  finalizados: number;
};
