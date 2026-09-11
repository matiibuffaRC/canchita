import BrandPanel from "./BrandPanel";
import LoginForm, { AdminLoginData, LoginFormProps } from "./LoginForm";
export type { AdminLoginData };

export interface AdminLoginProps extends LoginFormProps {
    /** Nombre del club / cadena de predios que se muestra en el panel de marca */
    facilityName?: string;
}

export default function AdminLogin({ facilityName = "Canchita", ...formProps }: AdminLoginProps) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white nunito">
            <BrandPanel facilityName={facilityName} title="Gestioná tus turnos desde un solo lugar" description="Reservas, canchas y horarios de tu predio, organizados por día para que nunca se te cruce un turno." />

            <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-0">
                <LoginForm {...formProps} />
            </div>
        </div>
    );
}
