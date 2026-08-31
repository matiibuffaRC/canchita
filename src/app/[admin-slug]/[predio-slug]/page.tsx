'use client';

// Import dependencies
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

type Cancha = {
    id_cancha: number,
    id_predio: number,
    duracion: number,
    nombre: string,
    precio: number
}

function page() {
    const { "predio-slug": slug } = useParams<{ "predio-slug": string }>();
    const [canchas, setCanchas] = useState<Cancha[]>([]);

    useEffect(()=>{
        if (!slug) return;
        const fetchCanchas = async() => {
            try{
                const result = await fetch(`/api/predios/${slug}/canchas`);
                if (!result.ok) {
                    const body = await result.json().catch(() => null);

                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener las canchas del predio",
                    );
                }
                const data = await result.json();
                console.log("Esto se obtuvo: ", data);
                setCanchas(data.canchas)
            }catch(error){
                console.log("Ocurrió un error obteniendo las canchas del predio: ", error)
            }finally{
                console.log("Poné el componente de carga")
            }
        }
        fetchCanchas().catch((error: Error) => console.error(error.message));
    },[slug])


    return (
        <div>predio page</div>
    )
}

export default page