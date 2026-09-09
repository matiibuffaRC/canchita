import { NextRequest, NextResponse } from "next/server";
import { obtenerTurnosPorCanchaYFecha, postTurnos } from "@/src/controllers/turnos.controller";

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

export async function POST(request: NextRequest) {
    try {
        const bodyTurno = await request.json();
        const {
            idCancha,
            nombreCliente,
            telefonoCliente,
            emailCliente,
            fecha,
            horaInicio,
            horaCierre
        } = bodyTurno;

        console.log("Body recibido: ", bodyTurno)

        if (!idCancha || !nombreCliente || !fecha || !horaInicio) {
            return NextResponse.json(
                { error: "Faltan datos obligatorios" },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            {
                message: "Reserva creada correctamente",
                reserva: bodyTurno
            },
            { status: 201 }
        );
        postTurnos(bodyTurno)
    }catch(error){
        console.log("Error desde el backend: ", error);
        return NextResponse.json(
            { message: "La reserva no se pudo crear", },
            { status: 201 }
        );
    }
    
}