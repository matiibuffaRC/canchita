import { NextRequest, NextResponse } from "next/server";
import { findAdmins } from "../../../../controllers/auth.controller";

// Login de administradores
export async function POST(request: NextRequest) {
    const userData = await request.json();
    const {
        email,
        password // Debería ir hasheada
    } = userData; // Tratar al usuario como un objeto con 2 propiedades
    
    if (!email || !password) {
        return NextResponse.json(
            { error: "Faltan datos obligatorios" },
            { status: 400 }
        );
    }
        
    try {
        const result = await findAdmins(userData); // Le enviamos el objeto de usuario y esperamos un retorno
        
        console.log(result)
        return NextResponse.json(
            {
                message: "Datos recibidos correctamente",
                reserva: userData // TODO --> Eliminar después
            },
            { status: 201 }
        );
    }catch(error){
        console.log("Error desde el backend de authentication: ", error);
        return NextResponse.json(
            { message: "No se pudo completar la autenticación", },
            { status: 500 },
        );
    }
    
}