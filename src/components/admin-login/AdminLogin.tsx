import BrandPanel from "./BrandPanel";
import LoginForm, { AdminLoginData, LoginFormProps } from "./LoginForm";
export type { AdminLoginData };

export interface AdminLoginProps extends LoginFormProps {
  /** Nombre del club / cadena de predios que se muestra en el panel de marca */
    facilityName?: string;
}

export default function AdminLogin({ facilityName = "Canchita", ...formProps }: AdminLoginProps) {
    return (
        <div className="nunito min-h-screen w-full bg-[#f5f7fb] md:flex md:items-center md:justify-center md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-275 flex-col overflow-hidden md:rounded-[30px] bg-[#f8fafc] shadow-[0_30px_90px_rgba(15,23,42,0.09)] md:flex-row md:items-stretch lg:max-w-270">
                <div className="md:w-[46%] lg:w-[52%]">
                    <BrandPanel facilityName={facilityName} title="Gestioná tus turnos desde un solo lugar" description="Reservas, canchas y horarios de tu predio, organizados por día para que nunca se te cruce un turno." />
                </div>

                <div className="flex flex-1 items-center justify-center bg-white md:bg-[#f8fafc] px-6 py-8 md:px-8 lg:px-10">
                    <div className="w-full max-w-107.5">
                        <LoginForm {...formProps} />
                    </div>
                </div>
            </div>
        </div>
    );
}
