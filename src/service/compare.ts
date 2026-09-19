import bcrypt from "bcrypt";
import { buscarAdministradores } from "../models/auth.model";

type Admin = {
    email: string;
    password: string;
};

export const login = async (adminData: Admin) => {
    try {
        const admin = await buscarAdministradores(adminData.email);
        if (!admin) return null;

        const passwordValid = await bcrypt.compare(
            adminData.password,
            admin.contrasena || ""
        );

        if (!passwordValid) return null;

        const { contrasena: _contrasena, ...safeAdmin } = admin;
        return safeAdmin;
    } catch {
        return null;
    }
};