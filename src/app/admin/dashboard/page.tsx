"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Agenda } from "@/src/components/admin-dashboard/Agenda";
import { Sidebar } from "@/src/components/admin-dashboard/Sidebar";
import { Stats } from "@/src/components/admin-dashboard/Stats";
import type {
  Cancha,
  Predio,
  Turno,
} from "@/src/components/admin-dashboard/types";

function formatFecha(date: Date) {
  const texto = date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function toApiDate(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}

function normalizeStatus(status: string): Turno["estado"] {
  const value = status.toLowerCase();
  if (value.includes("cancel") || value.includes("final")) return "finalizado";
  if (value.includes("pend")) return "pendiente";
  return "confirmado";
}

type ApiTurno = {
  id_reserva: number;
  id_cancha: number;
  nombreCliente: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
};

export default function CourtsAdminDashboard() {
  const [fecha, setFecha] = useState(new Date());
  const [predios, setPredios] = useState<Predio[]>([]);
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [predioActivoId, setPredioActivoId] = useState<number>();
  const [canchaActivaId, setCanchaActivaId] = useState<number>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminSlug] = useState(() =>
    typeof window === "undefined"
      ? null
      : sessionStorage.getItem("canchita-admin-slug"),
  );
  const predioActivo =
    predios.find((predio) => predio.id_predio === predioActivoId) ?? null;

  useEffect(() => {
    if (!adminSlug) return;
    fetch(`/api/admins/${encodeURIComponent(adminSlug)}/predio`)
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            (await response.json()).message ??
              "No se pudieron cargar tus predios",
          );
        return response.json();
      })
      .then((data: { predios: Predio[] }) => {
        setPredios(data.predios);
        setPredioActivoId(data.predios[0]?.id_predio);
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "No se pudieron cargar tus predios",
        ),
      )
      .finally(() => setLoading(false));
  }, [adminSlug]);

  useEffect(() => {
    if (!predioActivo) return;
    fetch(`/api/predios/${encodeURIComponent(predioActivo.slug)}/canchas`)
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudieron cargar las canchas");
        return response.json();
      })
      .then((data: { canchas: Cancha[] }) => {
        setCanchas(data.canchas);
        setCanchaActivaId(data.canchas[0]?.id_cancha);
        if (data.canchas.length === 0) setTurnos([]);
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "No se pudieron cargar las canchas",
        ),
      )
      .finally(() => setLoading(false));
  }, [predioActivo]);

  useEffect(() => {
    if (canchas.length === 0) return;
    const fechaApi = toApiDate(fecha);
    Promise.all(
      canchas.map((cancha) =>
        fetch(
          `/api/turnos?id_cancha=${cancha.id_cancha}&fecha=${fechaApi}`,
        ).then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(new Error("No se pudieron cargar los turnos")),
        ),
      ),
    )
      .then((results: Array<{ turnos: ApiTurno[] }>) =>
        setTurnos(
          results.flatMap((result) =>
            result.turnos.map((turno) => ({
              id: `${turno.id_reserva}`,
              canchaId: turno.id_cancha,
              hora: turno.horaInicio.slice(0, 5),
              duracionHoras: Math.max(
                1,
                Number(turno.horaFin.slice(0, 2)) -
                  Number(turno.horaInicio.slice(0, 2)),
              ),
              cliente: turno.nombreCliente,
              estado: normalizeStatus(turno.estado),
            })),
          ),
        ),
      )
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "No se pudieron cargar los turnos",
        ),
      )
      .finally(() => setLoading(false));
  }, [canchas, fecha]);

  const cambiarDia = (delta: number) =>
    setFecha((actual) => {
      const siguiente = new Date(actual);
      siguiente.setDate(actual.getDate() + delta);
      return siguiente;
    });

  if (!adminSlug || (error && predios.length === 0))
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center text-[#243054]">
        <p>
          {error ??
            "No encontramos una sesión de administrador. Volvé a iniciar sesión."}
        </p>
      </main>
    );

  return (
    <div className="min-h-screen bg-white text-[#243054] md:flex">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B1220]/40 md:hidden"
        />
      )}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        predios={predios}
        predioActivo={predioActivo}
        onSelectPredio={(id) => {
          setPredioActivoId(id);
          setSidebarOpen(false);
        }}
        canchas={canchas}
      />
      <div className="min-w-0 flex-1">
        <header className="border-b border-[#E8EAF1] px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-md p-1.5 text-[#5B6688] hover:bg-[#EEF0F6] md:hidden"
                aria-label="Abrir menú de predios"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-medium tracking-tight sm:text-2xl">
                  Turnos
                </h1>
                <p className="mt-0.5 text-sm text-[#5B6688]">
                  Agenda de {predioActivo?.nombre ?? "tus predios"}
                </p>
              </div>
            </div>
            <CalendarDays className="h-5 w-5 text-[#5B6688]" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-[#E8EAF1] px-2 py-1.5">
            <button
              onClick={() => cambiarDia(-1)}
              className="rounded-md p-1.5 text-[#5B6688] hover:bg-[#EEF0F6]"
              aria-label="Día anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-['Space_Grotesk',sans-serif] text-sm sm:text-base">
              {formatFecha(fecha)}
            </span>
            <button
              onClick={() => cambiarDia(1)}
              className="rounded-md p-1.5 text-[#5B6688] hover:bg-[#EEF0F6]"
              aria-label="Día siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>
        <Stats turnos={turnos} />
        {error && (
          <p className="px-4 pb-3 text-sm text-[#C6832B] sm:px-6 lg:px-8">
            {error}
          </p>
        )}
        {loading && (
          <p className="px-4 pb-3 text-sm text-[#9AA2B8] sm:px-6 lg:px-8">
            Cargando agenda...
          </p>
        )}
        <Agenda
          canchas={canchas}
          turnos={turnos}
          canchaActivaId={canchaActivaId}
          onSelectCancha={setCanchaActivaId}
        />
      </div>
    </div>
  );
}
