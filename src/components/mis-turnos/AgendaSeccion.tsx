import { AgendaDia } from "./AgendaDia";
import { agruparPorDia, agruparPorMes, etiquetaMes } from "./agenda";
import type { ReservaPorEmail } from "./types";

// Sección ("Próximos" / "Anteriores") agrupada por mes y, dentro, por día.
export function AgendaSeccion({
    titulo,
    turnos,
}: {
    titulo: string;
    turnos: ReservaPorEmail[];
}) {
    if (turnos.length === 0) return null;

    return (
        <div className="mt-6 first:mt-0">
            <h3 className="text-lg font-extrabold">{titulo}</h3>
            {agruparPorMes(turnos).map(([mes, delMes]) => (
                <div key={mes}>
                    <p className="mb-2 mt-5 text-sm font-extrabold capitalize text-[#243054]/70">
                        {etiquetaMes(mes)}
                    </p>
                    <ul className="space-y-5">
                        {agruparPorDia(delMes).map(([dia, delDia]) => (
                            <li key={dia}>
                                <AgendaDia fecha={dia} turnos={delDia} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
