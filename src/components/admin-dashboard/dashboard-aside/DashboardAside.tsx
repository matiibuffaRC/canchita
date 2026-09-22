"use client";

import { X } from "lucide-react";

import type { SidebarSelection } from "../SideBar";
import ResourceEditor from "./ResourceEditor";
import { UpcomingReservations } from "./UpcomingReservations";

type DashboardAsideProps = {
  adminSlug: string;
  selection: SidebarSelection | null;
  onSelectionChange: (selection: SidebarSelection) => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function DashboardAside({
  adminSlug,
  selection,
  onSelectionChange,
  onClose,
  isOpen,
}: DashboardAsideProps) {
  if (!selection) return null;

  const selectionKey =
    selection.tipo === "cancha"
      ? `cancha-${selection.cancha?.id_cancha}`
      : `predio-${selection.predio.id_predio}`;

  return (
    <aside
      aria-hidden={!isOpen}
      className={`flex w-full shrink-0 flex-col overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out lg:h-full lg:overflow-y-auto lg:pr-1 lg:transition-[width,opacity,transform] ${
        isOpen
          ? "max-h-[1200px] translate-y-0 opacity-100 lg:w-80 lg:translate-x-0 lg:translate-y-0"
          : "max-h-0 translate-y-4 opacity-0 lg:w-0 lg:translate-x-4 lg:translate-y-0 lg:pr-0"
      }`}
    >
      <div className="relative min-h-0 space-y-4 border-t border-[#243054]/10 p-4 lg:border-0 lg:p-0">
        <div className="flex items-center justify-between lg:mb-1">
          <h2 className="text-sm font-extrabold text-[#243054]">Información y actividades</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar información y actividades"
            title="Cerrar"
            className="flex size-8 items-center justify-center rounded-md text-[#243054]/70 transition hover:bg-[#243054]/10 hover:text-[#243054]"
          >
            <X className="size-4" />
          </button>
        </div>
        <UpcomingReservations adminSlug={adminSlug} />
        <div key={selectionKey}>
          <ResourceEditor selection={selection} onSaved={onSelectionChange} />
        </div>
      </div>
    </aside>
  );
}
