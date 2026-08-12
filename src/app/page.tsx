import Image from 'next/image';
import Link from 'next/link';

import Steps from '@/components/home/Steps';

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
        <main className="min-h-screen bg-white text-[#243054]">

            {/* ==================== NAVBAR ==================== */}
            <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/icons/IconPNG.png"
                        alt="Canchita Logo"
                        width={48}
                        height={48}
                        priority
                    />

                    <span className="text-2xl font-bold tracking-tight">
                        Canchita
                    </span>
                </Link>

                <Link
                    href="/admin"
                    className="
                        rounded-lg
                        border border-[#243054]
                        px-5 py-2.5
                        text-sm font-semibold
                        transition-all duration-300
                        hover:bg-[#243054]
                        hover:text-white
                    "
                >
                    Iniciar sesión
                </Link>

            </nav>


            {/* ==================== HERO ==================== */}
            <section
                className="
                    relative flex min-h-[calc(100vh-89px)]
                    items-center justify-center
                    overflow-hidden px-6
                "
            >

                {/* Background principal */}
                <div
                    className="
                        pointer-events-none absolute inset-0
                        bg-[radial-gradient(circle_at_50%_35%,rgba(36,48,84,0.12),transparent_45%)]
                    "
                />

                {/* Glow superior derecho */}
                <div
                    className="
                        pointer-events-none absolute
                        -right-32 -top-32
                        h-96 w-96
                        rounded-full
                        bg-[#243054]/5
                        blur-3xl
                    "
                />

                {/* Glow inferior izquierdo */}
                <div
                    className="
                        pointer-events-none absolute
                        -bottom-40 -left-32
                        h-96 w-96
                        rounded-full
                        bg-[#243054]/5
                        blur-3xl
                    "
                />

                {/* Glow central */}
                <div
                    className="
                        pointer-events-none absolute
                        left-1/2 top-1/2
                        h-[500px] w-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#243054]/[0.025]
                        blur-3xl
                    "
                />


                {/* Contenido */}
                <div
                    className="
                        relative z-10
                        mx-auto grid max-w-6xl
                        items-center gap-16
                        py-16 md:grid-cols-2
                    "
                >

                    {/* ==================== TEXTO ==================== */}
                    <div className="text-center md:text-left">

                        <span
                            className="
                                mb-5 inline-block
                                rounded-full
                                bg-[#243054]/10
                                px-4 py-2
                                text-sm font-semibold
                            "
                        >
                            Reservas deportivas simples
                        </span>

                        <h1
                            className="
                                text-5xl
                                font-extrabold
                                leading-tight
                                tracking-tight
                                md:text-6xl
                            "
                        >
                            Reservá tu cancha

                            <span className="block text-[#243054]/65">
                                de forma simple.
                            </span>
                        </h1>

                        <p
                            className="
                                mx-auto mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-gray-600
                                md:mx-0
                            "
                        >
                            Encontrá tu cancha, elegí el día y horario
                            que preferís y confirmá tu reserva en pocos pasos.
                        </p>

                        <div
                            className="
                                mt-8
                                flex flex-col
                                justify-center
                                gap-4
                                sm:flex-row
                                md:justify-start
                            "
                        >

                            <Link
                                href="#como-funciona"
                                className="
                                    rounded-xl
                                    bg-[#243054]
                                    px-7 py-3.5
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-[#243054]/20
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-[#1b2644]
                                    hover:shadow-xl
                                "
                            >
                                ¿Cómo funciona?
                            </Link>

                            <Link
                                href="/admin"
                                className="
                                    rounded-xl
                                    border-2
                                    border-[#243054]
                                    px-7 py-3.5
                                    font-semibold
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-[#243054]
                                    hover:text-white
                                "
                            >
                                Soy administrador
                            </Link>

                        </div>

                    </div>


                    {/* ==================== LOGO ==================== */}
                    <div className="flex justify-center">

                        <div
                            className="
                                relative
                                flex h-72 w-72
                                items-center justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-[#243054]/10
                                via-[#243054]/5
                                to-transparent
                                shadow-[0_20px_80px_rgba(36,48,84,0.12)]
                                md:h-96 md:w-96
                            "
                        >

                            {/* Círculo interior */}
                            <div
                                className="
                                    absolute
                                    h-60 w-60
                                    rounded-full
                                    border border-[#243054]/10
                                    bg-white/70
                                    shadow-inner
                                    backdrop-blur-sm
                                    md:h-80 md:w-80
                                "
                            />

                            {/* Logo */}
                            <Image
                                src="/icons/IconPNG.png"
                                alt="Canchita"
                                width={260}
                                height={260}
                                priority
                                className="
                                    relative
                                    drop-shadow-[0_15px_25px_rgba(36,48,84,0.18)]
                                    transition-transform
                                    duration-500
                                    hover:scale-105
                                "
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================== COMO FUNCIONA ==================== */}
            <section
                id="como-funciona"
                className="
                    relative
                    overflow-hidden
                    bg-[#243054]
                    px-6 py-20
                    text-white
                "
            >

                {/* Decoración */}
                <div
                    className="
                        pointer-events-none absolute
                        -right-40 -top-40
                        h-96 w-96
                        rounded-full
                        bg-white/5
                        blur-3xl
                    "
                />

                <div className="relative z-10 mx-auto max-w-6xl">

                    <div className="mx-auto max-w-2xl text-center">

                        <span
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-widest
                                text-white/50
                            "
                        >
                            Simple y rápido
                        </span>

                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            Reservar nunca fue tan fácil
                        </h2>

                        <p className="mt-4 text-white/70">
                            Elegí tu cancha, seleccioná el horario y listo.
                        </p>

                    </div>

                    <Steps steps={steps} />

                </div>

            </section>

        </main>
    );
}