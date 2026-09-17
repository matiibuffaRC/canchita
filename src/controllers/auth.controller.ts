import { login } from "../service/compare";

type Admin = {
    email: string,
    password: string
}

export const findAdmins = async(admin: Admin) => {
    try{
        const valid = await login(admin); // Se supone que admin = { email: string, password:string }
        console.log(valid)
    }catch(error){
        console.log("No se pudo efectuar la autenticación: ", error);
    }
} 