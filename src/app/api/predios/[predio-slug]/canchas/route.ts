import { getCanchas } from "../../../../../controllers/cancha.controller"

export async function GET( _request: Request, { params }: { params: Promise<{ "predio-slug": string }> } ) {
    // Acá obtenemos el slug del predio y lo enviamos como un parámetro a los controllers
    const { "predio-slug": slug } = await params;
    // Llamamos a la función para buscar las canchas vinculadas a nuestro predio seleccionado
    return getCanchas(slug); // Retornamos la respuesta de la función
}