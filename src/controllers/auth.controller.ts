import { login } from "../service/compare";
import { generarToken } from "../util/jwt";

export const loginController = async (email: string, password: string) => {
  const admin = await login({ email, password });

  if (!admin) {
    throw new Error("Credenciales inválidas");
  }

  const token = await generarToken({
    email: admin.correo,
    id: admin.id_administrador,
    slug: admin.slug,
    nombre: admin.nombre,
    apellido: admin.apellido,
  });

  return { token };
};
