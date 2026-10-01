import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export type TokenPayload = {
  email: string;
  id: number;
  slug: string;
  nombre: string;
  apellido: string;
  rol: "admin";
};

export async function generarToken(payload: TokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}
