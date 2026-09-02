'use client';

import CanchaCard from './CanchaCard';

type Cancha = {
    id_cancha: number;
    id_predio: number;
    duracion: number;
    nombre: string;
    precio: number;
    tipo: string;
};

type Props = {
    canchas: Cancha[];
    onSelectCancha: (id: number) => void;
};

function CanchasList({ canchas, onSelectCancha }: Props) {
    if (canchas.length === 0) {
        return (
            <p className="mt-3 text-sm text-[#243054]/60">
                Este predio todavía no tiene canchas cargadas.
            </p>
        );
    }

    return (
        <div className="mt-2 flex flex-col md:flex-row gap-3">
            {canchas.map((cancha) => (
                <CanchaCard
                    key={cancha.id_cancha}
                    cancha={cancha}
                    onSelect={() => onSelectCancha(cancha.id_cancha)}
                />
            ))}
        </div>
    );
}

export default CanchasList;