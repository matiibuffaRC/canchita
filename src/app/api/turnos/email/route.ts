import { NextRequest, NextResponse } from "next/server";
import { obtenerTurnosPorEmail } from "@/src/controllers/turnos.controller";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim();

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { message: "Ingresá un email válido" },
      { status: 400 },
    );
  }

  try {
    const turnos = await obtenerTurnosPorEmail(email);
    return NextResponse.json(
      { turnos },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Error obteniendo los turnos por email:", error);
    return NextResponse.json(
      { message: "No se pudieron obtener tus turnos. Probá nuevamente." },
      { status: 500 },
    );
  }
}
