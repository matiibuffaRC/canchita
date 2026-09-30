type FiltroEstadoProps = {
    valor: string;
    estados: string[];
    onChange: (estado: string) => void;
};

export function FiltroEstado({ valor, estados, onChange }: FiltroEstadoProps) {
    return (
        <label
            className="flex flex-col gap-1 text-sm font-bold sm:min-w-52"
            htmlFor="filtro-estado-turnos"
        >
            Filtrar por estado
            <select
                id="filtro-estado-turnos"
                value={valor}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-11 rounded-lg border border-[#243054]/15 bg-white px-4 font-normal outline-none transition focus:border-[#243054] focus:ring-2 focus:ring-[#243054]/15"
            >
                <option value="">Todos los estados</option>
                {estados.map((estado) => (
                    <option key={estado} value={estado}>
                        {estado}
                    </option>
                ))}
            </select>
        </label>
    );
}
