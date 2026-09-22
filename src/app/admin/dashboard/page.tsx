"use client";

// Import dependencies
import { useCallback, useEffect, useState } from "react";

// Import components
import { Loader } from "../../../components/loader/Loader";
import SideBar, {type SidebarSelection } from "../../../components/admin-dashboard/SideBar";
import Calendar from "../../../components/admin-dashboard/Calendar";
import DashboardAside from "../../../components/admin-dashboard/dashboard-aside/DashboardAside";

type Admin = {
    id: number;
    email: string;
    slug: string;
    nombre: string;
    apellido: string;
};

function Page() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);
    const [selection, setSelection] = useState<SidebarSelection | null>(null);
    const [asideOpen, setAsideOpen] = useState(true);

    const handleSelectionChange = useCallback(
        (nextSelection: SidebarSelection) => {
            setSelection(nextSelection);
        },[],
    );

    useEffect(() => {
        const fetchEmailAdmin = async () => {
            try {
                const result = await fetch("/api/auth/me");

                if (!result.ok) {
                const body = await result.json().catch(() => null);

                throw new Error(
                    body?.message ??
                    "Ha ocurrido un error al obtener el mail del administrador",
                );
                }
            const data = await result.json();
            setAdmin(data);
            console.log("Esto se obtuvo: ", data);

            } catch (error) {
                console.error("No se pudo obtener la sesión del administrador", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmailAdmin();
    }, []);

    if (loading) return <Loader />;

    return (
        <main className="flex h-screen overflow-hidden bg-[#f4f6f9]">
            <SideBar admin={admin} onSelectionChange={handleSelectionChange} onAsideToggle={() => setAsideOpen((open) => !open)} >
                <div className="flex h-full min-h-0 flex-col gap-4 lg:flex-row lg:p-5">
                    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                        <Calendar selection={selection} />
                    </div>
                    <DashboardAside adminSlug={admin?.slug ?? ""} selection={selection} onSelectionChange={handleSelectionChange} isOpen={asideOpen} />
                </div>
            </SideBar>
        </main>
    );
}

export default Page;
