// Import dependencies
import { getVisualPorTipo } from "../../lib/predio/tipoVisual";
import Link from "next/link";

type Props = {
  cancha: Cancha;
  predioSlug: string;
  adminSlug: string;
  onSelect: () => void;
};

type Cancha = {
  id_cancha: number;
  id_predio: number;
  duracion: number;
  nombre: string;
  precio: number;
  tipo: string;
};

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

function CanchaCard({ cancha, onSelect, adminSlug, predioSlug }: Props) {
  const { nombre, duracion, precio, tipo } = cancha;
  const { Icon, bg, color } = getVisualPorTipo(tipo);

  return (
    <Link
      href={`/${adminSlug}/${predioSlug}/${cancha.id_cancha}`}
      className="w-full overflow-hidden rounded-2xl bg-white shadow-xs hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      onClick={onSelect}
    >
      <div className={`flex h-25 w-full items-center justify-center ${bg}`}>
        <Icon className={`h-14 w-14 ${color}`} />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-extrabold text-[#1A1D29]">{nombre}</h3>
          <span className="whitespace-nowrap text-lg font-extrabold text-[#243054]">
            {formatoPrecio.format(precio)}/h
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#243054]/5 px-3 py-1 text-xs font-semibold text-[#243054]">
            {duracion} min
          </span>
          <span className="rounded-full bg-[#243054]/10 px-3 py-1 text-xs font-semibold text-[#243054]">
            {tipo}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CanchaCard;
