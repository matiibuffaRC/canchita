"use client";

import { useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { Save } from "lucide-react";

import type { Cancha, SidebarSelection } from "../SideBar";

type ResourceEditorProps = {
    selection: SidebarSelection;
    onSaved: (selection: SidebarSelection) => void;
};

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

function Field({ label, ...props }: FieldProps) {
    return (
        <label className="grid gap-1 text-xs font-bold text-[#243054]/70">
            {label}
            <input {...props} className="h-9 rounded-md border border-[#243054]/15 bg-white px-2 text-sm font-normal text-[#161b2e] outline-none focus:border-[#243054]"/>
        </label>
    );
}

function ResourceEditor({ selection, onSaved }: ResourceEditorProps) {
    const isCancha = selection.tipo === "cancha" && Boolean(selection.cancha);
    const resource = isCancha ? (selection.cancha as Cancha) : selection.predio;
    const [form, setForm] = useState(() =>
        isCancha
        ? {
            nombre: resource.nombre,
            tipo: selection.cancha?.tipo ?? "",
            precio: String(selection.cancha?.precio ?? ""),
            duracion: String(selection.cancha?.duracion ?? ""),
            horario_apertura:
                selection.cancha?.horario_apertura ??
                selection.cancha?.hora_apertura ??
                "",
            horario_cierre:
                selection.cancha?.horario_cierre ??
                selection.cancha?.hora_cierre ??
                "",
            direccion: "",
            telefono: "",
            }
        : {
            nombre: resource.nombre,
            tipo: "",
            precio: "",
            duracion: "",
            horario_apertura: "",
            horario_cierre: "",
            direccion: selection.predio.direccion ?? "",
            telefono: selection.predio.telefono ?? "",
            },
    );
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const save = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setMessage(null);
        const endpoint = isCancha
        ? `/api/canchas/${selection.cancha?.id_cancha}`
        : `/api/predios/${selection.predio.slug}`;
        const body = isCancha
        ? {
            nombre: form.nombre,
            tipo: form.tipo,
            precio: Number(form.precio),
            duracion: Number(form.duracion),
            horario_apertura: form.horario_apertura,
            horario_cierre: form.horario_cierre,
            }
        : {
            nombre: form.nombre,
            direccion: form.direccion,
            telefono: form.telefono,
            };

        try {
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = (await response.json()) as {
            cancha?: Cancha;
            predio?: {
            nombre: string;
            slug: string;
            direccion: string;
            telefono: string;
            id_predio: number;
            };
        };
        if (!response.ok) throw new Error("No se pudo guardar la información");

        if (isCancha && data.cancha) {
            onSaved({
            ...selection,
            cancha: { ...(selection.cancha as Cancha), ...data.cancha },
            });
        } else if (!isCancha && data.predio) {
            onSaved({
            ...selection,
            predio: { ...selection.predio, ...data.predio },
            });
        }
        setMessage("Cambios guardados");
        } catch (error) {
        setMessage(
            error instanceof Error
            ? error.message
            : "No se pudo guardar la información",
        );
        } finally {
        setSaving(false);
        }
    };

    return (
        <section className="rounded-xl border border-[#243054]/10 bg-white p-4 shadow-sm">
            <div className="mb-2">
                <p className="text-xs font-bold uppercase tracking-wide text-[#243054]/50">
                    Editar selección
                </p>
                <h2 className="font-extrabold text-[#161b2e]">
                    {isCancha ? "Información de la cancha" : "Información del predio"}
                </h2>
            </div>
            <form onSubmit={save} className="grid gap-3">
                <Field
                    label="Nombre"
                    value={form.nombre}
                    onChange={(event) => updateField("nombre", event.target.value)}
                    required
                />
                {isCancha ? (
                <>
                    <Field
                        label="Tipo"
                        value={form.tipo}
                        onChange={(event) => updateField("tipo", event.target.value)}
                        required
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Field
                            label="Precio"
                            type="number"
                            value={form.precio}
                            onChange={(event) => updateField("precio", event.target.value)}
                        />
                        <Field
                            label="Duración (min)"
                            type="number"
                            value={form.duracion}
                            onChange={(event) =>
                            updateField("duracion", event.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Field
                            label="Abre"
                            type="time"
                            value={form.horario_apertura}
                            onChange={(event) =>
                            updateField("horario_apertura", event.target.value)
                            }
                            required
                        />
                        <Field
                            label="Cierra"
                            type="time"
                            value={form.horario_cierre}
                            onChange={(event) =>
                            updateField("horario_cierre", event.target.value)
                            }
                            required
                        />
                    </div>
                </>
                ) : (
                <>
                    <Field
                        label="Dirección"
                        value={form.direccion}
                        onChange={(event) => updateField("direccion", event.target.value)}
                        required
                    />
                    <Field
                        label="Teléfono"
                        value={form.telefono}
                        onChange={(event) => updateField("telefono", event.target.value)}
                        required
                    />
                </>
                )}
                <button
                    type="submit"
                    disabled={saving}
                    className="mt-1 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#243054] px-3 text-sm font-bold text-white transition hover:bg-[#1c2745] disabled:opacity-60"
                >
                    <Save className="size-4" />
                    {saving ? "Guardando..." : "Guardar cambios"}
                </button>
                {message && (
                    <p className="text-xs font-semibold text-[#243054]/65">{message}</p>
                )}
            </form>
        </section>
    );
}

export default ResourceEditor;
