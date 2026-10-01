import { getProximasReservas } from "../../../../../controllers/admin-dashboard.controller";
import {
  obtenerAdminAutenticado,
  respuestaNoAutorizada,
  respuestaProhibida,
} from "../../../../../util/admin-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ "admin-slug": string }> },
) {
  const { "admin-slug": adminSlug } = await params;
  const admin = await obtenerAdminAutenticado();
  if (!admin) return respuestaNoAutorizada();
  if (admin.slug !== adminSlug) return respuestaProhibida();

  try {
    return await getProximasReservas(adminSlug);
  } catch (error) {
    console.error("Error obteniendo próximas reservas", error);
    return Response.json(
      { message: "No se pudieron obtener las próximas reservas" },
      { status: 500 },
    );
  }
}
