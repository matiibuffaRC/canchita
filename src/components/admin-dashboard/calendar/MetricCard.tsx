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
        <div className={`border-b border-r border-[#243054]/10 bg-white p-3 ${className}`}>
            <div className={`mb-1 flex flex-row justify-between items-center gap-1 ${color}`}>
                <span className="text-xs font-bold uppercase tracking-wide">
                    {label}
                </span>
                {icon}
            </div>
            <strong className={`text-2xl font-extrabold ${color}`}>{value}</strong>
        </div>
    );
}