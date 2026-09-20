import { NextRequest, NextResponse } from "next/server";
import { loginController } from "../../../../controllers/auth.controller";

type Admin = {
    email: string;
    password: string;
};

// Login de administradores
export async function POST(request: NextRequest) {
    // Lo que hacemos con el route es directamente pasar la petición al controller

    const adminData = await request.json();
    const { email, password } = adminData;
    
    if (!email || !password) {
        return NextResponse.json(
            { error: "Faltan datos obligatorios" },
            { status: 400 }
        );
    }

    return loginController(adminData.email, adminData.password);
}