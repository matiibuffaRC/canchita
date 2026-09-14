import BrandPanel from "./BrandPanel";
import LoginForm, { AdminLoginData, LoginFormProps } from "./LoginForm";
export type { AdminLoginData };

export interface AdminLoginProps extends LoginFormProps {
    /** Nombre del club / cadena de predios que se muestra en el panel de marca */
    facilityName?: string;
}

export default function AdminLogin({ facilityName = "Canchita", ...formProps }: AdminLoginProps) {
    return (
        <div className="nunito min-h-screen w-full bg-white md:flex">
            <div className="md:w-[44%] md:p-6">
                <BrandPanel
                    facilityName={facilityName}
                    title="Gestioná tus turnos desde un solo lugar"
                    description="Reservas, canchas y horarios de tu predio, organizados por día para que nunca se te cruce un turno."
                />
            </div>

            <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-3 md:px-16 md:py-12">
                <LoginForm {...formProps} />
            </div>
        </div>
    );
}