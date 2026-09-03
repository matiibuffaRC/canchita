"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


const faqItems = [
    {
        question: "¿Cómo reservo una cancha?",
        answer:
            "Elegís el complejo, la cancha, el día y horario disponible, y confirmás con tus datos.",
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer:
            "Depende del complejo: algunos aceptan transferencias y otros solo efectivo.",
    },
    {
        question: "¿Puedo cancelar mi reserva?",
        answer:
            "Sí, podés cancelar o reprogramar desde tu cuenta con anticipación. En algunos casos se requiere de una seña y en otros no.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="preguntas" aria-labelledby="faq-title" className="relative scroll-mt-28 bg-white px-6 py-20" >
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-[#243054]/50 selection:text-[#243054] selection:bg-white/6">
                        Preguntas frecuentes
                    </span>

                    <h2 id="faq-title" className="nunito mt-3 text-3xl font-bold text-[#243054] md:text-4xl selection:text-[#243054]/50 selection:bg-white/6" >
                        ¿Tenés dudas?
                    </h2>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                        <div key={item.question} className="nunito overflow-hidden rounded-xl border border-[#243054]/10 bg-white" >
                            <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen} className="cursor-pointer font-extrabold flex w-full items-center justify-between gap-4 px-6 py-4 text-left  text-[#243054] transition-colors" >
                                {item.question}
                                <ChevronDown className={`h-5 w-5 shrink-0 text-[#243054]/50 transition-transform duration-300${isOpen ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-4 leading-7 text-gray-600 selection:text-[#243054] selection:bg-white/6">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
