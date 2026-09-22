import { getProximasReservas } from "../../../../../controllers/admin-dashboard.controller";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ "admin-slug": string }> },
) {
  const { "admin-slug": adminSlug } = await params;
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
