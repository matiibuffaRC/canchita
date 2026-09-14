"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    icon: ReactNode;
    isPassword?: boolean;
    type?: string;
}

export default function FormField({
    label,
    icon,
    isPassword = false,
    type = "text",
    ...inputProps
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-slate-600">{label}</span>
            <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                <input
                    {...inputProps}
                    type={resolvedType}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-10 ${
                        isPassword ? "pr-10" : "pr-3.5"
                    } py-3 text-sm text-[#243054] placeholder:text-slate-400 outline-none transition focus:border-[#243054] focus:bg-white focus:ring-4 focus:ring-[#243054]/10`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#243054]"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                )}
            </div>
        </label>
    );
}