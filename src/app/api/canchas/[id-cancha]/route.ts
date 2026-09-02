import { getDataCancha} from '@/src/controllers/cancha.controller';


export async function GET( _request: Request, { params }: { params: Promise<{ 'id-cancha': string }> } ) {
    // Obtenemos el id de la cancha desde los parámetros de la ruta
    const { 'id-cancha' : id } = await params;
    const id_number = parseInt(id, 10)

    return getDataCancha(id_number); // Acá recibimos un objeto y lo retornamos
}