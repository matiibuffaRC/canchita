"use client";

// Import dependencies
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { generarTurnos, Turno } from "@/src/lib/turnos/turnos";

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
function page() {
  const [loading, setLoading] = useState(true);
  const [cancha, setCancha] = useState<Cancha>();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(
    dayjs(),
  );
  // const { 'predio-slug': slug } = useParams<{ 'predio-slug': string }>();
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
        console.error(
          "Ocurrió un error obteniendo las canchas del predio: ",
          message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F4F6F9] flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito">
      <header className="relative px-5 pt-5 pb-3 flex justify-center items-center gap-1 border-b-2 border-[#243054]/10 w-full max-w-3xl">
        <button
          type="button"
          aria-label="Volver"
          className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-sm transition hover:bg-[#243054]/5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]"
          onClick={() => window.history.back()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#1A1D29"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg md:text-xl font-extrabold text-[#1A1D29]">
          {cancha?.nombre} - {cancha?.tipo}
        </h1>
      </header>
      <div className="flex flex-col w-full max-w-3xl p-5">
        <h2 className="font-extrabold text-lg md:text-2xl md:text-center">
          Seleccionar Fecha
        </h2>
        <div className="flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DateCalendar
              value={fechaSeleccionada}
              onChange={(newValue) => setFechaSeleccionada(newValue)}
              minDate={dayjs()}
              sx={{
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "#243054",
                  "&:hover": {
                    backgroundColor: "#1A1D29",
                  },
                },
                "& .MuiPickersDay-today": {
                  borderColor: "#243054",
                },
              }}
            />
          </LocalizationProvider>
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

export default page;
