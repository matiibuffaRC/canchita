import { AlertCircle, CheckCircle2, CircleCheck } from "lucide-react";
import type { EstadoTurno, Turno } from "./types";

type StatsProps = {
  turnos: Turno[];
};

const stats: Array<{
  estado: EstadoTurno;
  label: string;
  tono: "navy" | "ambar" | "gris";
  icon: typeof CheckCircle2;
}> = [
  {
    estado: "confirmado",
    label: "Confirmados",
    tono: "navy",
    icon: CheckCircle2,
  },
  {
    estado: "pendiente",
    label: "Pendientes",
    tono: "ambar",
    icon: AlertCircle,
  },
  {
    estado: "finalizado",
    label: "Finalizados",
    tono: "gris",
    icon: CircleCheck,
  },
];

export function Stats({ turnos }: StatsProps) {
  return (
    <section className="grid grid-cols-3 gap-3 px-4 py-4 sm:px-6 lg:px-8">
      {stats.map(({ estado, label, tono, icon: Icon }) => {
        const estilos = {
          navy: "bg-[#243054] text-white",
          ambar: "bg-[#FBF1E3] text-[#C6832B]",
          gris: "bg-[#F1F2F6] text-[#5B6688]",
        }[tono];
        return (
          <div
            key={estado}
            className={`rounded-lg px-3 py-3 sm:px-4 sm:py-4 ${estilos}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-80 sm:text-sm">{label}</span>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-2 font-['Space_Grotesk',sans-serif] text-2xl font-medium tabular-nums sm:text-3xl">
              {turnos.filter((turno) => turno.estado === estado).length}
            </p>
          </div>
        );
      })}
    </section>
  );
}
