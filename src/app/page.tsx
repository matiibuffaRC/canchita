import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Steps from '../components/home/Steps';

export const metadata: Metadata = {
    title: 'Canchita - Turnos',
    description:
        'Reservá tu cancha de forma simple, rápida y sin complicaciones.',
};

const steps = [
    {
        number: '01',
        title: 'Elegí tu cancha',
        description:
            'Ingresá al predio y seleccioná la cancha que querés reservar.',
    },
    {
        number: '02',
        title: 'Elegí día y horario',
        description:
            'Consultá los horarios disponibles y seleccioná el que prefieras.',
    },
    {
        number: '03',
        title: 'Confirmá tu reserva',
        description:
            'Ingresá tus datos y confirmá la reserva de manera rápida y sencilla.',
    },
];

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-[#243054]">

            {/* Hero */}
            <section aria-labelledby="hero-title" className=" relative flex min-h-[calc(100vh-89px)] items-center justify-center overflow-hidden px-6 " >
                {/* Background */}
                <div aria-hidden="true" className=" pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(36,48,84,0.12),transparent_45%)] " />

                <div aria-hidden="true" className=" pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#243054]/5 blur-3xl " />

                <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#243054]/5 blur-3xl " />

                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#243054]/2.5 blur-3xl " />

                {/* Contenido */}
                {/* Fijarse bien que podemos centrar todo y que no queden tan separados el logo con el texto trabajando con el gap que está acá abajo, ver tranquilo */}
                <div className=" relative z-10 md:ml-20 lg:ml-35 grid w-full max-w-5xl items-center gap-5 py-16 md:grid-cols-2">
                    {/* Texto */}
                    <div className="text-center md:text-start md:ml-22">
                        <h1 className="nunito text-2xl font-extrabold tracking-tight text-[#243054]/65 sm:text-2xl md:text-2xl" >
                            Canchita - Turnos deportivos
                        </h1>
                        <h2 id="hero-title" className="nunito text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" >
                            Reservá tu cancha 

                            <span className="block text-[#243054]/65">
                                de forma simple.
                            </span>
                        </h2>

                        <p className="nunito mx-auto max-w-xl text-md md:text-lg leading-8 text-gray-600 md:mx-0 " >
                            Encontrá tu cancha, elegí el día y horario
                            que preferís y confirmá tu reserva en pocos pasos.
                        </p>

                        <div className="mt-6 md:mt-2 flex flex-col justify-center gap-4 sm:flex-row md:justify-start" >
                            <Link href="#como-funciona" className="rounded-4xl text-sm bg-[#243054] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#243054]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2644] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                                ¿Cómo funciona?
                            </Link>

                            <Link href="/admin" className="rounded-4xl border-2 text-sm border-[#243054] px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243054] hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054] " >
                                Soy administrador
                            </Link>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="hidden justify-center md:flex md:justify-start ">
                        <div className="relative flex h-120 w-125 items-center justify-center rounded-full bg-transparent lg:h-64 lg:w-64 " >
                            <div aria-hidden="true" className=" absolute h-44 w-44 rounded-full border border-[#243054]/10 bg-white/60 backdrop-blur-sm lg:h-52 lg:w-52 " />

                            <Image src="/icons/IconPNG.png" alt="Logo de Canchita" width={450} height={450} priority className=" relative z-10 drop-shadow-[0_10px_20px_rgba(36,48,84,0.16)] transition-transform duration-500 hover:scale-105 motion-reduce:transition-none " />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo funciona */}
            <section id="como-funciona" aria-labelledby="steps-title" className=" relative scroll-mt-8 overflow-hidden bg-[#243054] px-6 py-20 text-white " >
                <div aria-hidden="true" className=" pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl " />

                <div className="relative z-10 mx-auto max-w-6xl">

                    <div className="mx-auto max-w-2xl text-center">

                        <span className=" nunito text-sm font-semibold uppercase tracking-widest text-white/50 " >
                            Simple y rápido
                        </span>

                        <h2 id="steps-title" className=" nunito mt-3 text-3xl font-bold md:text-4xl " >
                            Reservar un turno nunca fue tan fácil
                        </h2>

                        <p className="nunito mt-4 text-white/70">
                            Elegí tu cancha, seleccioná el horario y listo.
                        </p>
                    </div>

                    <Steps steps={steps} />
                </div>
            </section>
        </main>
    );
}