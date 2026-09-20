import { db } from "../lib/db";

export const buscarAdministradores = async (email: string) => {
  const result = await db.query(
    `SELECT * 
            FROM public.administrador
            WHERE email = $1 
        `,
    [email],
  );
  if (result.rowCount === 0) {
    throw Error("No se obtuvo ningún administrador registrado con dicho email");
  }
  return result.rows[0]; // Retornamos al administrador obtenido (con la contraseña hasheada)
};
