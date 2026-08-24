import { NextResponse } from "next/server";
// Debo gestionar la petición realizada en el page.tsx del admin-slug

export async function GET() {
    return NextResponse.json({
        message: "Estamos buscando a tu usuario",
    });
}