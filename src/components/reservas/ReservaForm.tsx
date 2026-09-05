"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export type DatosReserva = {
    nombre: string;
    telefono: string;
    email: string;
};

type Cancha = {
    nombre: string;
    tipo: string;
};

type ReservaFormProps = {
    cancha: Cancha | null;
    fecha: string | null;
    inicio: string | null;
    fin: string | null;
    enviando: boolean;
    onSubmitReserva: (datos: DatosReserva) => void;
};

const CODIGOS_PAIS = [
    { codigo: "+54", pais: "Argentina", iso: "ar" },
    { codigo: "+56", pais: "Chile", iso: "cl" },
    { codigo: "+598", pais: "Uruguay", iso: "uy" },
    { codigo: "+595", pais: "Paraguay", iso: "py" },
    { codigo: "+591", pais: "Bolivia", iso: "bo" },
    { codigo: "+51", pais: "Perú", iso: "pe" },
    { codigo: "+34", pais: "España", iso: "es" },
];

export function ReservaForm({ cancha, fecha, inicio, fin, enviando, onSubmitReserva, }: ReservaFormProps) {
    const [codigoPais, setCodigoPais] = useState(CODIGOS_PAIS[0]);
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cierra el dropdown al hacer click afuera
    useEffect(() => {
        const handleClickFuera = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownAbierto(false);
            }
        };
        document.addEventListener("mousedown", handleClickFuera);
        return () => document.removeEventListener("mousedown", handleClickFuera);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const datos: DatosReserva = {
            nombre: String(formData.get("nombre") ?? ""),
            telefono: `${codigoPais.codigo} ${formData.get("telefono") ?? ""}`.trim(),
            email: String(formData.get("email") ?? ""),
        };

        onSubmitReserva(datos);
    };

    return (
        <>
            <div className="mb-2 px-2">
                <h2 className="mt-2 text-2xl font-extrabold">Completá con tus datos</h2>
            </div>

            <div className="mb-6 rounded-xl border border-[#243054]/10 bg-white p-5">
                <p className="text-sm font-bold uppercase tracking-widest text-[#243054]/50">
                    Turno elegido
                </p>
                <p className="text-lg font-extrabold">
                    {cancha?.nombre} - {cancha?.tipo}
                </p>
                <p className="text-sm text-[#243054]/65">
                    {fecha} · {inicio} a {fin}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-3">
                <label className="flex flex-col text-md font-bold" htmlFor="nombre">
                    Nombre completo
                    <input id="nombre" name="nombre" type="text" required autoComplete="name" placeholder="Ej: Juan Pérez" className="rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                </label>

                <label className="flex flex-col text-md font-bold" htmlFor="telefono">
                    Teléfono
                    <div className="flex gap-2">
                        <div ref={dropdownRef} className="relative">
                            <button type="button" onClick={() => setDropdownAbierto((prev) => !prev)} className="flex h-full items-center gap-2 rounded-lg border border-[#243054]/15 bg-white px-3 py-3 font-normal outline-none focus:border-[#243054]" aria-haspopup="listbox" aria-expanded={dropdownAbierto} >
                                <span className={`fi fi-${codigoPais.iso}`} />
                                <span>{codigoPais.codigo}</span>
                                <span className="text-xs text-[#243054]/40">▾</span>
                            </button>

                            {dropdownAbierto && (
                                <ul role="listbox" className="absolute left-0 top-full z-10 mt-1 max-h-60 w-48 overflow-y-auto rounded-lg border border-[#243054]/15 bg-white py-1 shadow-lg" >
                                    {CODIGOS_PAIS.map((item) => (
                                        <li key={item.codigo}>
                                            <button type="button" onClick={() => { setCodigoPais(item); setDropdownAbierto(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-normal hover:bg-[#F4F6F9]" >
                                                <span className={`fi fi-${item.iso}`} />
                                                <span>{item.codigo}</span>
                                                <span className="text-[#243054]/50">{item.pais}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <input id="telefono" name="telefono" type="tel" required autoComplete="tel" placeholder="Ej: 11 1234 5678" className="flex-1 rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                    </div>
                </label>

                <label className="flex flex-col text-md font-bold" htmlFor="email">
                    Email
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="tu@email.com" className="rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                </label>

                <button type="submit" disabled={enviando} className="cursor-pointer rounded-lg bg-[#243054] px-5 py-3 font-extrabold text-white transition hover:bg-[#1a2340] disabled:cursor-wait disabled:opacity-60" >
                    {enviando ? "Guardando datos..." : "Confirmar reserva"}
                </button>
            </form>
        </>
    );
}