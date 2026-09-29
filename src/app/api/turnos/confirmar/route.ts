import { NextRequest, NextResponse } from "next/server";
import { confirmarTurnoController } from "../../../../controllers/turnos.controller";

export async function GET(request: NextRequest) {

    try {
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
        return NextResponse.json(
            { error: "Token faltante" },
            { status: 400 }
        );
        }

        const resultado =
        await confirmarTurnoController(token);

        return NextResponse.json(resultado);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
        { error: "No se pudo confirmar el turno" },
        { status: 500 }
        );
    }
}