"use client";

type AvisoTokenDialogProps = {
    onCerrar: () => void;
};

export function AvisoTokenDialog({ onCerrar }: AvisoTokenDialogProps) {
    return (
        <div className="fadeTop fixed inset-x-0 bottom-0 z-50 flex justify-center md:justify-end px-4 pb-4">
            <div className="w-full max-w-xl rounded-xl border border-[#243054]/10 bg-white p-5 shadow-sm">
                <div className="flex flex-row-reverse md:flex-row items-start justify-between gap-4">
                    <button type="button" onClick={onCerrar} className="shrink-0 cursor-pointer text-sm font-extrabold text-[#243054]/50 hover:text-[#243054]" aria-label="Cerrar" >
                        ✕
                    </button>
                    <p className="text-sm md:text-md text-[#243054]/70">
                        Completá el formulario para continuar con la reserva e ingresa el <span className='text-[#243054] font-bold'>token </span>
                        enviado a tu correo para confirmar tu turno.
                    </p>
                </div>
            </div>
        </div>
    );
}