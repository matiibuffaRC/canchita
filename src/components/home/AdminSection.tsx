"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BarChart3, CalendarClock, UserX } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const perks = [
    {
        icon: CalendarClock,
        text: "Gestioná todos tus turnos desde un solo lugar",
    },
    {
        icon: BarChart3,
        text: "Accedé a estadísticas de ocupación y tomá desiciones",
    },  
    {
        icon: UserX,
        text: "Reducí el ausentismo con confirmaciones automáticas",
    },
];

export default function AdminSection() {
    const handleScrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
    <>
        <section
            id="administradores"
            aria-labelledby="admin-title"
            className="relative scroll-mt-28 overflow-hidden bg-[#243054] px-6 py-20 text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"
            />
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:justify-between border-t border-white/20 pt-20">
                <Reveal className="max-w-xl text-center md:text-start">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-white/50">
                        Para administradores
                    </span>

                    <h2
                        id="admin-title"
                        className="nunito mt-3 text-3xl font-bold md:text-4xl"
                    >
                        ¿Tenés un predio deportivo?
                    </h2>

                    <p className="nunito mt-3 leading-8 text-white/70">
                        Sumá tu cancha a Canchita y empezá a recibir reservas online, sin
                        llamadas ni planillas.
                    </p>

                    <button
                        onClick={() => handleScrollToSection("contacto")}
                        className="nunito cursor-pointer font-bold mt-6 inline-block rounded-4xl bg-white px-7 py-3.5 text-sm text-[#243054] shadow-lg shadow-black/10 transition-all duration-300 hover:-rotate-2 hover:bg-white/90 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Quiero sumar mi cancha
                    </button>
                </Reveal>

                <Reveal className="flex w-full max-w-sm flex-col gap-4" delay={0.15}>
                    {perks.map((perk) => (
                        <div
                            key={perk.text}
                            className="nunito flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:translate-x-2 transition-all duration-300"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                <perk.icon className="h-5 w-5" />
                            </div>
                            <p className="text-sm leading-6 text-white/85">{perk.text}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
        <section
            className='scroll-mt-28 overflow-hidden bg-white px-6 py-20 text-[#243054] flex items-center justify-center max-w-6xl gap-10 mx-auto border-b border-gray-200'
        >
            <Image 
                src="/imgs/adminDashboardView2.png" 
                alt="Vista de panel de los administrador" 
                width={500} height={500} 
                priority 
                className="relative z-10 shadow-md transition-transform duration-500 hover:scale-105 motion-reduce:transition-none " 
            />
            <div className='flex flex-col justify-center items-start gap-5'>
                <div>
                    <h2 className="nunito text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                        Dejá de coordinar tus turnos por Whatsapp
                    </h2>
                    <h3 className="nunito max-w-xl text-md md:text-lg leading-8 text-gray-600 md:mx-0 ">
                        Tus clientes eligen día y horario desde tu link, las 24 horas. Vos ves la agenda ordenada por día de tus canchas y tus predios.
                    </h3>
                </div>
                <div className="px-0 mt-5 md:mt-2 flex justify-center gap-4 sm:flex-row md:justify-start">
                    <button
                        onClick={() => handleScrollToSection("como-funciona")}
                        className="group cursor-pointer rounded-full text-sm bg-[#243054] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#243054]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2644] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] flex items-center gap-2"
                    >
                        Probar demo
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-180" />
                    </button>
                </div>
            </div>
        </section>
    </>
    );
}
