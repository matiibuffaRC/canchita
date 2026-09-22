"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, ChevronDown, CircleDot, MapPin } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";

type Admin = {
    slug: string;
    nombre: string;
    apellido: string;
    email?: string;
};

type Predio = {
    id_predio: number;
    nombre: string;
    slug: string;
};

type Cancha = {
    id_cancha: number;
    id_predio: number;
    nombre: string;
};

type PredioWithCanchas = Predio & { canchas: Cancha[] };

type SideBarProps = { admin: Admin | null };

function SideBar({ admin }: SideBarProps) {
    const [predios, setPredios] = useState<PredioWithCanchas[]>([]);
    const [prediosOpen, setPrediosOpen] = useState(true);
    const [canchasOpen, setCanchasOpen] = useState(false);

    useEffect(() => {
        if (!admin?.slug) return;

        const fetchAdminData = async () => {
            const prediosResponse = await fetch(`/api/admins/${admin.slug}/predio`);
            if (!prediosResponse.ok)
                throw new Error("No se pudieron obtener los predios");

            const { predios: adminPredios } = (await prediosResponse.json()) as {
                predios: Predio[];
            };
            const prediosWithCanchas = await Promise.all(
                adminPredios.map(async (predio) => {
                const canchasResponse = await fetch(
                    `/api/predios/${predio.slug}/canchas`,
                );
                if (!canchasResponse.ok) return { ...predio, canchas: [] };

                const data = (await canchasResponse.json()) as { canchas: Cancha[] };
                return { ...predio, canchas: data.canchas ?? [] };
                }),
            );

            setPredios(prediosWithCanchas);
        };

        fetchAdminData().catch((error: unknown) => {
            console.error(
                "Ocurrió un error al cargar el menú del administrador",
                error,
            );
        });
    }, [admin?.slug]);

    const adminName =
        [admin?.nombre, admin?.apellido].filter(Boolean).join(" ") ||
        "Administrador";

    return (
        <SidebarProvider>
            <Sidebar className="bg-[#243054] text-white" collapsible="icon">
                <SidebarHeader className="border-b-2 border-white/10 bg-[#243054] px-5 py-5 group-data-[collapsible=icon]:px-2">
                    <div className="flex min-w-0 items-center gap-3 ">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                            <Building2 className="size-5" />
                        </div>
                        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                            <p className="text-white truncate text-xl font-bold">Canchita</p>
                            <p className="truncate text-xs text-white/60">{adminName}</p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="bg-[#243054]">
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-white/70 text-md pb-2">
                            Panel de administración
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        type="button"
                                        onClick={() => setPrediosOpen((open) => !open)}
                                        className="text-white hover:bg-white/10 hover:text-white active:bg-[#243054] active:text-white focus:bg-[#243054] focus:text-white hover:cursor-pointer"
                                        tooltip="Predios"
                                    >
                                        <MapPin />
                                        <span>
                                            Predios
                                        </span>
                                        <ChevronDown
                                        className={`ml-auto transition-transform duration-500 ${prediosOpen ? "" : "-rotate-90"}`}
                                        />
                                    </SidebarMenuButton>
                                    {prediosOpen && (
                                        <SidebarMenuSub>
                                        {predios.map((predio) => (
                                            <SidebarMenuSubItem key={predio.id_predio}>
                                            <SidebarMenuSubButton
                                                render={
                                                <Link href={`/${admin?.slug}/${predio.slug}`} />
                                                }
                                                className="text-white/75 hover:bg-white/10 hover:text-white active:bg-[#243054] active:text-white focus:bg-[#243054] focus:text-white"
                                            >
                                                <span>{predio.nombre}</span>
                                            </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                        </SidebarMenuSub>
                                    )}
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        type="button"
                                        onClick={() => setCanchasOpen((open) => !open)}
                                        className="text-white hover:bg-white/10 hover:text-white active:bg-[#243054] active:text-white focus:bg-[#243054] focus:text-white hover:cursor-pointer"
                                        tooltip="Canchas"
                                    >
                                        <CircleDot />
                                        <span>
                                            Canchas
                                        </span>
                                        <ChevronDown className={`ml-auto transition-transform ${canchasOpen ? "" : "-rotate-90"}`} />
                                    </SidebarMenuButton>
                                    {canchasOpen && (
                                        <SidebarMenuSub>
                                        {predios.map((predio) => (
                                            <SidebarMenuSubItem key={predio.id_predio}>
                                            <SidebarMenuSubButton className="text-white/75 hover:bg-white/10 hover:text-white active:bg-[#243054] active:text-white focus:bg-[#243054] focus:text-white">
                                                <span>{predio.nombre}</span>
                                            </SidebarMenuSubButton>
                                            <SidebarMenuSub>
                                                {predio.canchas.map((cancha) => (
                                                <SidebarMenuSubItem key={cancha.id_cancha}>
                                                    <SidebarMenuSubButton
                                                    render={
                                                        <Link
                                                        href={`/${admin?.slug}/${predio.slug}/${cancha.id_cancha}`}
                                                        />
                                                    }
                                                    size="sm"
                                                    className="text-white/60 hover:bg-white/10 hover:text-white active:bg-[#243054] active:text-white focus:bg-[#243054] focus:text-white"
                                                    >
                                                    <span>{cancha.nombre}</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                            </SidebarMenuSubItem>
                                        ))}
                                        </SidebarMenuSub>
                                    )}
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>  

                <SidebarFooter className="border-t border-white/10 bg-[#243054] p-5 nunito">
                    <div className="mb-4 rounded-xl border border-dashed border-white/25 bg-white/5 p-4 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-bold text-white">
                            ¿Necesitás ayuda?
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/60">
                            Nuestro equipo está para darte una mano.
                        </p>
                        <Link href="/soporte" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300" >
                            Contactar soporte
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <p className="truncate text-sm font-bold text-white/80 group-data-[collapsible=icon]:hidden">
                        {admin?.email}
                    </p>
                </SidebarFooter>
                
            </Sidebar>
            <section className="flex min-h-screen flex-1 flex-col">
                <header className="flex h-14 items-center border-b border-[#243054]/10 bg-white px-4">
                    <SidebarTrigger aria-label="Abrir menú" className="text-[#243054]" />
                    <h1 className="nunito ml-2 text-xl font-bold text-[#161b2e]">
                        Panel de administración
                    </h1>
                </header>
            </section>
        </SidebarProvider>
    );
}

export default SideBar;