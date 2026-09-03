'use client';

// Import dependencies
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    const handleScrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (
        <section aria-labelledby="hero-title" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-89px)]">
            {/* Background */}
            <div aria-hidden="true" className=" pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(36,48,84,0.12),transparent_45%)]" />
            <div aria-hidden="true" className=" pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#243054]/5 blur-3xl " />
            <div aria-hidden="true" className=" pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#243054]/5 blur-3xl " />
            <div aria-hidden="true" className=" pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#243054]/2.5 blur-3xl " />

            {/* Contenido */}
            <div className="relative z-10 flex flex-row-reverse items-center justify-center w-full max-w-5xl py-16 px-3">
                {/* Texto */}
                <div className="text-center md:text-start">

                    <h1 className="nunito text-2xl font-extrabold tracking-tight text-[#243054]/65 sm:text-2xl md:text-2xl" >
                        Canchita - Turnos deportivos
                    </h1>
                    <h2 id="hero-title" className="nunito text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" >
                        Reservá tu turno
                        <span className="block text-[#243054]/65">
                            de la forma más simple.
                        </span>
                    </h2>

                    <p className="nunito  max-w-xl text-md md:text-lg leading-8 text-gray-600 md:mx-0 " >
                        Encontrá tu cancha, elegí el día y horario
                        que preferís y confirmá tu reserva en pocos pasos.
                    </p>

                    <div className="px-15 md:px-0 mt-6 md:mt-2 flex flex-col justify-center gap-4 sm:flex-row md:justify-start" >
                        <button onClick={() => handleScrollToSection("como-funciona")} className="cursor-pointer rounded-4xl text-sm bg-[#243054] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#243054]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2644] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                            ¿Cómo funciona?
                        </button>

                        <Link href="/admin" className="rounded-4xl border-2 text-sm border-[#243054] px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243054] hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                            Soy administrador
                        </Link>
                    </div>
                </div>

                {/* Logo */}
                <div className="hidden md:flex justify-center items-center select-none">
                    <div className="relative flex items-center justify-center rounded-full bg-transparent">
                        <div aria-hidden="true" className=" absolute h-44 w-44 rounded-full border border-[#243054]/10 bg-white/60 backdrop-blur-sm lg:h-52 lg:w-52 " />
                        <Image src="/icons/IconPNG.png" alt="Logo de Canchita" width={350} height={350} priority className="relative z-10 drop-shadow-[0_10px_20px_rgba(36,48,84,0.16)] transition-transform duration-500 hover:scale-105 motion-reduce:transition-none " />
                    </div>
                </div>
            </div>
        </section>
    );
}