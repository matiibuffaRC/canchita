import { buscarReservaPorToken, confirmarReserva } from "../models/turnos.model";

export async function confirmarTurnoService( token: string ) {

    const reserva = await buscarReservaPorToken(token);

    if (!reserva) {
        throw new Error("Token inválido");
    }

  // Verificar expiración

    if (new Date() > new Date(reserva.token_expira)) {

        throw new Error("El enlace de confirmación expiró");
    }

    // Verificar estado

    if (reserva.estado !== "pendiente") {
        throw new Error("La reserva ya fue procesada");
    }

  // Confirmar

    return await confirmarReserva(
        reserva.id_reserva
    );
}