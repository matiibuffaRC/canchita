"use client";

import { FormEvent, useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import FormField from "./FormField";

export interface AdminLoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginFormProps {
    onSubmit: (data: AdminLoginData) => Promise<void> | void;
    onForgotPassword?: () => void;
    isLoading?: boolean;
    errorMessage?: string | null;
}

export default function LoginForm({ onSubmit, onForgotPassword, isLoading = false, errorMessage = null }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!email || !password) {
            setLocalError("Completá tu email y tu contraseña para continuar.");
            return;
        }

        await onSubmit({ email, password, rememberMe });
    };

    const displayError = errorMessage ?? localError;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm" noValidate>
            <div className="mb-4">
                <h2 className="text-[32px] font-bold tracking-tight text-[#243054]">Ingresá a tu cuenta</h2>
                <p className="text-sm text-slate-500">Acceso exclusivo para administradores del predio.</p>
            </div>

            {displayError && (
                <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {displayError}
                </div>
            )}

            <div className="space-y-2">
                <FormField label="Email" icon={<Mail className="h-4 w-4" />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@tupredio.com" autoComplete="username" />
                <FormField label="Contraseña" icon={<Lock className="h-4 w-4" />} isPassword value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
            </div>

            <div className="mt-4 mb-7 flex items-center justify-between">
                <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#243054] focus:ring-[#243054]/20" />
                    Recordarme
                </label>

                {onForgotPassword && (
                    <button type="button" onClick={onForgotPassword} className="text-sm font-medium text-[#243054] hover:underline">
                        Olvidé mi contraseña
                    </button>
                )}
            </div>

            <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#243054] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#243054]/20 transition hover:bg-[#1c2544] disabled:cursor-not-allowed disabled:opacity-60" >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? "Ingresando..." : "Iniciar sesión"}
            </button>

            <p className="mt-6 text-center text-xs text-slate-400">
                ¿Problemas para acceder? Contactá al soporte de tu predio.
            </p>
        </form>
    );
}