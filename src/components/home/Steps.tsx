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
                <div key={step.number} className="nunito rounded-xl border border-[#243054]/10 bg-[#243054]/5 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:cursor-pointer" >
                    <span className="text-sm font-bold text-[#243054]/50 selection:bg-white/10 selection:text-[#243054]">
                        {step.number}
                    </span>

                    <h3 className="text-2xl font-bold selection:bg-white/10 selection:text-black">
                        {step.title}
                    </h3>

                    <p className="mt-1 leading-7 text-[#243054]/70 selection:bg-white/10 selection:text-[#243054]">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    );
}