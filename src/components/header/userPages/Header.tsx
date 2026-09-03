type HeaderProps = {
    titulo: string;
};

export function Header({ titulo }: HeaderProps) {
    return (
        <header className="relative px-5 pt-5 pb-3 flex justify-center items-center gap-1 border-b-2 border-[#243054]/10 w-full max-w-3xl">
            <button type="button" aria-label="Volver" className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-sm transition hover:bg-[#243054]/5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]" onClick={() => window.history.back()} >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="#1A1D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <h1 className="text-lg md:text-xl font-extrabold text-[#1A1D29]">
                {titulo}
            </h1>
        </header>
    );
}