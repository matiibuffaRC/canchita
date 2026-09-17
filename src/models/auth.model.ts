import { db } from "../lib/db";

type Admin = {
    email: string,
    password: string
}

export const buscarAdministradores = async(admin:Admin) => {
    const result = await db.query(
        `SELECT * 
            FROM "Administrador"
            WHERE email = $1 
        `, [admin.email]
    )
    if (result.rowCount === 0) {
        throw new Error("No se obtuvo ningún administrador registrado con dicho email");
    }
    return result.rows[0]; // Retornamos al administrador obtenido (con la contraseña hasheada)
}