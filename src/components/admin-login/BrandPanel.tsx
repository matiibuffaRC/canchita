import Image from "next/image";

interface BrandPanelProps {
    facilityName: string;
    title: string;
    description: string;
}

export default function BrandPanel({ facilityName, title, description }: BrandPanelProps) {
    return (
        <div className="nunito relative md:w-[42%] bg-[#243054] px-8 md:px-0 py-10 md:py-0 flex md:min-h-screen items-center overflow-hidden">
            {/* Grafismo de cancha, puramente decorativo */}
            <svg viewBox="0 0 400 400" className="absolute -right-16 -bottom-30 w-72 h-72 md:w-104 md:h-104 opacity-[0.07] pointer-events-none" fill="none" aria-hidden="true" >
                <rect x="20" y="20" width="360" height="360" rx="4" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="70" stroke="white" strokeWidth="3" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="3" />
                <circle cx="200" cy="200" r="4" fill="white" />
            </svg>

            <div className="relative z-10 max-w-sm mx-auto md:mx-0 md:ml-auto md:mr-10 text-white">
                <div className="flex items-center">
                    <Image src="/icons/IconPNG.png" alt="Logo de Canchita" width={40} height={40}/>
                    <span className="text-3xl font-semibold tracking-wide text-white/70">{facilityName}</span>
                </div>

                <h1 className="text-4xl md:text-5xl leading-[1.05] font-bold mb-1" >
                    {title}
                </h1>
                <p className="text-white/70 text-base leading-relaxed hidden md:block">{description}</p>
            </div>
        </div>
    );
}
