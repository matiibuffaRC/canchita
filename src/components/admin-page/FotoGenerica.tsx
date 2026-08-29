 // Ícono de cancha genérica — placeholder hasta que exista una foto real por predio

export default function FotoGenerica() {
    return (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-[#2f7a4f] via-[#1f5c3a] to-[#123322]">
            <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 h-full w-full text-white/25" >
                <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </div>
    );
}