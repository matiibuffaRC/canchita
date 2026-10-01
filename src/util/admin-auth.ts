import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import type { TokenPayload } from "./jwt";

export async function obtenerAdminAutenticado(): Promise<TokenPayload | null> {
  const token = (await cookies()).get("token")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) return null;

  try {
    const { payload } = await jwtVerify<TokenPayload>(
      token,
      new TextEncoder().encode(jwtSecret),
    );

    if (
      payload.rol !== "admin" ||
      typeof payload.id !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.slug !== "string"
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function respuestaNoAutorizada() {
  return Response.json({ error: "Autenticación requerida" }, { status: 401 });
}

export function respuestaProhibida() {
  return Response.json(
    { error: "No tenés permiso para este recurso" },
    { status: 403 },
  );
}
