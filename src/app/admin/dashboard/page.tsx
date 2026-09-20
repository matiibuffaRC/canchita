"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  CircleCheck,
} from "lucide-react";

type EstadoTurno = "confirmado" | "pendiente" | "finalizado";

interface Turno {
  id: string;
  canchaId: string;
  hora: string; // "08:00"
  duracionHoras: number;
  cliente: string;
  estado: EstadoTurno;
}

const CANCHAS = [
  { id: "c1", nombre: "Cancha 1", deporte: "Fútbol 5" },
  { id: "c2", nombre: "Cancha 2", deporte: "Pádel" },
  { id: "c3", nombre: "Cancha 3", deporte: "Tenis" },
];

const HORARIOS = Array.from({ length: 16 }, (_, i) => {
  const h = 8 + i;
  return `${h.toString().padStart(2, "0")}:00`;
});

// Datos de ejemplo — reemplazar por los turnos reales.
const TURNOS_MOCK: Turno[] = [
  { id: "t1", canchaId: "c1", hora: "09:00", duracionHoras: 1, cliente: "Martín Gómez", estado: "finalizado" },
  { id: "t2", canchaId: "c1", hora: "13:00", duracionHoras: 1, cliente: "Colegio San José", estado: "finalizado" },
  { id: "t3", canchaId: "c1", hora: "18:00", duracionHoras: 1, cliente: "Grupo Los Pibes", estado: "confirmado" },
  { id: "t4", canchaId: "c1", hora: "20:00", duracionHoras: 1, cliente: "Sofía Ruiz", estado: "pendiente" },
  { id: "t5", canchaId: "c2", hora: "10:00", duracionHoras: 1, cliente: "Lucía Fernández", estado: "finalizado" },
  { id: "t6", canchaId: "c2", hora: "17:00", duracionHoras: 1, cliente: "Nico & Fede", estado: "confirmado" },
  { id: "t7", canchaId: "c2", hora: "19:00", duracionHoras: 1, cliente: "Torneo Interno", estado: "pendiente" },
  { id: "t8", canchaId: "c3", hora: "08:00", duracionHoras: 1, cliente: "Escuela de Tenis", estado: "finalizado" },
  { id: "t9", canchaId: "c3", hora: "17:00", duracionHoras: 1, cliente: "Roberto Díaz", estado: "confirmado" },
  { id: "t10", canchaId: "c3", hora: "22:00", duracionHoras: 1, cliente: "Ana Torres", estado: "pendiente" },
];

const ESTADO_CONFIG: Record<EstadoTurno, { label: string; bg: string; text: string }> = {
  confirmado: { label: "Confirmado", bg: "bg-[#243054]", text: "text-white" },
  pendiente: { label: "Pendiente", bg: "bg-[#C6832B]", text: "text-white" },
  finalizado: { label: "Finalizado", bg: "bg-[#E8EAF1]", text: "text-[#5B6688]" },
};

