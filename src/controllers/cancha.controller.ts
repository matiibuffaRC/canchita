// El tipado de los parametros en las peticiones son con mayúsculas
import { buscarPredioPorSlug, buscarCanchasPorPredio, } from "../models/cancha.model";

export const getCanchas = async (slug: string) => {
    try {
        const predio = await buscarPredioPorSlug(slug); // LO QUE NOS RETORNAR ES UN OBJETO
        if (!predio) {
            return Response.json(
                {
                    message: "No se obtuvo al predio buscado",
                },
                {
                    status: 500,
                },
            );
        }
        // DEBEMOS TRABAJAR AL OBJETO COMO DEBE SER 
        const canchas = await buscarCanchasPorPredio(predio.id_predio); 
        return Response.json({
            predio: predio,
            canchas: canchas
        });
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Error del servidor papu",
            },
            {
                status: 500,
            },
        );
    }
};