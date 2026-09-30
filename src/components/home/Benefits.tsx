import { Zap, MessageSquareOff, CalendarX, CalendarClock, Clock3, MapPin, Building2, type LucideIcon } from "lucide-react";

/* ---------- Tipos ---------- */

type BookingStatus = "confirmed" | "pending" | "finished";
type BookingItemProps = {
    id: number;
    time: string;
    predio: string;
    cancha: string;
    status: BookingStatus;
};

type FeatureVariant = "light" | "dark";
type FeatureExtra = "slots" | "predios";
type FeatureCardProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    variant: FeatureVariant;
    position: string;
    extra?: FeatureExtra;
};

/* ---------- Datos ---------- */

const BOOKINGS: BookingItemProps[] = [
    {
        id: 1,
        time: "19:00 a 20:00",
        predio: "Predio 2",
        cancha: "Cancha 1",
        status: "confirmed",
    },
    {
        id: 2,
        time: "22:00 a 23:00",
        predio: "Predio 1",
        cancha: "Cancha 2",
        status: "pending",
    },
    {
        id: 3,
        time: "18:00 a 19:00",
        predio: "Predio 1",
        cancha: "Cancha 1",
        status: "finished",
    },
];

// Clases completas (no dinámicas) para que Tailwind las detecte
const STATUS: Record < BookingStatus, { label: string; border: string; badge: string } > = {
    confirmed: {
        label: "Confirmada",
        border: "border-emerald-300",
        badge: "border-emerald-300 bg-emerald-300/10",
    },
    pending: {
        label: "Pendiente",
        border: "border-amber-300",
        badge: "border-amber-300 bg-amber-300/10",
    },
    finished: {
        label: "Finalizada",
        border: "border-gray-300",
        badge: "border-gray-300 bg-gray-300/10",
    },
};

const SLOTS = [
    { hour: "18:00", taken: true },
    { hour: "19:00", taken: false },
    { hour: "20:00", taken: true },
    { hour: "21:00", taken: false },
    { hour: "22:00", taken: false },
    { hour: "23:00", taken: true },
];

const PREDIOS = [
    { name: "Predio 1", courts: 2 },
    { name: "Predio 2", courts: 3 },
    { name: "Predio 3", courts: 2 },
];

const VARIANTS: Record< FeatureVariant, { card: string; icon: string; title: string; text: string } > = {
    light: {
        card: "bg-white",
        icon: "bg-[#243054]/10 text-[#243054]",
        title: "text-[#243054]",
        text: "text-[#243054]/60",
    },
    dark: {
        card: "bg-white",
        icon: "bg-[#243054]/10 text-[#243054]",
        title: "text-[#243054]",
        text: "text-[#243054]/60",
    },
};

const FEATURES: Array<FeatureCardProps> = [
    {
        title: "Sin llamadas ni WhatsApp",
        description: "Reservá online, sin depender de que te contesten.",
        icon: MessageSquareOff,
        variant: "light",
        position: "md:col-start-1 md:row-start-3",
    },
    {
        title: "Confirmación al instante",
        description: "Tu reserva queda confirmada al momento, sin esperas.",
        icon: Zap,
        variant: "light",
        position: "md:col-start-2 md:row-start-1",
    },
    {
        title: "Consultá disponibilidad",
        description:"Mirá qué horarios están libres en cada cancha, en tiempo real.",
        icon: CalendarClock,
        variant: "dark",
        position: "md:col-start-2 md:row-start-2 md:row-span-2",
        extra: "slots",
    },
    {
        title: "Todos los predios en un solo lugar",
        description: "Elegí dónde jugar y reservá la cancha que más te convenga.",
        icon: Building2,
        variant: "dark",
        position: "md:col-start-3 md:row-start-1 md:row-span-2",
        extra: "predios",
    },
    {
        title: "Cancelá o reprogramá",
        description: "Cambiá o cancelá tu turno en segundos.",
        icon: CalendarX,
        variant: "light",
        position: "md:col-start-3 md:row-start-3",
    },
];

