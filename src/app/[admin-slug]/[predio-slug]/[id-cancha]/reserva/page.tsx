"use client";

// Import dependencies
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// Import components
import { ErrorToast } from "@/src/components/admin-login/ErrorToast";
import { Header } from "@/src/components/header/userPages/Header";
import { Loader } from "@/src/components/loader/Loader";
import { AvisoTokenDialog } from "@/src/components/reservas/AvisoTokenDialog";
import {
  DatosReserva,
  ReservaForm,
} from "@/src/components/reservas/ReservaForm";
import { ReservaEmailEnviado } from "@/src/components/reservas/ReservaEmailEnviado";
import { TurnoConfirmado } from "@/src/components/reservas/TurnoConfirmado";

// Mientras el envío de mails no funcione, dejalo en false.
// Cuando esté listo, cambialo a true para volver al flujo "Revisá tu email".
const EMAIL_HABILITADO = false;

// "2026-08-14" -> "Viernes, 14 de agosto"
const formatearFecha = (fecha: string) => {
  const texto = new Date(`${fecha}T00:00:00`).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

type Cancha = {
  nombre: string;
  tipo: string;
};

type ReservaDraft = {
  idCancha: number | null;
  nombreCliente: string | null;
  telefonoCliente: string | null;
  emailCliente: string | null;
  fecha: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  estado: string;
};

export default function ReservaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { "id-cancha": id } = useParams<{ "id-cancha": string }>();
  const idCancha = parseInt(id, 10);

  // Variables de estado
  const [cancha, setCancha] = useState<Cancha | null>(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [errorReserva, setErrorReserva] = useState<string | null>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);

  // Variable donde almacenamos los datos de la reserva
  const [reserva, setReserva] = useState<ReservaDraft>({
    idCancha: null,
    nombreCliente: null,
    telefonoCliente: null,
    emailCliente: null,
    fecha: null,
    horaInicio: null,
    horaFin: null,
    estado: "Pendiente",
  });

  // Obtenemos los datos necesarios en la URL
  const fecha = searchParams.get("fecha");
  const inicio = searchParams.get("inicio");
  const fin = searchParams.get("fin");

  const turnoValido = Boolean(fecha && inicio && fin); // Si existen todos, es válido (NO chequea que estén disponibles, solo que existan)

  const almacenarReserva = async (datosReserva: ReservaDraft) => {
    try {
      const result = await fetch("/api/turnos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosReserva),
      });

      const data = await result.json();

      if (!result.ok) {
        const mensaje =
          data.message ?? data.error ?? "No se pudo crear la reserva";
        setErrorReserva(mensaje);
        return;
      }

      console.log(data);
      setConfirmado(true);
      setErrorReserva(null);
    } catch (error) {
      console.log(error);
      setErrorReserva("No se pudo crear la reserva. Intentá nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  // Obtenemos los datos de la cancha a reservar
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
    console.log("Día: " + fecha + " | Inicio: " + inicio + " | Fin " + fin);
  }, [id]);

  // Este timeout es para que la ventanita no se muestre enseguida, sino que se cumpla la animación
  useEffect(() => {
    if (!turnoValido) return;
    const timer = setTimeout(() => {
      setMostrarDialogo(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [turnoValido]);

  // Tomamos los datos del formulario
  const handleSubmitReserva = async (datos: DatosReserva) => {
    if (enviando) return; // guarda extra contra doble click/doble submit
    setEnviando(true);

    const nuevaReserva: ReservaDraft = {
      idCancha,
      nombreCliente: datos.nombre,
      telefonoCliente: datos.telefono,
      emailCliente: datos.email,
      fecha,
      horaInicio: inicio,
      horaFin: fin,
      estado: EMAIL_HABILITADO ? "Pendiente" : "Confirmado",
    };

    setReserva(nuevaReserva);
    await almacenarReserva(nuevaReserva);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F4F6F9] text-[#243054] nunito">
      <Header
        titulo={
          confirmado && EMAIL_HABILITADO
            ? "Confirmar reserva"
            : "Completar reserva"
        }
      />

      <main className="w-full max-w-3xl p-5">
        {!turnoValido ? (
          <section className="rounded-xl border border-red-200 bg-white p-6 text-center">
            <h2 className="text-xl font-extrabold">
              El turno ya no está disponible
            </h2>
            <p className="mt-2 text-sm text-[#243054]/60">
              Volvé a seleccionar una fecha y un horario para continuar.
            </p>
            <button
              type="button"
              onClick={() => router.back()}
              className="mt-5 cursor-pointer rounded-lg bg-[#243054] px-5 py-3 text-sm font-extrabold text-white"
            >
              Volver a horarios
            </button>
          </section>
        ) : confirmado ? (
          EMAIL_HABILITADO ? (
            <ReservaEmailEnviado email={reserva.emailCliente} />
          ) : (
            <TurnoConfirmado
              cancha={cancha?.nombre ?? "Cancha"}
              fecha={fecha ? formatearFecha(fecha) : ""}
              horario={`${inicio} - ${fin}`}
            />
          )
        ) : (
          <ReservaForm
            cancha={cancha}
            fecha={fecha}
            inicio={inicio}
            fin={fin}
            enviando={enviando}
            onSubmitReserva={handleSubmitReserva}
          />
        )}
      </main>

      {errorReserva && (
        <ErrorToast
          message={errorReserva}
          onClose={() => setErrorReserva(null)}
        />
      )}

      {mostrarDialogo && !confirmado && (
        <AvisoTokenDialog onCerrar={() => setMostrarDialogo(false)} />
      )}
    </div>
  );
}
