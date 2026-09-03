import { NextRequest, NextResponse } from "next/server";
import { obtenerTurnosPorCanchaYFecha } from "@/src/controllers/turnos.controller";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const idCancha = searchParams.get("id_cancha");
    const fecha = searchParams.get("fecha");

    if (!idCancha || !fecha) {
        return NextResponse.json(
            { message: "Faltan parámetros id_cancha o fecha" },
            { status: 400 },
        );
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
        return NextResponse.json(
            { message: "El parámetro fecha debe tener formato YYYY-MM-DD" },
            { status: 400 },
        );
    }

    try {
        const turnos = await obtenerTurnosPorCanchaYFecha(idCancha, fecha);
        return NextResponse.json({ turnos });
    } catch (error) {
        console.error("Error obteniendo los turnos:", error);
        return NextResponse.json(
            { message: "Ha ocurrido un error al obtener los turnos" },
            { status: 500 },
        );
    }
}