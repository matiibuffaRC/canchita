import { db } from "../libs/db";

export const buscarPredioPorSlug = async (slug: string) => {
    const result = await db.query(
        `
            SELECT * 
            FROM "Predio"
            WHERE slug = $1;
            `,
        [slug],
    );
    return result.rows[0]; //Retornamos un OBJETO por lo que debemos trabajarlo como tal
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
