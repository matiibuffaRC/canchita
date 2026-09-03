"use client";

// Import dependencies
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useTurnosDisponibles } from "@/src/hooks/useTurnosDisponibles";

// Import components
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
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(
    dayjs(),
  );
  const { "id-cancha": id } = useParams<{ "id-cancha": string }>(); // Obtenemos de la URL este parámetro

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

  const {
    turnos,
    loading: loadingTurnos,
    error: errorTurnos,
  } = useTurnosDisponibles(
    cancha?.id_cancha,
    fechaSeleccionada,
    cancha?.horario_apertura,
    cancha?.horario_cierre,
    cancha?.duracion,
  );

  useEffect(() => {
    console.log(turnos);
  }, [turnos]);

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
          <SelectorFecha
            value={fechaSeleccionada}
            onChange={(nuevaFecha) => {
              setFechaSeleccionada(nuevaFecha);
            }}
          />
        </div>
        <div>
          <h2 className="mt-8 font-extrabold text-lg md:text-2xl md:text-center">
            Horarios disponibles
          </h2>
          {loadingTurnos ? (
            <p className="mt-4 text-center text-[#243054]/60">
              Buscando horarios...
            </p>
          ) : turnos.length === 0 ? (
            errorTurnos ? (
              <p className="mt-4 text-center text-red-600">{errorTurnos}</p>
            ) : (
              <p className="mt-4 text-center text-[#243054]/60">
                No hay turnos disponibles para esta cancha y fecha.
              </p>
            )
          ) : (
            <div>
              {errorTurnos && (
                <p className="mt-4 text-center text-amber-700">{errorTurnos}</p>
              )}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {turnos.map((turno) => (
                  <button
                    key={turno.inicio}
                    type="button"
                    disabled={!turno.disponible}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      turno.disponible
                        ? "border-[#243054]/15 bg-white text-[#243054] shadow-sm hover:border-[#243054] hover:bg-[#243054] hover:text-white"
                        : "cursor-not-allowed border-[#243054]/10 bg-[#243054]/5 text-[#243054]/35 line-through"
                    }`}
                  >
                    {turno.inicio} - {turno.fin}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
