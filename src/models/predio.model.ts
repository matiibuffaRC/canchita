import { db } from "../lib/db";

export const buscarAdminPorID = async (slug: string) => {
  const result = await db.query(
    `
            SELECT * 
            FROM "Administrador"
            WHERE slug = $1;
            `,
    [slug],
  );
  return result.rows[0]; //Retornamos un OBJETO por lo que debemos trabajarlo como tal
};

export const buscarPrediosPorAdmin = async (id: number) => {
  const result = await db.query(
    `
            SELECT * 
            FROM "Predio"
            WHERE id_administrador = $1
            `,
    [id],
  );
  return result.rows;
};

export async function actualizarPredio(
  slug: string,
  datos: { nombre: string; direccion: string; telefono: string },
) {
  const result = await db.query(
    `UPDATE "Predio"
     SET nombre = $1, direccion = $2, telefono = $3
     WHERE slug = $4
     RETURNING *`,
    [datos.nombre, datos.direccion, datos.telefono, slug],
  );
  return result.rows[0];
}
