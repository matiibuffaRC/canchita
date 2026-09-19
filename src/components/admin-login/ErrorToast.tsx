import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ErrorToast({ message, onClose }: { message: string; onClose: () => void }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // pequeño delay para que el navegador registre el estado inicial
        // y la transición se dispare (entrada)
        const t = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(t);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 300); // espera a que termine la animación de salida
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return createPortal(
        <div
            role="alert"
            className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg transition-all duration-300 ease-out ${
                show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
            <div className="flex items-start gap-2">
                <span className="flex-1">{message}</span>
                <button
                    type="button"
                    onClick={() => {
                        setShow(false);
                        setTimeout(onClose, 300);
                    }}
                    className="text-red-400 hover:text-red-600"
                    aria-label="Cerrar"
                >
                    ✕
                </button>
            </div>
        </div>,
        document.body
    );
}