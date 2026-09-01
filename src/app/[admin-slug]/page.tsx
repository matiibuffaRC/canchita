"use client";

import { useEffect, useState } from "react";

// Import dependencies
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";


// Import icons
import ChevronIcon from "../../components/icons/Chevron";
import PhoneIcon from "../../components/icons/Phone";
import PinIcon from "../../components/icons/Pin";

// Import componentes
import FotoGenerica from "../../components/admin-page/FotoGenerica";

type Predio = {
    id_predio: number,
    nombre: string,
    slug:string,
    direccion: string,
    telefono: string
}

type Admin = {
    id_administrador: number,
    nombre: string,
    apellido: string,
    slug: string,
}


// Lo que esperamos recibir del backend
function Page() {
    const { "admin-slug": slug } = useParams<{ "admin-slug": string }>();
    const [predios, setPredios] = useState<Predio[]>([])
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState<Admin | null>(null)

    useEffect(() => {
        if (!slug) return;
        const fetchPredios = async () => {
            try {
                const result = await fetch(`/api/admins/${slug}/predio`);
                if (!result.ok) {
                    const body = await result.json().catch(() => null);

                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener los predios del administrador",
                    );
                }

                const data = await result.json();
                setAdmin(data.administrador)
                setPredios(data.predios);
                // console.log(data.administrador)
            }catch(error){
                console.error("Ocurrió un error al obtener los predios: ", error)
            }finally{
                setLoading(false)
            }
            
        };

        fetchPredios().catch((error: Error) => console.error(error.message));

    }, [slug]);

    // Imprimimos los predios
    const printPredios = () => {
        return predios.map((predio) => {
            return (
                <Link key={predio.id_predio} href={`/${admin?.slug}/${predio.slug}`} aria-label={`Gestionar ${predio.nombre}`} className="flex w-full items-center gap-4 rounded-xl border border-[#243054]/10 bg-white p-4 shadow-sm transition hover:border-[#243054]/20 hover:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]" >
                    <FotoGenerica />
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-lg font-extrabold text-[#161B2E]">
                            {predio.nombre}
                        </h2>

                        <p className="mt-.5 flex items-center gap-1.5 text-xs text-[#243054]/60">
                            <PinIcon />
                            <span className="truncate">{predio.direccion}</span>
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#243054]/60">
                            <PhoneIcon />
                            <span className="truncate">{predio.telefono}</span>
                        </p>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition group-hover:bg-[#243054]/5">
                        <ChevronIcon />
                    </span>
                </Link>
            )
        })
    }

    if (loading) {
        return (
            <div className="bg-[#F4F6F9] flex min-h-screen items-center justify-center"> 
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" /> 
            </div> 
        ); 
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] p-5 text-[#243054] nunito">

            <div className="w-full max-w-3xl">
                {/* Header con logo — sacá este bloque si ya tenés uno compartido en el layout */}
                <div className="mb-6 pb-1 flex items-center gap-1 border-b-2 border-[#243054]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Image src="/icons/IconPNG.png" alt="Canchita" width={40} height={40} />
                    </div>
                    <span className="text-xl font-extrabold text-[#161B2E]">Canchita</span>
                </div>

                <div className="mb-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-[#161B2E]">
                        ¿Donde jugamos hoy?
                    </h1>
                    <p className="text-[#243054]/60 font-bold">
                        {predios.length === 1 ? "Predio disponible" : "Predios disponibles"}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {printPredios()}
                </div>

            </div>

        </div>
    );
}

export default Page;