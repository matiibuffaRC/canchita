"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const faqItems = [
    {
        question: "¿Cómo se hacen las reservas?",
        answer:
        "El cliente selecciona tu complejo, la cancha, la fecha y el horario disponible desde la plataforma. Luego completa sus datos y confirma su reserva mediante correo electrónico.",
    },
    {
        question: "¿Cómo puedo gestionar los métodos de pago de mi complejo?",
        answer:
        "Podés configurar los métodos de pago disponibles según tus preferencias, ya sea aceptando transferencias bancarias, seña previa o cobro exclusivamente en efectivo en el establecimiento.",
    },
    {
        question: "¿Cómo se manejan las cancelaciones de turnos?",
        answer:
        "Los clientes pueden cancelar o reprogramar su reserva desde su cuenta respetando la anticipación que determines. Podés definir políticas de cancelación con o sin devolución de seña.",
    },
    {
        question: "¿Cómo se previenen las reservas falsas o 'fantasmas'?",
        answer:
        "Cada usuario debe verificar la titularidad de su correo electrónico para confirmar la reserva. Además, la plataforma limita a un único turno por día por usuario para evitar bloqueos malintencionados.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="preguntas" aria-labelledby="faq-title" className="relative scroll-mt-28 bg-white px-6 py-20" >
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-[#243054]/50">
                        Preguntas frecuentes
                    </span>

                    <h2 id="faq-title" className="nunito mt-3 text-3xl font-bold text-[#243054] md:text-4xl" >
                        ¿Tenés dudas?
                    </h2>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                        <Reveal key={item.question} delay={index * 0.1} className="nunito overflow-hidden rounded-xl border border-[#243054]/10 bg-white" >
                            <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen} className="cursor-pointer font-extrabold flex w-full items-center justify-between gap-4 px-6 py-4 text-left  text-[#243054] transition-colors" >
                                {item.question}
                                <ChevronDown className={`h-5 w-5 shrink-0 text-[#243054]/50 transition-transform duration-300${isOpen ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-4 leading-7 text-gray-600">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
