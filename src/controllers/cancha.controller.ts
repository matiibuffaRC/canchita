// El tipado de los parametros en las peticiones son con mayúsculas
import { buscarPredioPorSlug, buscarCanchasPorPredio, buscarCanchaPorId } from "../models/cancha.model";

// Obtenemos canchas por predio
export const getCanchas = async (slug: string) => {
    try {
        const predio = await buscarPredioPorSlug(slug); // LO QUE NOS RETORNAR ES UN OBJETO
        if (!predio) {
            return Response.json(
                { message: "No se obtuvo al predio buscado", },
                { status: 404, },
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
            { message: "Error del servidor papu", },
            { status: 500, },
        );
    }
};

export const getDataCancha = async (id: number) => {
    try{
        const cancha = await buscarCanchaPorId(id);
        if(!cancha){
            return Response.json(
                { message: 'No se encontró la cancha buscada' },
                { status: 404 }
            )
        }
        return Response.json(
            { 
                cancha
            }
        )
    }catch(error){
        return Response.json(
            { message: 'Ocurrió un error en el servidor'}
        )
    }
}