import type { Metadata } from 'next';
import { Zap, MessageSquareOff, CalendarX, CalendarClock } from 'lucide-react';

import Hero from '../components/home/Hero';
import Steps from '../components/home/Steps';
import Benefits from '../components/home/Benefits';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import AdminSection from '../components/home/AdminSection';

export const metadata: Metadata = {
    title: 'Canchita - Turnos',
    description:
        'Reservá tu cancha de forma simple, rápida y sin complicaciones.',
};

const steps = [
    { number: '01', title: 'Elegí tu cancha', description: 'Ingresá al predio y seleccioná la cancha que querés reservar.' },
    { number: '02', title: 'Elegí día y horario', description: 'Consultá los horarios disponibles y seleccioná el que prefieras.' },
    { number: '03', title: 'Confirmá tu reserva', description: 'Ingresá tus datos y confirmá la reserva de manera rápida y sencilla.' },
];

const benefits = [
    { icon: Zap, title: 'Confirmación al instante', description: 'Tu reserva queda confirmada al momento, sin esperas.' },
    { icon: MessageSquareOff, title: 'Sin llamadas ni WhatsApp', description: 'Reservá online, sin depender de que te contesten.' },
    { icon: CalendarClock, title: 'Consultá disponibilidad', description: 'No hay demoras para ver tus oportunidades.' },
    { icon: CalendarX, title: 'Cancelación fácil', description: 'Cancelá o reprogramá tu turno en segundos.' },
];

const testimonials = [
    { name: 'Martín G.', role: 'Jugador', quote: 'Reservos mis turnos rapido sin tener esperando a mis compañeros.' },
    { name: 'Complejo Deportivo EPEC', role: 'Administrador', quote: 'Nos ahorró estar pendiente al Whatsapp todo el día.' },
    { name: 'Lucía P.', role: 'Jugadora de padel', quote: 'Me encanta poder ver los horarios libres al toque, súper simple para organizarse.' },
];

const faqItems = [
    { question: '¿Cómo reservo una cancha?', answer: 'Elegís el complejo, la cancha, el día y horario disponible, y confirmás con tus datos.' },
    { question: '¿Qué métodos de pago aceptan?', answer: 'Depende del complejo: algunos aceptan transferencias y otros solo efectivo.' },
    { question: '¿Puedo cancelar mi reserva?', answer: 'Sí, podés cancelar o reprogramar desde tu cuenta con anticipación. En algunos casos se requiere de una seña y en otros no.' },
];

export default function Home() {
    return (
        <main id='inicio' className="min-h-screen overflow-hidden bg-white text-[#243054]">
            <Hero />

            <section id="como-funciona" aria-labelledby="steps-title" className="relative scroll-mt-8 overflow-hidden bg-[#243054] px-6 py-20 text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="nunito text-sm font-semibold uppercase tracking-widest text-white/50">
                            Simple y rápido
                        </span>
                        <h2 id="steps-title" className="nunito mt-3 text-3xl font-bold md:text-4xl">
                            Reservar una cancha nunca fue tan fácil
                        </h2>
                        <p className="nunito text-white/70">
                            Elegí tu cancha, seleccioná el horario y listo.
                        </p>
                    </div>
                    <Steps steps={steps} />
                </div>
            </section>

            <Benefits benefits={benefits} />
            <Testimonials testimonials={testimonials} />
            <AdminSection />
            <FAQ items={faqItems} />
        </main>
    );
}