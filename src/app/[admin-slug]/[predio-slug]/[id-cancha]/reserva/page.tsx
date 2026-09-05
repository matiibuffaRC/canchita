"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Header } from "@/src/components/header/userPages/Header";
import { Loader } from "@/src/components/loader/Loader";

type Cancha = {
    nombre: string;
    tipo: string;
};

export default function ReservaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { "id-cancha": id } = useParams<{ "id-cancha": string }>();
    const [cancha, setCancha] = useState<Cancha | null>(null);
    const [loading, setLoading] = useState(true);

    // Variables de entorno a eliminar 
    const [enviando, setEnviando] = useState(false);
    const [confirmada, setConfirmada] = useState(false);
    const [mostrarDialogo, setMostrarDialogo] = useState(false);

    const fecha = searchParams.get("fecha");
    const inicio = searchParams.get("inicio");
    const fin = searchParams.get("fin");
    const turnoValido = Boolean(fecha && inicio && fin);

    useEffect(() => {
        if (!id) return;
        const fetchCancha = async() => {
            try{
                const result = await fetch(`/api/canchas/${id}`);
                if(!result.ok){
                    throw new Error("No se pudo obtener la cancha");
                }
                const data = await result.json();
                setCancha(data.cancha);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCancha();
    }, [id]);

    // Muestra el aviso unos segundos después de entrar a la página
    useEffect(() => {
        if (!turnoValido) return;
        const timer = setTimeout(() => {
            setMostrarDialogo(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [turnoValido]);

    const enviarFormulario = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEnviando(true);

        setTimeout(() => {
            setEnviando(false);
            setConfirmada(true);
        }, 400);
    };

    if (loading) return <Loader />;

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito">
            <Header titulo="Completar reserva" />

            <main className="w-full max-w-3xl p-5">
                {!turnoValido ? (
                <section className="rounded-xl border border-red-200 bg-white p-6 text-center">
                    <h2 className="text-xl font-extrabold">
                        El turno ya no está disponible
                    </h2>
                    <p className="mt-2 text-sm text-[#243054]/60">
                        Volvé a seleccionar una fecha y un horario para continuar.
                    </p>
                    <button type="button" onClick={() => router.back()} className="mt-5 cursor-pointer rounded-lg bg-[#243054] px-5 py-3 text-sm font-extrabold text-white" >
                        Volver a horarios
                    </button>
                </section>) 
                : confirmada ? (
                <section className="rounded-xl border border-emerald-200 bg-white p-6 text-center">
                    <h2 className="text-xl font-extrabold">Datos listos</h2>
                    <p className="mt-2 text-sm text-[#243054]/60">
                        La confirmación final se habilitará al conectar el servicio de reservas.
                    </p>
                </section>
                ) : (
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

                    <form onSubmit={enviarFormulario} className="flex flex-col gap-5 py-3" >
                        <label className="flex flex-col text-md font-bold" htmlFor="nombre" >
                            Nombre completo
                            <input id="nombre" name="nombre" type="text" required autoComplete="name" placeholder="Ej: Juan Pérez" className="rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                        </label>
                        <label className="flex flex-col text-md font-bold" htmlFor="telefono" >
                            Teléfono
                            <input id="telefono" name="telefono" type="tel" required autoComplete="tel" placeholder="Ej: 11 1234 5678" className="rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                        </label>
                        <label className="flex flex-col text-md font-bold" htmlFor="email" >
                            Email
                            <input id="email" name="email" type="email" required autoComplete="email" placeholder="tu@email.com" className="rounded-lg border border-[#243054]/15 px-4 py-3 font-normal outline-none focus:border-[#243054] bg-white" />
                        </label>
                        <button type="submit" disabled={enviando} className="cursor-pointer rounded-lg bg-[#243054] px-5 py-3 font-extrabold text-white transition hover:bg-[#1a2340] disabled:cursor-wait disabled:opacity-60" >
                            {enviando ? "Guardando datos..." : "Confirmar reserva"}
                        </button>
                    </form>
                </>
                )}
            </main>

            {mostrarDialogo && !confirmada && (
                <div className="fadeTop fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
                    <div className="w-full max-w-3xl rounded-xl border border-[#243054]/10 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <p className="text-sm text-[#243054]/70">
                                Completá el formulario para continuar con la reserva e ingresa el token enviado a tu correo para confirmar tu turno.
                            </p>
                            <button type="button" onClick={() => setMostrarDialogo(false)} className="shrink-0 cursor-pointer text-sm font-extrabold text-[#243054]/50 hover:text-[#243054]" aria-label="Cerrar" >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}