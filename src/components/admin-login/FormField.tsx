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
            <span className="block text-sm font-medium text-[#243054]">{label}</span>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                <input {...inputProps} type={resolvedType} className={`w-full rounded-lg border border-slate-200 bg-white pl-10 ${ isPassword ? "pr-10" : "pr-3" } py-2.5 text-sm text-[#243054] placeholder:text-slate-400 outline-none transition focus:border-[#243054] focus:ring-2 focus:ring-[#243054]/10`} />
                {isPassword && (
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#243054] transition" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                )}
            </div>
        </label>
    );
}