export type EstadoTurno = "confirmado" | "pendiente" | "finalizado";

export type Admin = {
  id_administrador: number;
  nombre: string;
  apellido: string;
  slug: string;
};

export type Predio = {
  id_predio: number;
  nombre: string;
  slug: string;
  direccion: string;
  telefono: string;
  horario?: string;
};

export type Cancha = {
  id_cancha: number;
  id_predio: number;
  nombre: string;
  tipo: string;
  precio: number;
  duracion: number;
};

export type Turno = {
  id: string;
  canchaId: number;
  hora: string;
  duracionHoras: number;
  cliente: string;
  estado: EstadoTurno;
};

export const ESTADO_CONFIG: Record<
  EstadoTurno,
  { label: string; bg: string; text: string }
> = {
  confirmado: { label: "Confirmado", bg: "bg-[#243054]", text: "text-white" },
  pendiente: { label: "Pendiente", bg: "bg-[#C6832B]", text: "text-white" },
  finalizado: {
    label: "Finalizado",
    bg: "bg-[#E8EAF1]",
    text: "text-[#5B6688]",
  },
};

export const HORARIOS = Array.from({ length: 16 }, (_, index) => {
  const hour = 8 + index;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}
