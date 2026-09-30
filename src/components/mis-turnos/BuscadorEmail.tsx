import type { FormEvent } from "react";
import { Search } from "lucide-react";

type BuscadorEmailProps = {
    email: string;
    cargando: boolean;
    onEmailChange: (email: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// Incluye el encabezado de la sección (título + explicación) y el formulario.
export function BuscadorEmail({
    email,
    cargando,
    onEmailChange,
    onSubmit,
}: BuscadorEmailProps) {
    return (
        <section className="border-b border-[#243054]/10 pb-6 sm:pb-8">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
                Encontrá tus turnos
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#243054]/65">
                Ingresá el email que usaste al reservar para ver tus turnos
                registrados.
            </p>

            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="email-turnos">
                    Email de la reserva
                </label>
                <input
                    id="email-turnos"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    placeholder="tu@email.com"
                    className="min-w-0 flex-1 rounded-lg border border-[#243054]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#243054] focus:ring-2 focus:ring-[#243054]/15"
                />
                <button
                    type="submit"
                    disabled={cargando}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#243054] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1A2340] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                    <Search aria-hidden="true" className="h-4 w-4" />
                    {cargando ? "Buscando..." : "Buscar turnos"}
                </button>
            </form>
        </section>
    );
}
