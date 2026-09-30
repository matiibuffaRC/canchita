"use client";

import { useRouter } from "next/navigation";

type Props = {
    email?: string | null;
};

export function ReservaEmailEnviado({ email }: Props) {
    const router = useRouter();

    return (
        <section className="flex flex-col items-center px-2 pt-6 pb-4 text-center">
            {/* Ilustración: círculos concéntricos + sobre + badge de reloj */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[#243054]/5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#243054]/10">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#243054"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M3 10l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" />
                        <path d="M3 10l9 6 9-6" />
                    </svg>
                </div>

                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                    </svg>
                </span>
            </div>

            <h2 className="mt-8 text-3xl font-extrabold text-[#243054]">
                ¡Revisá tu email!
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#243054]/60">
                Te enviamos un email de confirmación
                {email ? (
                    <>
                        {" "}a <span className="font-bold text-[#243054]">{email}</span>
                    </>
                ) : null}
                . Hacé click en el enlace para asegurar tu turno.
            </p>

            <div className="mt-6 flex w-full max-w-sm items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left">
                <svg
                    className="mt-0.5 shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5" />
                    <path d="M12 8h.01" />
                </svg>
                <p className="text-xs font-bold leading-snug text-emerald-700">
                    ¿No lo encontrás? Revisá también tu carpeta de correo no deseado o spam.
                </p>
            </div>

            <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-10 w-full max-w-sm cursor-pointer rounded-xl bg-[#243054] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#243054]/20 transition-colors hover:bg-[#1c2644] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243054]"
            >
                Volver al Inicio
            </button>
        </section>
    );
}
