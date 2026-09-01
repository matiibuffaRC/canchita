function PadelIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 64" fill="none" className={className}>
            {/* Perímetro de la cancha */}
            <rect x="3" y="3" width="34" height="58" rx="2" stroke="currentColor" strokeWidth="2" />

            {/* Red al medio */}
            <line x1="3" y1="32" x2="37" y2="32" stroke="currentColor" strokeWidth="2.4" />

            {/* Líneas de servicio */}
            <line x1="3" y1="19" x2="37" y2="19" stroke="currentColor" strokeWidth="1.4" />
            <line x1="3" y1="45" x2="37" y2="45" stroke="currentColor" strokeWidth="1.4" />

            {/* Línea central que divide los cuadros de servicio */}
            <line x1="20" y1="19" x2="20" y2="45" stroke="currentColor" strokeWidth="1.4" />
        </svg>
    );
}

export default PadelIcon;