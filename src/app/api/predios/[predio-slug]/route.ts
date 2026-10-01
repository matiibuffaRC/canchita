import { updatePredio } from "@/src/controllers/admin-dashboard.controller";
import {
  obtenerAdminAutenticado,
  respuestaNoAutorizada,
} from "@/src/util/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ "predio-slug": string }> },
) {
  const admin = await obtenerAdminAutenticado();
  if (!admin) return respuestaNoAutorizada();

  const { "predio-slug": slug } = await params;
  try {
    return await updatePredio(slug, await request.json(), admin.id);
  } catch (error) {
    console.error("Error actualizando predio", error);
    return Response.json(
      { message: "No se pudo actualizar el predio" },
      { status: 500 },
    );
  }
}
