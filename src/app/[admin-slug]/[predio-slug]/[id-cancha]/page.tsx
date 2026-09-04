"use client";

// Import dependencies
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useTurnosDisponibles } from "@/src/hooks/useTurnosDisponibles";
import type { Turno } from "@/src/lib/turnos/turnos";

// Import components
import { SelectorFecha } from "@/src/components/calendario/SelectorFecha";
import { Header } from "@/src/components/header/userPages/Header";
import { Loader } from "@/src/components/loader/Loader";
import { TurnosDisponibles } from "@/src/components/calendario/TurnosDisponibles";

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
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null);
    const { "admin-slug": adminSlug, "predio-slug": predioSlug, "id-cancha": id, } = useParams<{ "admin-slug": string; "predio-slug": string; "id-cancha": string; }>();
    const router = useRouter();

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
                const datosCancha = data.cancha;
                setCancha({
                    ...datosCancha,
                    horario_apertura:
                        datosCancha.horario_apertura ?? datosCancha.hora_apertura,
                    horario_cierre: datosCancha.horario_cierre ?? datosCancha.hora_cierre,
                    duracion: datosCancha.duracion ?? datosCancha.duracion_minutos,
                });
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Ha ocurrido un error al obtener las canchas del predio";
                console.error(message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const { turnos, loading: loadingTurnos, error: errorTurnos } = useTurnosDisponibles( cancha?.id_cancha, fechaSeleccionada, cancha?.horario_apertura, cancha?.horario_cierre, cancha?.duracion, );

    const confirmarTurno = () => {
        if (!turnoSeleccionado || !fechaSeleccionada || !id) return;

        const params = new URLSearchParams({
            fecha: fechaSeleccionada.format("YYYY-MM-DD"),
            inicio: turnoSeleccionado.inicio,
            fin: turnoSeleccionado.fin,
        });

        router.push(
            `/${adminSlug}/${predioSlug}/${id}/reserva?${params.toString()}`,
        );
    };

    if (loading) { return <Loader /> }

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito">
            <Header titulo={`${cancha?.nombre} - ${cancha?.tipo}`} />
            <div className="flex flex-col w-full max-w-3xl p-5">
                <h2 className="font-extrabold text-xl md:text-2xl md:text-center">
                    Seleccionar Fecha
                </h2>
                <div className="flex justify-center">
                    <SelectorFecha value={fechaSeleccionada} onChange={(nuevaFecha) => { setFechaSeleccionada(nuevaFecha); setTurnoSeleccionado(null); }} />
                </div>
                <div className='border-t-2 border-gray-200'>
                    <h2 className="mt-8 font-extrabold text-xl md:text-2xl md:text-center">
                        Horarios disponibles
                    </h2>
                    {loadingTurnos ? (
                        <p className="mt-4 text-center text-[#243054]/60">
                        Buscando horarios...
                        </p>
                    ) : // Se encontraron los turnos
                    turnos.length === 0 ? (
                        errorTurnos ? (
                        <p className="mt-4 text-center text-red-600">{errorTurnos}</p>
                        ) : (
                        // Si no hay turnos disponibles pero tampoco un error, es porque se reservaron todos
                        <p className="mt-4 text-center text-[#243054]/60">
                            No hay turnos disponibles para esta cancha y fecha.
                        </p>
                        )
                    ) : (
                        // Hay turnos disponibles
                        <div>
                        {errorTurnos && (
                            <p className="mt-4 text-center text-amber-700">{errorTurnos}</p>
                        )}
                        <TurnosDisponibles turnos={turnos} turnoSeleccionado={turnoSeleccionado} onSeleccionar={setTurnoSeleccionado} onConfirmar={confirmarTurno} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;
