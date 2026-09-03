'use client';

// Import dependencies
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

// Import components
import StadiumHero from '../../../components/predio-page/StadiumHero';
import { Header } from "@/src/components/header/userPages/Header"
import CanchasList from '../../../components/predio-page/CanchasList';
import { Loader } from '../../../components/loader/Loader';

type Cancha = {
    id_cancha: number,
    id_predio: number,
    duracion: number,
    nombre: string,
    precio: number,
    tipo: string
}

type ReservaDraft = {
    predioId: number | null;
    canchaId: number | null;
    fecha: string | null;
    horario: string | null;
};

function Page() {
    const { "admin-slug": adminSlug, "predio-slug": slug, } = useParams<{ "admin-slug": string; "predio-slug": string; }>();
    const [canchas, setCanchas] = useState<Cancha[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reservaEnCurso, setReservaEnCurso] = useState<ReservaDraft>({
        predioId: null,
        canchaId: null,
        fecha: null,
        horario: null,
    });

    // Función para obtener el nombre del predio a partir del slug y lo hacemos empezar con mayúscula
    const nombrePredio = slug ? (() => { const texto = decodeURIComponent(slug).replace(/-/g, " "); return texto.charAt(0).toUpperCase() + texto.slice(1); })() : "";

    const actualizarReserva = (campos: Partial<ReservaDraft>) => {
        setReservaEnCurso((prev) => ({ ...prev, ...campos }));
    };

    useEffect(() => {
        if (!slug) return;

        const fetchCanchas = async () => {
            try {
                const result = await fetch(`/api/predios/${slug}/canchas`);
                if (!result.ok) {
                    const body = await result.json().catch(() => null);
                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener las canchas del predio",
                    );
                }
                const data = await result.json();
                setCanchas(data.canchas);

                if (data.canchas.length > 0) {
                    actualizarReserva({ predioId: data.canchas[0].id_predio });
                }

            } catch (error) {
                const message = error instanceof Error ? error.message : "Ha ocurrido un error al obtener las canchas del predio";
                console.error("Ocurrió un error obteniendo las canchas del predio: ", message);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchCanchas();
    }, [slug]);


    useEffect(()=>{
        console.log("Reserva en curso actualizada: ", reservaEnCurso)
    },[reservaEnCurso])

    if (loading) return <Loader />;

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito" onClick={()=>{}}>
            <Header titulo={`${nombrePredio}`} />

            <div className="flex w-full max-w-3xl flex-col gap-4">
                <StadiumHero />
            </div>

            <div className="w-full max-w-3xl p-5">
                <h2 className="text-2xl font-extrabold">Canchas disponibles</h2>
                {/* Hacemos el if para imprimir o no las canchas */}
                {error ? 
                    ( <p className="mt-3 text-sm text-red-500">{error}</p>) 
                    : 
                    ( <CanchasList canchas={canchas} predioSlug={slug} adminSlug={adminSlug} onSelectCancha={(id) => actualizarReserva({ canchaId: id })} />)
                }
            </div>
        </div>
    );
}

export default Page;