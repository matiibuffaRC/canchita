import type { ReactNode } from "react";

type MetricCardProps = {
    label: string;
    value: number;
    icon: ReactNode;
    color?: string;
    className?: string;
};

export function MetricCard({ label, value, icon, color = "text-[#243054]", className = "" }: MetricCardProps) {
    return (
        <div className={`border-b border-r border-[#243054]/10 bg-white p-2 ${className}`}>
            <div className={`mb-2 flex flex-row justify-between items-center gap-2 ${color}`}>
                <span className="text-sm font-bold uppercase tracking-wide">
                    {label}
                </span>
                {icon}
            </div>
            <strong className={`text-3xl font-extrabold ${color}`}>{value}</strong>
        </div>
    );
}