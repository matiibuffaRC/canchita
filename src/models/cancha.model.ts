import { db } from "../lib/db";

export const buscarPredioPorSlug = async (slug: string) => {
  const result = await db.query(
    `
            SELECT * 
            FROM public.predio
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
            FROM public.cancha
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
            FROM public.cancha
            WHERE id_cancha = $1
        `,
    [id],
  );
  return result.rows[0];
};
