'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Lo que esperamos recibir del backend
type Predio = {
    id_predio: number,
    nombre: string,
    slug: string,
    direccion: string,
    telefono: string
}

function page() {
    const { 'admin-slug' : slug } = useParams();
    useEffect (()=>{
        console.log(slug)
        const peticionFetch = async() =>{ 
            const result = await fetch(`/api/admins/${slug}/predio`);
            const data = await result.json();
            console.log(data);
        }
        peticionFetch();
    },[])
    return (
        <div className='bg-linear-to-b min-h-screen from-white to-gray-100 p-5 text-black'>
            Hola
        </div>
    )
}

export default page
