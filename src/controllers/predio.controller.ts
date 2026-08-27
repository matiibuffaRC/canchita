// El tipado de los parametros en las peticiones son con mayúsculas
import { buscarAdminPorID, buscarPrediosPorAdmin, } from "../models/predio.model";

export const getPredios = async (slug: string) => {
    try {
        const admin = await buscarAdminPorID(slug); // LO QUE NOS RETORNAR ES UN OBJETO
        if (!admin) {
            return Response.json(
                {
                    message: "No se obtuvo al administrador buscado",
                },
                {
                    status: 500,
                },
            );
        }
        // DEBEMOS TRABAJAR AL OBJETO COMO DEBE SER 
        const predios = await buscarPrediosPorAdmin(admin.id_administrador); 
        return Response.json({
            administrador: admin,
            predios: predios,
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
