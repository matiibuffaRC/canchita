import { updatePredio } from "@/src/controllers/admin-dashboard.controller";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ "predio-slug": string }> },
) {
  const { "predio-slug": slug } = await params;
  try {
    return await updatePredio(slug, await request.json());
  } catch (error) {
    console.error("Error actualizando predio", error);
    return Response.json(
      { message: "No se pudo actualizar el predio" },
      { status: 500 },
    );
  }
}
