'use client';

// Import dependencies
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

function page() {
    const [loading, setLoading] = useState(true);
    // const { 'predio-slug': slug } = useParams<{ 'predio-slug': string }>();
    const { 'id-cancha': id } = useParams<{ 'id-cancha': string }>();
    
    useEffect(()=>{
        if(!id) return;

        const fetchData = async () => {
            try{
                
                const result = await fetch(`/api/canchas/${id}`);
                if (!result.ok){
                    const body = await result.json().catch(() => null);
                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener las canchas del predio",
                    );
                }
                const data = await result.json();
                
                console.log(data.cancha)
            }catch(error){
                const message = error instanceof Error ? error.message : "Ha ocurrido un error al obtener las canchas del predio";
                console.error("Ocurrió un error obteniendo las canchas del predio: ", message);
            }finally{
                setLoading(false);
            }

        }
        fetchData();
    },[])

    if (loading) {
        return (
            <div className="bg-[#F4F6F9] flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
            </div>
        );
    }

    return (
        <div className='p-5'>page canchas</div>
    )
}

export default page