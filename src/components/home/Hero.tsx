"use client";

// Import dependencies
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../motion/Reveal";

export default function Hero() {
    const handleScrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (
        <section aria-labelledby="hero-title" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-89px)]" >
            {/* Background */}


            {/* Contenido */}
            <div className="relative z-10 flex flex-row items-center justify-center w-full max-w-6xl py-16 px-3">
                {/* Logo */}
                <Reveal className="hidden md:flex justify-center items-center select-none">
                    <div className="relative flex items-center justify-center rounded-full bg-transparent">
                        <div aria-hidden="true" className=" absolute h-44 w-44 rounded-full border border-[#243054]/10 bg-white/60 backdrop-blur-sm lg:h-52 lg:w-52 " />
                        <Image src="/icons/IconPNG.png" alt="Logo de Canchita" width={450} height={450} priority className="relative z-10 drop-shadow-[0_10px_20px_rgba(36,48,84,0.16)] transition-transform duration-500 hover:scale-105 motion-reduce:transition-none " />
                    </div>
                </Reveal>
                {/* Texto */}
                <Reveal className="text-center md:text-start" delay={0.05}>
                    <h1 className="py-1border rounded-full nunito text-2xl font-extrabold tracking-tight text-[#243054]/65 sm:text-2xl md:text-2xl">
                        Canchita - Turnos deportivos
                    </h1>
                    
                    <h2 id="hero-title" className="nunito text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" >
                        Reservá tu turno
                        <span className="block text-[#243054]/65">
                            de la forma más simple.
                        </span>
                    </h2>

                    <p className="nunito  max-w-xl text-md md:text-lg leading-8 text-gray-600 md:mx-0 ">
                        Encontrá tu cancha, elegí el día y horario que preferís y confirmá
                        tu reserva en pocos pasos.
                    </p>

                    <div className="px-0 mt-3 md:mt-2 flex justify-center gap-4 sm:flex-row md:justify-start">
                        <button onClick={() => handleScrollToSection("como-funciona")} className="cursor-pointer rounded-lg text-sm bg-[#243054] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#243054]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2644] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                            ¿Cómo funciona?
                        </button>

                        <Link href="/admin/login" className="rounded-lg border-2 text-sm border-[#243054] px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243054] hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                            Soy administrador
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
