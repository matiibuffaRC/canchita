"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { generarTurnos, Turno } from "@/src/lib/turnos/turnos";
import { SelectorFecha } from "@/src/components/calendario/SelectorFecha";
import { Header } from "@/src/components/header/userPages/Header";
import { Loader } from "@/src/components/loader/Loader";

type Cancha = {
    id_cancha: number;
    id_predio: number;
    nombre: string;
    activa: boolean;
    duracion: number;
    horario_apertura: string;
    horario_cierre: string;
    tipo: string;
    precio: number;
};

function Page() {
    const [loading, setLoading] = useState(true);
    const [cancha, setCancha] = useState<Cancha>();
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(dayjs());
    const { "id-cancha": id } = useParams<{ "id-cancha": string }>();

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const result = await fetch(`/api/canchas/${id}`);
                if (!result.ok) {
                    const body = await result.json().catch(() => null);
                    throw new Error(
                        body?.message ??
                        "Ha ocurrido un error al obtener las canchas del predio",
                    );
                }
                const data = await result.json();

                setCancha(data.cancha);
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Ha ocurrido un error al obtener las canchas del predio";
                console.error("Ocurrió un error obteniendo las canchas del predio: ", message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito">
            <Header titulo={`${cancha?.nombre} - ${cancha?.tipo}`} />
            <div className="flex flex-col w-full max-w-3xl p-5">
                <h2 className="font-extrabold text-lg md:text-2xl md:text-center">
                    Seleccionar Fecha
                </h2>
                <div className="flex justify-center">
                    <SelectorFecha value={fechaSeleccionada} onChange={setFechaSeleccionada} />
                </div>
                <div>
                    <h2 className="font-extrabold text-lg md:text-2xl md:text-center">
                        Horarios disponibles
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Page;