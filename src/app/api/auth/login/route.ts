import { NextRequest, NextResponse } from "next/server";
import { loginController } from "../../../../controllers/auth.controller";

type Admin = {
    email: string;
    password: string;
};

// Login de administradores
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Faltan datos obligatorios" },
                { status: 400 }
            );
        }

        const { token } = await loginController(email, password);

        const response = NextResponse.json({
            message: "Login exitoso",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            { error: "Credenciales inválidas" },
            { status: 401 }
        );
    }
}