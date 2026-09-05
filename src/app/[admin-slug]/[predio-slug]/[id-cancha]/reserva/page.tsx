"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Header } from "@/src/components/header/userPages/Header";
import { Loader } from "@/src/components/loader/Loader";
import { AvisoTokenDialog } from "@/src/components/reservas/AvisoTokenDialog";
import { DatosReserva, ReservaForm } from "@/src/components/reservas/ReservaForm";

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

    const [enviando, setEnviando] = useState(false);
    const [confirmada, setConfirmada] = useState(false);
    const [mostrarDialogo, setMostrarDialogo] = useState(false);

    const fecha = searchParams.get("fecha");
    const inicio = searchParams.get("inicio");
    const fin = searchParams.get("fin");
    const turnoValido = Boolean(fecha && inicio && fin);

    useEffect(() => {
        if (!id) return;
        const fetchCancha = async () => {
            try {
                const result = await fetch(`/api/canchas/${id}`);
                if (!result.ok) {
                    throw new Error("No se pudo obtener la cancha");
                }
                const data = await result.json();
                setCancha(data.cancha);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCancha();
    }, [id]);

    // Este timeout es para que la ventanita no se muestre enseguida, sino que se cumpla la animación
    useEffect(() => {
        if (!turnoValido) return;
        const timer = setTimeout(() => {
            setMostrarDialogo(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [turnoValido]);


    // Ver bien cuando conectemos con el backend
    const handleSubmitReserva = async (datos: DatosReserva) => {
        setEnviando(true);

        try {
            // Ejemplo de integración futura:
            // const result = await fetch("/api/reservas", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ ...datos, canchaId: id, fecha, inicio, fin }),
            // });
            // if (!result.ok) throw new Error("No se pudo crear la reserva");

            console.log("Datos de la reserva:", datos);

            setConfirmada(true);
        } catch (error) {
            console.error(error);
        } finally {
            setEnviando(false);
        }
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
                    </section>
                ) : confirmada ? (
                    <section className="rounded-xl border border-emerald-200 bg-white p-6 text-center">
                        <h2 className="text-xl font-extrabold">Datos listos</h2>
                        <p className="mt-2 text-sm text-[#243054]/60">
                            La confirmación final se habilitará al conectar el servicio de reservas.
                        </p>
                    </section>
                ) : (
                    <ReservaForm cancha={cancha} fecha={fecha} inicio={inicio} fin={fin} enviando={enviando} onSubmitReserva={handleSubmitReserva}/> 
                    )}
            </main>

            {mostrarDialogo && !confirmada && (
                <AvisoTokenDialog onCerrar={() => setMostrarDialogo(false)} />
            )}
        </div>
    );
}