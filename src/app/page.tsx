import type { Metadata } from "next";
import { Zap, MessageSquareOff, CalendarX, CalendarClock } from "lucide-react";

import Header from "../components/header/Header";
import Hero from "../components/home/Hero";
import Steps from "../components/home/Steps";
import Benefits from "../components/home/Benefits";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import AdminSection from "../components/home/AdminSection";
import Contact from "../components/home/Contact";
import Footer from "../components/footer/Footer";
import ScrollProgress from "../components/scroll-progress/scroll-progress";

export const metadata: Metadata = {
    title: "Canchita - Turnos",
    description:
        "Reservá tu cancha de forma simple, rápida y sin complicaciones.",
};


export default function Home() {
    return (
        <>
            <Header></Header>
            <main id="inicio" className="min-h-screen overflow-hidden bg-white text-[#243054]" >
                <ScrollProgress sections={[ { id: "inicio", label: "Inicio" }, { id: "como-funciona", label: "Cómo funciona" }, { id: "nosotros", label: "Nosotros" }, { id: "testimonios", label: "Testimonios" }, { id: "administradores", label: "Administradores" }, { id: "preguntas", label: "Preguntas frecuentes" }, { id: "contacto", label: "Contacto" }, ]} />
                <Hero />

                <section id="como-funciona" aria-labelledby="steps-title" className="relative scroll-mt-28 overflow-hidden px-6 py-20 text-[#243054]" >
                    <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-6xl border-t border-[#243054]/10 pt-5">
                        <div className="mx-auto max-w-2xl text-center">
                            <span className="nunito text-sm font-semibold uppercase tracking-widest text-[#243054]/50 selection:bg-white/10 selection:text-[#243054]">
                                Simple y rápido
                            </span>
                            <h2 id="steps-title" className="nunito mt-3 text-3xl font-bold md:text-4xl selection:bg-white/10 selection:text-black" >
                                Reservar una cancha nunca fue tan fácil
                            </h2>
                            <p className="nunito text-[#243054]/70 selection:bg-white/10 selection:text-[#243054]">
                                Elegí tu cancha, seleccioná el horario y listo.
                            </p>
                        </div>
                        <Steps/>
                    </div>
                </section>

                <Benefits/>
                <Testimonials/>
                <AdminSection />
                <FAQ/>
                <Contact />
            </main>
            <Footer />
        </>
    );
}
