import { Reveal } from "../motion/Reveal";

const hoverEffects = [
  "hover:-translate-y-1 hover:-rotate-2", // primero: rota a la izquierda
  "hover:-translate-y-1", // medio: solo se traslada hacia arriba
  "hover:-translate-y-1 hover:rotate-2", // tercero: rota a la derecha
];

const testimonials = [
    {
        name: "Martín G.",
        role: "Jugador",
        quote: "Reservos mis turnos rapido sin tener esperando a mis compañeros.",
    },
    {
        name: "Complejo Deportivo EPEC",
        role: "Administrador",
        quote: "Nos ahorró estar pendiente al Whatsapp todo el día.",
    },
    {
        name: "Lucía P.",
        role: "Jugadora de padel",
        quote:
        "Me encanta poder ver los horarios libres al toque, súper simple para organizarse.",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonios" aria-labelledby="testimonials-title" className="relative scroll-mt-28 overflow-hidden bg-[#243054] px-6 py-20 text-white" >
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 -bottom-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-white/50 selection:text-white selection:bg-bg-white/6">
                        Lo dicen ellos
                    </span>

                    <h2 id="testimonials-title" className="nunito mt-3 text-3xl font-bold md:text-4xl selection:text-gray-400 selection:bg-bg-white/6" >
                        Confían en nosotros
                    </h2>

                    <p className="nunito text-white/70 selection:text-white selection:bg-bg-white/6">
                        Jugadores y dueños de canchas ya reservan y gestionan con Canchita.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <Reveal key={testimonial.name} delay={index * 0.1} className={`nunito rounded-4xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-300 hover:bg-white/10 ${hoverEffects[index % hoverEffects.length]}`} >
                    <p className="leading-7 text-white/80 selection:text-white selection:bg-bg-white/6">
                        “{testimonial.quote}”
                    </p>

                    <div className="mt-5">
                        <p className="font-bold selection:text-gray-400 selection:bg-bg-white/6">
                            {testimonial.name}
                        </p>
                        <p className="text-sm text-white/50 selection:text-white selection:bg-bg-white/6">
                            {testimonial.role}
                        </p>
                    </div>
                    </Reveal>
                ))}
                </div>
            </div>
        </section>
    );
}
