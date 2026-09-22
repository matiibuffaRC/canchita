import { getDataCancha } from "@/src/controllers/cancha.controller";
import { updateCancha } from "@/src/controllers/admin-dashboard.controller";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ "id-cancha": string }> },
) {
  // Obtenemos el id de la cancha desde los parámetros de la ruta
  const { "id-cancha": id } = await params;
  const id_number = parseInt(id, 10);

  return getDataCancha(id_number); // Acá recibimos un objeto y lo retornamos
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ "id-cancha": string }> },
) {
  const { "id-cancha": id } = await params;
  try {
    return await updateCancha(id, await request.json());
  } catch (error) {
    console.error("Error actualizando cancha", error);
    return Response.json(
      { message: "No se pudo actualizar la cancha" },
      { status: 500 },
    );
  }
}
