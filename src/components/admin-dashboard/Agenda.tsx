import type { Cancha, Turno } from "./types";
import { ESTADO_CONFIG, HORARIOS } from "./types";

type AgendaProps = {
  canchas: Cancha[];
  turnos: Turno[];
  canchaActivaId?: number;
  onSelectCancha: (id: number) => void;
};

export function Agenda({
  canchas,
  turnos,
  canchaActivaId,
  onSelectCancha,
}: AgendaProps) {
  const turnosDeCancha = turnos
    .filter((turno) => turno.canchaId === canchaActivaId)
    .sort((a, b) => a.hora.localeCompare(b.hora));
  const turnoEn = (canchaId: number, hora: string) =>
    turnos.find((turno) => turno.canchaId === canchaId && turno.hora === hora);
  return (
    <>
      <div className="flex items-center gap-4 px-4 pb-2 text-xs text-[#5B6688] sm:px-6 lg:px-8">
        {Object.values(ESTADO_CONFIG).map((estado) => (
          <div key={estado.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${estado.bg}`} />
            {estado.label}
          </div>
        ))}
      </div>
      <section className="px-4 pb-10 sm:px-6 md:hidden">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
          {canchas.map((cancha) => (
            <button
              key={cancha.id_cancha}
              onClick={() => onSelectCancha(cancha.id_cancha)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm ${canchaActivaId === cancha.id_cancha ? "border-[#243054] bg-[#243054] text-white" : "border-[#E8EAF1] text-[#5B6688]"}`}
            >
              {cancha.nombre}
              <span className="ml-1 opacity-70">· {cancha.tipo}</span>
            </button>
          ))}
        </div>
        <ul className="mt-2 divide-y divide-[#E8EAF1]">
          {turnosDeCancha.length === 0 && (
            <li className="py-10 text-center text-sm text-[#9AA2B8]">
              No hay turnos para esta cancha.
            </li>
          )}
          {turnosDeCancha.map((turno) => (
            <li key={turno.id} className="flex items-center gap-3 py-3">
              <div className="w-14 shrink-0 font-['Space_Grotesk',sans-serif] text-sm tabular-nums">
                {turno.hora}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{turno.cliente}</p>
                <p className="text-xs text-[#9AA2B8]">
                  {turno.duracionHoras}h de turno
                </p>
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
      <section className="hidden px-6 pb-10 md:block lg:px-8">
        <div className="overflow-x-auto rounded-lg border border-[#E8EAF1]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-20 border-b border-[#E8EAF1] px-3 py-3 text-left text-xs font-medium text-[#9AA2B8]">
                  Hora
                </th>
                {canchas.map((cancha) => (
                  <th
                    key={cancha.id_cancha}
                    className="border-b border-l border-[#E8EAF1] bg-[#F8F9FC] px-3 py-3 text-left"
                  >
                    <p className="font-['Space_Grotesk',sans-serif] text-sm font-medium">
                      {cancha.nombre}
                    </p>
                    <p className="text-xs font-normal text-[#9AA2B8]">
                      {cancha.tipo}
                    </p>
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
                  {canchas.map((cancha) => {
                    const turno = turnoEn(cancha.id_cancha, hora);
                    return (
                      <td
                        key={cancha.id_cancha}
                        className="border-b border-l border-[#E8EAF1] px-2 py-1.5 align-top"
                      >
                        {turno ? (
                          <div
                            className={`rounded-md px-2.5 py-1.5 ${ESTADO_CONFIG[turno.estado].bg} ${ESTADO_CONFIG[turno.estado].text}`}
                          >
                            <p className="truncate text-xs font-medium">
                              {turno.cliente}
                            </p>
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
    </>
  );
}
