"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  CircleCheck,
  Plus,
  Pencil,
  MapPin,
  Phone,
  Clock3,
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

interface Cancha {
  id: string;
  predioId: string;
  nombre: string;
  deporte: string;
  precio: number;
  activa: boolean;
}

interface Predio {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horario: string;
}

const PREDIOS: Predio[] = [
  { id: "p1", nombre: "Complejo Norte", direccion: "Av. Colón 1450, Córdoba", telefono: "351 555-0101", horario: "08:00 - 23:00" },
  { id: "p2", nombre: "Complejo Sur", direccion: "Bv. San Juan 780, Córdoba", telefono: "351 555-0202", horario: "09:00 - 22:00" },
];

const CANCHAS: Cancha[] = [
  { id: "c1", predioId: "p1", nombre: "Cancha 1", deporte: "Fútbol 5", precio: 12000, activa: true },
  { id: "c2", predioId: "p1", nombre: "Cancha 2", deporte: "Pádel", precio: 9000, activa: true },
  { id: "c3", predioId: "p1", nombre: "Cancha 3", deporte: "Tenis", precio: 8000, activa: false },
  { id: "c4", predioId: "p2", nombre: "Cancha 1", deporte: "Fútbol 5", precio: 11000, activa: true },
  { id: "c5", predioId: "p2", nombre: "Cancha 2", deporte: "Pádel", precio: 9500, activa: true },
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

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}

