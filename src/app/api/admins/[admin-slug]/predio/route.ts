import { getPredios } from "../../../../../controllers/predio.controller";
import {
  obtenerAdminAutenticado,
  respuestaNoAutorizada,
  respuestaProhibida,
} from "../../../../../util/admin-auth";
// Debo gestionar la petición realizada en el page.tsx del admin-slug

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ "admin-slug": string }> },
) {
  // Acá obtenemos el slug del administrador y lo enviamos como un parámetro a los controllers
  const { "admin-slug": slug } = await params;
  const admin = await obtenerAdminAutenticado();
  if (!admin) return respuestaNoAutorizada();
  if (admin.slug !== slug) return respuestaProhibida();

  return getPredios(slug); // Retornamos la respuesta de la función
}
