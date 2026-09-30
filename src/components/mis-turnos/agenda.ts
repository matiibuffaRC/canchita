import type { ReservaPorEmail } from "./types";
import { obtenerEstadoTurno } from "./utils";

// Funciones puras de la agenda: no dependen de React, se pueden testear solas.

export const esProximo = (t: ReservaPorEmail) =>
    ["pendiente", "confirmado"].includes(obtenerEstadoTurno(t).toLowerCase());

const claveOrden = (t: ReservaPorEmail) => t.fecha.slice(0, 10) + t.horaInicio;

/** Próximos: del más cercano al más lejano. Anteriores: del más reciente al más viejo. */
export function separarProximosYAnteriores(turnos: ReservaPorEmail[]) {
    return {
        proximos: turnos
            .filter(esProximo)
            .sort((a, b) => claveOrden(a).localeCompare(claveOrden(b))),
        anteriores: turnos
            .filter((t) => !esProximo(t))
            .sort((a, b) => claveOrden(b).localeCompare(claveOrden(a))),
    };
}

function agruparPor(lista: ReservaPorEmail[], largo: number) {
    const grupos = new Map<string, ReservaPorEmail[]>();
    lista.forEach((t) => {
        const clave = t.fecha.slice(0, largo);
        grupos.set(clave, [...(grupos.get(clave) ?? []), t]);
    });
    return [...grupos.entries()];
}

/** [["2026-10", [...]], ...] respetando el orden de entrada */
export const agruparPorMes = (lista: ReservaPorEmail[]) => agruparPor(lista, 7);

/** [["2026-10-02", [...]], ...] respetando el orden de entrada */
export const agruparPorDia = (lista: ReservaPorEmail[]) => agruparPor(lista, 10);

export function parsearFecha(fecha: string) {
    const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);
    return new Date(anio, mes - 1, dia);
}

export function etiquetaMes(mes: string) {
    const [anio, m] = mes.split("-").map(Number);
    return new Intl.DateTimeFormat("es-AR", {
        month: "long",
        year: "numeric",
    }).format(new Date(anio, m - 1, 1));
}
