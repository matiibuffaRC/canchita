"use client";

import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { generarTurnos, Turno } from "@/src/lib/turnos/turnos";

type TurnoReservado = {
  horaInicio: string;
};

type TurnosResponse = {
  turnos: TurnoReservado[];
};

export function useTurnosDisponibles(
  idCancha: number | undefined,
  fecha: Dayjs | null,
  horarioApertura: string | undefined,
  horarioCierre: string | undefined,
  duracion: number | string | undefined,
) {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tieneConfiguracion = Boolean(
    idCancha && fecha && horarioApertura && horarioCierre && duracion,
  );

  useEffect(() => {
    if (
      !idCancha ||
      !fecha ||
      !horarioApertura ||
      !horarioCierre ||
      !duracion
    ) {
      return;
    }

    const fetchTurnos = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          id_cancha: String(idCancha),
          fecha: fecha.format("YYYY-MM-DD"),
        });

        const res = await fetch(`/api/turnos?${params.toString()}`);

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(
            body?.message ?? "No se pudieron obtener los turnos reservados",
          );
        }

        const data: TurnosResponse = await res.json();
        const reservados = data.turnos ?? [];
        const turnosOcupados = reservados.map((t) => t.horaInicio.slice(0, 5));

        const disponibles = generarTurnos(
          fecha,
          horarioApertura,
          horarioCierre,
          duracion,
          turnosOcupados,
        );

        setTurnos(disponibles);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Error obteniendo los turnos disponibles";
        console.error(message);
        setError(message);
        setTurnos(
          generarTurnos(fecha, horarioApertura, horarioCierre, duracion),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [idCancha, fecha, horarioApertura, horarioCierre, duracion]);

  return {
    turnos: tieneConfiguracion ? turnos : [],
    loading: tieneConfiguracion && loading,
    error: tieneConfiguracion
      ? error
      : "Esta cancha no tiene configurados horario de apertura, horario de cierre o duración.",
  };
}
