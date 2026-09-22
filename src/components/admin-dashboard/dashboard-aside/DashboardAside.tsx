"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

import type { SidebarSelection } from "../SideBar";
import ResourceEditor from "./ResourceEditor";
import { UpcomingReservations } from "./UpcomingReservations";

type DashboardAsideProps = {
  adminSlug: string;
  selection: SidebarSelection | null;
  onSelectionChange: (selection: SidebarSelection) => void;
  isOpen: boolean;
};

export default function DashboardAside({
  adminSlug,
  selection,
  onSelectionChange,
  isOpen,
}: DashboardAsideProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!selection || !isOpen) return null;

  const selectionKey =
    selection.tipo === "cancha"
      ? `cancha-${selection.cancha?.id_cancha}`
      : `predio-${selection.predio.id_predio}`;

  return (
    <aside className="flex w-full shrink-0 flex-col lg:h-full lg:w-80 lg:overflow-y-auto lg:pr-1">
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="flex items-center justify-between border-y border-[#243054]/10 bg-white px-4 py-3 text-left text-sm font-extrabold text-[#243054] lg:hidden"
        aria-expanded={mobileOpen}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          Información y próximas actividades
        </span>
        <ChevronDown
          className={`size-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`${mobileOpen ? "grid" : "hidden"} gap-4 p-4 lg:grid lg:p-0`}
      >
        <UpcomingReservations adminSlug={adminSlug} />
        <div key={selectionKey}>
          <ResourceEditor selection={selection} onSaved={onSelectionChange} />
        </div>
      </div>
    </aside>
  );
}
