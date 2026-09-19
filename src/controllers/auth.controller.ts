import { NextResponse } from "next/server";
import { login } from "../service/compare";

type Admin = {
    email: string;
    password: string;
};

export const loginController = async (request: Request) => {
    try {
        const adminData = await request.json();
        const { email, password } = adminData;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Faltan datos obligatorios" },
                { status: 400 }
            );
        }

        const result = await login({ email, password });

        if (!result) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { ok: true, admin: result },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Datos inválidos" },
            { status: 400 }
        );
    }
};