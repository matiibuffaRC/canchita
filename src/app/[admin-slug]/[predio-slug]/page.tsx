'use client';

// Import dependencies
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

// Import components
import StadiumHero from '../../../components/predio-page/StadiumHero';
import CanchasList from '../../../components/predio-page/CanchasList';

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

    // useEffect(()=>{
    //     console.log("Reserva en curso: ", reservaEnCurso);
    // },[reservaEnCurso]);

    if (loading) {
        return (
            <div className="bg-[#F4F6F9] flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
            </div>
        );
    }

    return (
        <Link href={`/${slug}/${slug}`} className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito" onClick={()=>{}}>
            <header className="relative px-5 pt-5 pb-3 flex justify-center items-center gap-1 border-b-2 border-[#243054]/10 w-full max-w-3xl">
                <button type="button" aria-label="Volver" className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-sm transition hover:bg-[#243054]/5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]"
                    onClick={() => window.history.back()} >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#1A1D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-lg md:text-xl font-extrabold text-[#1A1D29]">
                    {nombrePredio}
                </h1>
            </header>

            <div className="flex w-full max-w-3xl flex-col gap-4">
                <StadiumHero />
            </div>

            <div className="w-full max-w-3xl p-5">
                <h2 className="text-2xl font-extrabold">Canchas disponibles</h2>
                {/* Hacemos el if para imprimir o no las canchas */}
                {error ? ( <p className="mt-3 text-sm text-red-500">{error}</p>) : ( <CanchasList canchas={canchas} onSelectCancha={(id) => actualizarReserva({ canchaId: id })} />)}
            </div>
        </Link>
    );
}

export default Page;