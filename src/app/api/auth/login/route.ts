import { NextRequest, NextResponse } from "next/server";
import { loginController } from "../../../../controllers/auth.controller";

// Login de administradores
export async function POST(request: NextRequest) {
    // Lo que hacemos con el route es directamente pasar la petición al controller
    return loginController(request);
}