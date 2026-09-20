import { NextResponse } from "next/server";
import { login } from "../service/compare";


export const loginController = async (email: string, password:string) => {
    try {

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