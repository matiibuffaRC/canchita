import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Contacto", href: "/#contacto" },
];  

const adminLinks = [
    { label: "Soy administrador", href: "/admin" },
    { label: "Reservá tu cancha", href: "/#inicio" },
];

export default function Footer() {
    return (
        <footer className="relative mt-auto overflow-hidden bg-[#243054] text-white nunito">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
            
            <div className="relative mx-auto w-full max-w-6xl px-6 py-14 md:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
                    <div>
                        <Link href="/#inicio" className="flex items-center gap-3 text-left">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                                <span className="text-lg font-black text-[#F3F6FB]">C</span>
                            </div>
                            <div>
                                <p className="text-xl font-extrabold tracking-tight text-white">
                                    Canchita
                                </p>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D7DFED]">
                                    Turnos simples
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-md text-sm leading-7 text-[#E6ECF6]">
                            Simplificamos la reserva de canchas para jugadores y
                            administradores, con una experiencia rápida, clara y sin
                            complicaciones.
                        </p>

                        <div className="mt-6 space-y-3 text-sm text-[#EEF3FB]">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-[#E8EDF7]" />
                                <span>Argentina · Predios deportivos online</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-[#E8EDF7]" />
                                <span>+54 9 11 1234-5678</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-[#E8EDF7]" />
                                <span>hola@canchita.com.ar</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#E5EBF5]">
                            Navegación
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-[#E8EDF7]">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="transition-colors hover:text-white" >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#E5EBF5]">
                            Administradores
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-[#E8EDF7]">
                            {adminLinks.map((link) => (
                                <li key={link.href}>
                                <Link href={link.href} className="transition-colors hover:text-white" >
                                    {link.label}
                                </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-[#F3F6FB] p-4 shadow-lg shadow-[#0f1b31]/10">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#243054]">
                                ¿Tu predio quiere estar online?
                            </p>
                            <Link href="/admin" className="mt-3 inline-flex rounded-full bg-[#243054] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d2944]" >
                                Ver panel
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#D5DEED] md:flex-row md:items-center md:justify-between">
                    <p>
                        © 2026 Canchita. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link href="/#inicio" className="hover:text-white">
                            Inicio
                        </Link>
                        <Link href="/admin" className="hover:text-white">
                            Administrador
                        </Link>
                        <Link href="/#contacto" className="hover:text-white">
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