/* ---------- Subcomponentes ---------- */

    function BookingItem({ time, predio, cancha, status }: BookingItemProps) {
    const s = STATUS[status];

    return (
        <li className={`min-w-0 border-l-4 bg-white p-4 shadow-sm shadow-[#243054]/5 ${s.border}`} >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="flex items-center gap-2 text-base font-extrabold">
                        <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#243054]/50" />
                        {time}
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-sm leading-5">
                        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#243054]/45" />
                        <span className="min-w-0">
                        <span className="block wrap-break-word font-bold">
                            {predio}
                        </span>
                        <span className="block wrap-break-word text-xs text-[#243054]/60">
                            {cancha}
                        </span>
                        </span>
                    </p>
                </div>

                <span className={`w-fit rounded-full border px-2 py-1 text-xs sm:self-start ${s.badge}`} >
                    {s.label}
                </span>
            </div>
        </li>
    );
    }

function SlotsPreview() {
    return (
        <ul aria-hidden="true" className="mt-6 grid grid-cols-2 gap-2">
            {SLOTS.map(({ hour, taken }) => (
                <li
                    key={hour}
                    className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold ${
                        taken
                        ? "border-[#243054]/70 bg-[#243054]/10 text-[#243054]/70 line-through"
                        : "border-emerald-300/50 bg-emerald-300/10 text-emerald-200"
                    }`}
                >
                {hour}
                </li>
            ))}
        </ul>
    );
    }

function PrediosPreview() {
    return (
        <ul aria-hidden="true" className="mt-6 flex flex-col gap-2">
            {PREDIOS.map(({ name, courts }) => (
                <li key={name} className="flex items-center justify-between gap-3 rounded-lg bg-[#243054]/10 border  px-3 py-2.5" >
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#243054]/70">
                        <MapPin className="h-4 w-4 shrink-0 text-[#243054]/70" />
                        {name}
                    </span>
                    <span className="text-xs text-[#243054]/70">{courts} canchas</span>
                </li>
            ))}
        </ul>
    );
    }

const EXTRAS: Record<FeatureExtra, () => ReturnType<typeof SlotsPreview>> = {slots: SlotsPreview,predios: PrediosPreview, };

function FeatureCard({ title, description, icon: Icon, variant, position, extra, }: FeatureCardProps) {
    const v = VARIANTS[variant];
        const Extra = extra ? EXTRAS[extra] : null;

    return (
        <article className={`rounded-xl border border-white/10 p-7 transition duration-300 motion-safe:hover:-translate-y-1 ${v.card} ${position}`} >
            <div className={`flex h-11 w-11 items-center justify-center rounded-full ${v.icon}`} >
                <Icon aria-hidden="true" className="h-5 w-5" />
            </div>

            <h3 className={`text-lg font-bold ${v.title}`}>{title}</h3>
            <p className={`mt-1 leading-7 ${v.text}`}>{description}</p>

            {Extra && <Extra />}
        </article>
    );
}

/* ---------- Sección ---------- */

export default function Benefits() {
    return (
        <section
            id="nosotros"
            aria-labelledby="benefits-title"
            className="nunito relative scroll-mt-28 bg-[#243054] px-6 py-20"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-white/50">
                        Ventajas
                    </span>

                    <h2 id="benefits-title" className="mt-3 text-3xl font-bold text-white md:text-4xl" >
                        ¿Por qué elegirnos?
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Reservar tu cancha nunca fue tan cómodo.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-3">
                {/* Tarjeta grande: turnos */}
                <article className="rounded-xl border border-white/10 bg-white/95 p-3 px-4 transition duration-300 motion-safe:hover:-translate-y-1 md:row-span-2">
                    <h3 className="py-1.5 text-lg font-bold text-[#243054]">
                        Gestioná tus turnos
                    </h3>
                    <ul className="flex flex-col justify-center gap-4 text-[#243054]">
                        {BOOKINGS.map((b) => (
                            <BookingItem key={b.id} {...b} />
                        ))}
                    </ul>
                </article>

                {FEATURES.map((f) => (
                    <FeatureCard key={f.title} {...f} />
                ))}
                </div>
                
            </div>
        </section>
    );
}
