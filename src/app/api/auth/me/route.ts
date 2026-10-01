import { NextResponse } from "next/server";
import { obtenerAdminAutenticado } from "../../../../util/admin-auth";

// Obtenemos la identidad del administrador logueado
export async function GET() {
  const admin = await obtenerAdminAutenticado();
  if (!admin) {
    return NextResponse.json(
      { error: "El usuario no está autenticado" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    email: admin.email,
    id: admin.id,
    slug: admin.slug,
    nombre: admin.nombre,
    apellido: admin.apellido,
    rol: admin.rol,
  });
}
