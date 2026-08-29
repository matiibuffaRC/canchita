import type { LucideIcon } from 'lucide-react';

interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

export default function Benefits({ benefits }: BenefitsProps) {
    return (
        <section id='nosotros' aria-labelledby="benefits-title" className="relative bg-[#243054] px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-white/50">
                        Ventajas
                    </span>

                    <h2 id="benefits-title" className="nunito mt-3 text-3xl font-bold text-white md:text-4xl">
                        ¿Por qué elegirnos?
                    </h2>

                    <p className="nunito text-sm text-gray-600">
                        Reservar tu cancha nunca fue tan cómodo.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="nunito rounded-xl border border-white/10 bg-white/2 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/6" >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                                <benefit.icon className="h-5 w-5" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-white">
                                {benefit.title}
                            </h3>

                            <p className="mt-1 leading-7 text-gray-400">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}