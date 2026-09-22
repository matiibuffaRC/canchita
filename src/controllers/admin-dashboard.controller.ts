import { getProximasReservasPorAdmin } from "../models/turnos.model";
import { actualizarCancha } from "../models/cancha.model";
import { actualizarPredio } from "../models/predio.model";

export async function getProximasReservas(adminSlug: string) {
  return Response.json({
    reservas: await getProximasReservasPorAdmin(adminSlug),
  });
}

export async function updatePredio(slug: string, body: unknown) {
  const data = body as {
    nombre?: string;
    direccion?: string;
    telefono?: string;
  };
  if (!data.nombre || !data.direccion || !data.telefono) {
    return Response.json(
      { message: "Nombre, dirección y teléfono son obligatorios" },
      { status: 400 },
    );
  }

  const predio = await actualizarPredio(
    slug,
    data as { nombre: string; direccion: string; telefono: string },
  );
  if (!predio)
    return Response.json({ message: "Predio no encontrado" }, { status: 404 });
  return Response.json({ predio });
}

export async function updateCancha(id: string, body: unknown) {
  const idCancha = Number(id);
  const data = body as {
    nombre?: string;
    tipo?: string;
    precio?: number;
    duracion?: number;
    horario_apertura?: string;
    horario_cierre?: string;
  };

  if (
    !Number.isInteger(idCancha) ||
    !data.nombre ||
    !data.tipo ||
    !data.horario_apertura ||
    !data.horario_cierre
  ) {
    return Response.json(
      { message: "Los datos obligatorios de la cancha están incompletos" },
      { status: 400 },
    );
  }

  const cancha = await actualizarCancha(idCancha, {
    nombre: data.nombre,
    tipo: data.tipo,
    precio: Number(data.precio ?? 0),
    duracion: Number(data.duracion ?? 60),
    horario_apertura: data.horario_apertura,
    horario_cierre: data.horario_cierre,
  });
  if (!cancha)
    return Response.json({ message: "Cancha no encontrada" }, { status: 404 });
  return Response.json({ cancha });
}
