"use client";

// Import dependencies
import { useEffect, useState } from "react";

// Import components
import { Loader } from "../../../components/loader/Loader";
import SideBar from "../../../components/admin-dashboard/SideBar";

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

            } finally {
                setLoading(false);
            }
        };
        fetchEmailAdmin();
    }, []);

    if (loading) return <Loader />;

    return (
        <main className="min-h-screen bg-[#f4f6f9]">
            <SideBar admin={admin} />
        </main>
    );
}

export default Page;
