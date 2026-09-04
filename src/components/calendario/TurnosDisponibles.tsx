import type { Turno } from "@/src/lib/turnos/turnos";

type TurnosDisponiblesProps = {
    turnos: Turno[];
    turnoSeleccionado: Turno | null;
    onSeleccionar: (turno: Turno) => void;
    onConfirmar: () => void;
};

export function TurnosDisponibles({ turnos, turnoSeleccionado, onSeleccionar, onConfirmar, }: TurnosDisponiblesProps) {
    return (
        <div className="mt-4 flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {turnos.map((turno) => {
                    const seleccionado = turnoSeleccionado?.inicio === turno.inicio;

                    return (
                        <button key={turno.inicio} type="button" disabled={!turno.disponible} aria-pressed={seleccionado} onClick={() => onSeleccionar(turno)} className={`cursor-pointer rounded-lg border-2  py-2.5 text-sm font-bold transition ${ !turno.disponible ? "cursor-not-allowed border-[#243054]/10 bg-[#243054]/5 text-[#243054]/35 line-through" : seleccionado ? "border-2 shadow-md border-[#243054]" : "border-[#243054]/15 bg-white text-[#243054] hover:border-[#243054] hover:bg-[#243054] hover:text-white" }`} >
                            {turno.inicio} - {turno.fin}
                        </button>
                    );
                    })
                }
            </div>

            
            <button type="button" disabled={!turnoSeleccionado} onClick={onConfirmar} className="w-full cursor-pointer rounded-lg bg-[#243054] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1a2340] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243054] disabled:cursor-not-allowed disabled:bg-[#243054]/20 disabled:text-[#243054]/45 disabled:hover:bg-[#243054]/20 sm:w-auto" >
                Confirmar turno
            </button>
            
        </div>
    );
}
