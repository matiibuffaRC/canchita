import { db } from "../lib/db";

export const buscarPredioPorSlug = async (slug: string) => {
  const result = await db.query(
    `
            SELECT * 
            FROM "Predio"
            WHERE slug = $1;
            `,
    [slug],
  );
  return result.rows[0];
  // Como recibimos un arreglo de Objetos, y necesitamos únicamente uno,
  // accedemos al primer elemento del array con el [0] y lo retornamos
};

export const buscarCanchasPorPredio = async (id: number) => {
  const result = await db.query(
    `
            SELECT * 
            FROM "Cancha"
            WHERE id_predio = $1
            `,
    [id],
  );
  return result.rows;
};

export const buscarCanchaPorId = async (id: number) => {
  const result = await db.query(
    `
            SELECT * 
            FROM "Cancha"
            WHERE id_cancha = $1
        `,
    [id],
  );
  return result.rows[0];
};

export async function actualizarCancha(
  id: number,
  datos: {
    nombre: string;
    tipo: string;
    precio: number;
    duracion: number;
    horario_apertura: string;
    horario_cierre: string;
  },
) {
  const result = await db.query(
    `UPDATE "Cancha"
     SET nombre = $1, tipo = $2, precio = $3, duracion = $4,
       hora_apertura = $5, hora_cierre = $6
     WHERE id_cancha = $7
     RETURNING *`,
    [
      datos.nombre,
      datos.tipo,
      datos.precio,
      datos.duracion,
      datos.horario_apertura,
      datos.horario_cierre,
      id,
    ],
  );
  return result.rows[0];
}
