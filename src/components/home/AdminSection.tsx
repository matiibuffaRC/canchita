import Link from 'next/link';
import { BarChart3, CalendarClock, UserX } from 'lucide-react';

const perks = [
    {
        icon: CalendarClock,
        text: 'Gestioná todos tus turnos desde un solo lugar',
    },
    {
        icon: BarChart3,
        text: 'Accedé a estadísticas de ocupación y tomá desiciones',
    },
    {
        icon: UserX,
        text: 'Reducí el ausentismo con confirmaciones automáticas',
    },
];

export default function AdminSection() {
    return (
        <section aria-labelledby="admin-title" className="relative overflow-hidden bg-[#243054] px-6 py-20 text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:justify-between">
                <div className="max-w-xl text-center md:text-start">
                    <span className="nunito text-sm font-semibold uppercase tracking-widest text-white/50 selection:text-white selection:bg-bg-white/6">
                        Para administradores
                    </span>

                    <h2 id="admin-title" className="nunito mt-3 text-3xl font-bold md:text-4xl selection:text-gray-400 selection:bg-bg-white/6">
                        ¿Tenés un predio deportivo?
                    </h2>

                    <p className="nunito mt-3 leading-8 text-white/70 selection:text-white selection:bg-bg-white/6">
                        Sumá tu cancha a Canchita y empezá a recibir reservas online,
                        sin llamadas ni planillas.
                    </p>

                    <Link href="/admin" className="nunito font-bold mt-6 inline-block rounded-4xl bg-white px-7 py-3.5 text-sm text-[#243054] shadow-lg shadow-black/10 transition-all duration-300 hover:-rotate-2 hover:bg-white/90 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white" >
                        Quiero sumar mi cancha
                    </Link>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-4">
                    {perks.map((perk) => (
                        <div key={perk.text} className="nunito flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:translate-x-2 transition-all duration-300 selection:text-white selection:bg-bg-white/6" >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                <perk.icon className="h-5 w-5" />
                            </div>
                            <p className="text-sm leading-6 text-white/85">{perk.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}