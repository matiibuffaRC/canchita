const bcrypt = require('bcrypt');
import { buscarAdministradores } from "../models/auth.model"

type Admin = {
    email: string,
    password: string
}

export const login = async (admin:Admin) => { // Recibimos admin = { email: string, password:string }

    const adminData = await buscarAdministradores(admin);

    if (!adminData) {
        return Error;
    }

    const passwordCorrecta = await bcrypt.compare(
        admin.password,
        adminData.password
    );

    if (!passwordCorrecta) {
        return null;
    }

    // acá continuarías con la creación del JWT
    return admin;

}