export default function CourtsAdminDashboard() {
  const [fecha, setFecha] = useState(new Date());
  const [predioActivoId, setPredioActivoId] = useState(PREDIOS[0].id);
  const [canchaActiva, setCanchaActiva] = useState(CANCHAS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cambiarDia = (delta: number) => {
    setFecha((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + delta);
      return next;
    });
  };

  const predio = PREDIOS.find((p) => p.id === predioActivoId) ?? PREDIOS[0];
  const canchasPredio = CANCHAS.filter((c) => c.predioId === predioActivoId);
  const canchaActivaId = canchasPredio.some((c) => c.id === canchaActiva)
    ? canchaActiva
    : canchasPredio[0]?.id;

  const turnosDelDia = TURNOS_MOCK.filter((t) => canchasPredio.some((c) => c.id === t.canchaId));
  const contar = (estado: EstadoTurno) => turnosDelDia.filter((t) => t.estado === estado).length;
  const turnoEn = (canchaId: string, hora: string) =>
    turnosDelDia.find((t) => t.canchaId === canchaId && t.hora === hora);

  const turnosCanchaActiva = turnosDelDia
    .filter((t) => t.canchaId === canchaActivaId)
    .sort((a, b) => a.hora.localeCompare(b.hora));

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
        predios={PREDIOS}
        predioActivo={predio}
        onSelectPredio={(id) => {
          setPredioActivoId(id);
          setSidebarOpen(false);
        }}
        canchas={canchasPredio}
      />

      <div className="min-w-0 flex-1">
        {/* Encabezado */}
        <header className="border-b border-[#E8EAF1] px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-md p-1.5 text-[#5B6688] transition-colors hover:bg-[#EEF0F6] md:hidden"
                aria-label="Abrir menú de predios"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-medium tracking-tight sm:text-2xl">
                  Turnos
                </h1>
                <p className="mt-0.5 text-sm text-[#5B6688]">Agenda de {predio.nombre}</p>
              </div>
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
            <span className="font-['Space_Grotesk',sans-serif] text-sm sm:text-base">
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
            {canchasPredio.map((cancha) => (
              <button
                key={cancha.id}
                onClick={() => setCanchaActiva(cancha.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  canchaActivaId === cancha.id
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
                <div className="w-14 shrink-0 font-['Space_Grotesk',sans-serif] text-sm tabular-nums">
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
                  {canchasPredio.map((cancha) => (
                    <th
                      key={cancha.id}
                      className="border-b border-l border-[#E8EAF1] bg-[#F8F9FC] px-3 py-3 text-left"
                    >
                      <p className="font-['Space_Grotesk',sans-serif] text-sm font-medium">{cancha.nombre}</p>
                      <p className="text-xs font-normal text-[#9AA2B8]">{cancha.deporte}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HORARIOS.map((hora) => (
                  <tr key={hora}>
                    <td className="border-b border-[#E8EAF1] px-3 py-2.5 font-['Space_Grotesk',sans-serif] text-xs tabular-nums text-[#9AA2B8]">
                      {hora}
                    </td>
                    {canchasPredio.map((cancha) => {
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
    </div>
  );
}

function Sidebar({
  open,
  onClose,
  predios,
  predioActivo,
  onSelectPredio,
  canchas,
}: {
  open: boolean;
  onClose: () => void;
  predios: Predio[];
  predioActivo: Predio;
  onSelectPredio: (id: string) => void;
  canchas: Cancha[];
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85%] flex-col overflow-y-auto bg-white transition-transform duration-200 md:static md:z-auto md:w-80 md:shrink-0 md:translate-x-0 md:border-r md:border-[#E8EAF1] ${
        open ? "translate-x-0 shadow-xl" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#E8EAF1] px-4 py-4">
        <div>
          <p className="font-['Space_Grotesk',sans-serif] text-base font-medium">Mis predios</p>
          <p className="text-xs text-[#5B6688]">Predios y canchas a tu nombre</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-[#5B6688] transition-colors hover:bg-[#EEF0F6] md:hidden"
          aria-label="Cerrar menú"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Lista de predios */}
      <div className="space-y-2 px-4 py-4">
        {predios.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPredio(p.id)}
            className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
              p.id === predioActivo.id
                ? "border-[#243054] bg-[#243054] text-white"
                : "border-[#E8EAF1] text-[#243054] hover:bg-[#EEF0F6]"
            }`}
          >
            <p className="text-sm font-medium">{p.nombre}</p>
            <p
              className={`mt-0.5 flex items-center gap-1 text-xs ${
                p.id === predioActivo.id ? "text-white/70" : "text-[#9AA2B8]"
              }`}
            >
              <MapPin className="h-3 w-3 shrink-0" /> {p.direccion}
            </p>
          </button>
        ))}
        <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#C7CCDB] py-2.5 text-sm text-[#5B6688] transition-colors hover:bg-[#EEF0F6]">
          <Plus className="h-4 w-4" /> Agregar predio
        </button>
      </div>

      {/* Datos del predio activo */}
      <div className="border-t border-[#E8EAF1] px-4 py-4">
        <p className="mb-3 text-sm font-medium">Datos del predio</p>
        <div className="space-y-3">
          <Field label="Nombre" defaultValue={predioActivo.nombre} />
          <Field label="Dirección" defaultValue={predioActivo.direccion} icon={<MapPin className="h-3.5 w-3.5" />} />
          <Field label="Teléfono" defaultValue={predioActivo.telefono} icon={<Phone className="h-3.5 w-3.5" />} />
          <Field label="Horario de atención" defaultValue={predioActivo.horario} icon={<Clock3 className="h-3.5 w-3.5" />} />
        </div>
      </div>

      {/* Canchas del predio activo */}
      <div className="border-t border-[#E8EAF1] px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Canchas</p>
          <button className="flex items-center gap-1 text-xs text-[#243054] hover:underline">
            <Plus className="h-3.5 w-3.5" /> Agregar
          </button>
        </div>
        <ul className="space-y-2">
          {canchas.map((cancha) => (
            <li key={cancha.id} className="rounded-lg border border-[#E8EAF1] px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{cancha.nombre}</p>
                  <p className="text-xs text-[#9AA2B8]">
                    {cancha.deporte} · {formatPrecio(cancha.precio)}/h
                  </p>
                </div>
                <button
                  className="shrink-0 rounded-md p-1 text-[#9AA2B8] transition-colors hover:bg-[#EEF0F6] hover:text-[#243054]"
                  aria-label={`Editar ${cancha.nombre}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    cancha.activa ? "bg-[#243054]" : "bg-[#E8EAF1]"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      cancha.activa ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </span>
                <span className="text-xs text-[#5B6688]">{cancha.activa ? "Activa" : "Inactiva"}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Field({
  label,
  defaultValue,
  icon,
}: {
  label: string;
  defaultValue: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-[#9AA2B8]">{label}</span>
      <span className="flex items-center gap-2 rounded-md border border-[#E8EAF1] px-2.5 py-2">
        {icon && <span className="text-[#9AA2B8]">{icon}</span>}
        <input
          defaultValue={defaultValue}
          className="w-full bg-transparent text-sm text-[#243054] outline-none"
        />
      </span>
    </label>
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
      <p className="mt-2 font-['Space_Grotesk',sans-serif] text-2xl font-medium tabular-nums sm:text-3xl">
        {value}
      </p>
    </div>
  );
}