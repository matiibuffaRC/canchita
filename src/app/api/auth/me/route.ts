import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";


interface TokenPayload { 
    email: string
}

// Obtenemos el mail del administrador logueado
export async function GET(){
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    if(!token){
        return NextResponse.json(
            { error: 'El usuario no está autenticado' },
            { status: 401 }
        )
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify<TokenPayload>(token, secret);
        console.log(payload.email)
        return NextResponse.json({ email: payload.email });
    } catch (error) {
        return NextResponse.json(
            { error: 'Token inválido o expirado' },
            { status: 401 }
        );
    }
}