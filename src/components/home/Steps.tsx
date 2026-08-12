interface Step {
    number: string;
    title: string;
    description: string;
}

interface StepsProps {
    steps: Step[];
}

export default function Steps({ steps }: StepsProps) {
    return (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
                <div
                    key={step.number}
                    className="
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                        p-7
                        backdrop-blur-sm
                        transition duration-300
                        hover:-translate-y-1
                        hover:bg-white/10
                    "
                >
                    <span className="text-sm font-bold text-white/50">
                        {step.number}
                    </span>

                    <h3 className="mt-4 text-xl font-bold">
                        {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/70">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    );
}