function formatFecha(date: Date) {
  const texto = date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function CourtsAdminDashboard() {
  const [fecha, setFecha] = useState(new Date());
  const [canchaActiva, setCanchaActiva] = useState(CANCHAS[0].id);

  const cambiarDia = (delta: number) => {
    setFecha((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + delta);
      return next;
    });
  };

  const turnosDelDia = TURNOS_MOCK;
  const contar = (estado: EstadoTurno) => turnosDelDia.filter((t) => t.estado === estado).length;
  const turnoEn = (canchaId: string, hora: string) =>
    turnosDelDia.find((t) => t.canchaId === canchaId && t.hora === hora);

  const turnosCanchaActiva = turnosDelDia
    .filter((t) => t.canchaId === canchaActiva)
    .sort((a, b) => a.hora.localeCompare(b.hora));

  return (
    <div className="min-h-screen bg-white text-[#243054]">
      {/* Encabezado */}
      <header className="border-b border-[#E8EAF1] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[\'Space_Grotesk\',sans-serif] text-xl font-medium tracking-tight sm:text-2xl">
              Turnos
            </h1>
            <p className="mt-0.5 text-sm text-[#5B6688]">Gestioná la agenda de tus canchas</p>
          </div>
          <CalendarDays className="h-5 w-5 text-[#5B6688] sm:h-6 sm:w-6" strokeWidth={1.75} />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#E8EAF1] px-2 py-1.5">
          <button
            onClick={() => cambiarDia(-1)}
            className="rounded-md p-1.5 text-[#5B6688] transition-colors hover:bg-[#EEF0F6]"
            aria-label="Día anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-[\'Space_Grotesk\',sans-serif] text-sm sm:text-base">
            {formatFecha(fecha)}
          </span>
          <button
            onClick={() => cambiarDia(1)}
            className="rounded-md p-1.5 text-[#5B6688] transition-colors hover:bg-[#EEF0F6]"
            aria-label="Día siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Resumen */}
      <section className="grid grid-cols-3 gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <StatCard label="Confirmados" value={contar("confirmado")} tono="navy" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Pendientes" value={contar("pendiente")} tono="ambar" icon={<AlertCircle className="h-4 w-4" />} />
        <StatCard label="Finalizados" value={contar("finalizado")} tono="gris" icon={<CircleCheck className="h-4 w-4" />} />
      </section>

      {/* Leyenda */}
      <div className="flex items-center gap-4 px-4 pb-2 text-xs text-[#5B6688] sm:px-6 lg:px-8">
        {(Object.keys(ESTADO_CONFIG) as EstadoTurno[]).map((estado) => (
          <div key={estado} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${ESTADO_CONFIG[estado].bg}`} />
            {ESTADO_CONFIG[estado].label}
          </div>
        ))}
      </div>

      {/* Mobile: tabs de cancha + lista de turnos */}
      <section className="px-4 pb-10 sm:px-6 md:hidden">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
          {CANCHAS.map((cancha) => (
            <button
              key={cancha.id}
              onClick={() => setCanchaActiva(cancha.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                canchaActiva === cancha.id
                  ? "border-[#243054] bg-[#243054] text-white"
                  : "border-[#E8EAF1] text-[#5B6688]"
              }`}
            >
              {cancha.nombre}
              <span className="ml-1 opacity-70">· {cancha.deporte}</span>
            </button>
          ))}
        </div>

        <ul className="mt-2 divide-y divide-[#E8EAF1]">
          {turnosCanchaActiva.length === 0 && (
            <li className="py-10 text-center text-sm text-[#9AA2B8]">
              No hay turnos cargados para esta cancha.
            </li>
          )}
          {turnosCanchaActiva.map((turno) => (
            <li key={turno.id} className="flex items-center gap-3 py-3">
              <div className="w-14 shrink-0 font-[\'Space_Grotesk\',sans-serif] text-sm tabular-nums">
                {turno.hora}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{turno.cliente}</p>
                <p className="text-xs text-[#9AA2B8]">{turno.duracionHoras}h de turno</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${ESTADO_CONFIG[turno.estado].bg} ${ESTADO_CONFIG[turno.estado].text}`}
              >
                {ESTADO_CONFIG[turno.estado].label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Desktop: calendario en grilla */}
      <section className="hidden px-6 pb-10 md:block lg:px-8">
        <div className="overflow-x-auto rounded-lg border border-[#E8EAF1]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-20 border-b border-[#E8EAF1] bg-white px-3 py-3 text-left text-xs font-medium text-[#9AA2B8]">
                  Hora
                </th>
                {CANCHAS.map((cancha) => (
                  <th
                    key={cancha.id}
                    className="border-b border-l border-[#E8EAF1] bg-[#F8F9FC] px-3 py-3 text-left"
                  >
                    <p className="font-[\'Space_Grotesk\',sans-serif] text-sm font-medium">{cancha.nombre}</p>
                    <p className="text-xs font-normal text-[#9AA2B8]">{cancha.deporte}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORARIOS.map((hora) => (
                <tr key={hora}>
                  <td className="border-b border-[#E8EAF1] px-3 py-2.5 font-[\'Space_Grotesk\',sans-serif] text-xs tabular-nums text-[#9AA2B8]">
                    {hora}
                  </td>
                  {CANCHAS.map((cancha) => {
                    const turno = turnoEn(cancha.id, hora);
                    return (
                      <td key={cancha.id} className="border-b border-l border-[#E8EAF1] px-2 py-1.5 align-top">
                        {turno ? (
                          <div className={`rounded-md px-2.5 py-1.5 ${ESTADO_CONFIG[turno.estado].bg} ${ESTADO_CONFIG[turno.estado].text}`}>
                            <p className="truncate text-xs font-medium">{turno.cliente}</p>
                          </div>
                        ) : (
                          <div className="h-6" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tono,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tono: "navy" | "ambar" | "gris";
}) {
  const estilos = {
    navy: "bg-[#243054] text-white",
    ambar: "bg-[#FBF1E3] text-[#C6832B]",
    gris: "bg-[#F1F2F6] text-[#5B6688]",
  }[tono];

  return (
    <div className={`rounded-lg px-3 py-3 sm:px-4 sm:py-4 ${estilos}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-80 sm:text-sm">{label}</span>
        {icon}
      </div>
      <p className="mt-2 font-[\'Space_Grotesk\',sans-serif] text-2xl font-medium tabular-nums sm:text-3xl">
        {value}
      </p>
    </div>
  );
}