"use client";

type AvisoTokenDialogProps = {
    onCerrar: () => void;
};

export function AvisoTokenDialog({ onCerrar }: AvisoTokenDialogProps) {
    return (
        <div className="fadeTop fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
            <div className="w-full max-w-3xl rounded-xl border border-[#243054]/10 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-[#243054]/70">
                        Completá el formulario para continuar con la reserva e ingresa el token
                        enviado a tu correo para confirmar tu turno.
                    </p>
                    <button type="button" onClick={onCerrar} className="shrink-0 cursor-pointer text-sm font-extrabold text-[#243054]/50 hover:text-[#243054]" aria-label="Cerrar" >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}