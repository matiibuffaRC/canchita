function FutbolIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 40" fill="none" className={className}>
            {/* Perímetro de la cancha */}
            <rect x="3" y="3" width="58" height="34" rx="2" stroke="currentColor" strokeWidth="2" />

            {/* Línea de mitad de cancha */}
            <line x1="32" y1="3" x2="32" y2="37" stroke="currentColor" strokeWidth="2" />

            {/* Círculo central */}
            <circle cx="32" cy="20" r="7" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="20" r="1.4" fill="currentColor" />

            {/* Área chica izquierda */}
            <rect x="3" y="12" width="9" height="16" stroke="currentColor" strokeWidth="2" />
            {/* Área chica derecha */}
            <rect x="52" y="12" width="9" height="16" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export default FutbolIcon;