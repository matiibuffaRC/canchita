import { NextResponse } from "next/server";
import { login } from "../service/compare";
import { generarToken } from "../util/jwt";

export const loginController = async ( email: string, password: string ) => {
    const result = await login({ email, password });

    if (!result) {
        throw new Error("Credenciales inválidas");
    }

    const token = await generarToken({
        email,
    });

    return { token };
};