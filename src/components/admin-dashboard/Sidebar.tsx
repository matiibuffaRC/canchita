import { Clock3, MapPin, Pencil, Phone, Plus, X } from "lucide-react";
import type { Cancha, Predio } from "./types";
import { formatPrecio } from "./types";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  predios: Predio[];
  predioActivo: Predio | null;
  onSelectPredio: (id: number) => void;
  canchas: Cancha[];
};

export function Sidebar({
  open,
  onClose,
  predios,
  predioActivo,
  onSelectPredio,
  canchas,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85%] flex-col overflow-y-auto bg-white transition-transform duration-200 md:static md:z-auto md:w-80 md:shrink-0 md:translate-x-0 md:border-r md:border-[#E8EAF1] ${open ? "translate-x-0 shadow-xl" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b border-[#E8EAF1] px-4 py-4">
        <div>
          <p className="font-['Space_Grotesk',sans-serif] text-base font-medium">
            Mis predios
          </p>
          <p className="text-xs text-[#5B6688]">
            Predios y canchas a tu nombre
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-[#5B6688] hover:bg-[#EEF0F6] md:hidden"
          aria-label="Cerrar menú"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-2 px-4 py-4">
        {predios.map((predio) => (
          <button
            key={predio.id_predio}
            onClick={() => onSelectPredio(predio.id_predio)}
            className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${predio.id_predio === predioActivo?.id_predio ? "border-[#243054] bg-[#243054] text-white" : "border-[#E8EAF1] text-[#243054] hover:bg-[#EEF0F6]"}`}
          >
            <p className="text-sm font-medium">{predio.nombre}</p>
            <p
              className={`mt-0.5 flex items-center gap-1 text-xs ${predio.id_predio === predioActivo?.id_predio ? "text-white/70" : "text-[#9AA2B8]"}`}
            >
              <MapPin className="h-3 w-3 shrink-0" />
              {predio.direccion}
            </p>
          </button>
        ))}
        <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#C7CCDB] py-2.5 text-sm text-[#5B6688] hover:bg-[#EEF0F6]">
          <Plus className="h-4 w-4" />
          Agregar predio
        </button>
      </div>
      {predioActivo && (
        <>
          <div className="border-t border-[#E8EAF1] px-4 py-4">
            <p className="mb-3 text-sm font-medium">Datos del predio</p>
            <div className="space-y-3">
              <Field label="Nombre" value={predioActivo.nombre} />
              <Field
                label="Dirección"
                value={predioActivo.direccion}
                icon={<MapPin className="h-3.5 w-3.5" />}
              />
              <Field
                label="Teléfono"
                value={predioActivo.telefono}
                icon={<Phone className="h-3.5 w-3.5" />}
              />
              <Field
                label="Horario de atención"
                value={predioActivo.horario ?? "No especificado"}
                icon={<Clock3 className="h-3.5 w-3.5" />}
              />
            </div>
          </div>
          <div className="border-t border-[#E8EAF1] px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Canchas</p>
              <button className="flex items-center gap-1 text-xs text-[#243054] hover:underline">
                <Plus className="h-3.5 w-3.5" />
                Agregar
              </button>
            </div>
            <ul className="space-y-2">
              {canchas.map((cancha) => (
                <li
                  key={cancha.id_cancha}
                  className="rounded-lg border border-[#E8EAF1] px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {cancha.nombre}
                      </p>
                      <p className="text-xs text-[#9AA2B8]">
                        {cancha.tipo} · {formatPrecio(cancha.precio)}/h
                      </p>
                    </div>
                    <button
                      className="shrink-0 rounded-md p-1 text-[#9AA2B8] hover:bg-[#EEF0F6] hover:text-[#243054]"
                      aria-label={`Editar ${cancha.nombre}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-[#5B6688]">
                    {cancha.duracion}h por turno
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </aside>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-[#9AA2B8]">{label}</span>
      <span className="flex items-center gap-2 rounded-md border border-[#E8EAF1] px-2.5 py-2">
        {icon && <span className="text-[#9AA2B8]">{icon}</span>}
        <input
          readOnly
          value={value}
          className="w-full bg-transparent text-sm text-[#243054] outline-none"
        />
      </span>
    </label>
  );
}
