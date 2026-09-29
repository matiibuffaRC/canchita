import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmailConfirmacion(
  email: string,
  token: string
) {
  const urlConfirmacion =
    `http://localhost:3000/api/turnos/confirmar?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmá tu turno",
    html: `
      <h1>Confirmá tu turno</h1>

      <p>Tu turno fue registrado correctamente.</p>

      <p>
        Para confirmar tu reserva, hacé clic en el siguiente botón:
      </p>

      <a href="${urlConfirmacion}">
        Confirmar mi turno
      </a>

      <p>Este enlace tiene una duración limitada.</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}