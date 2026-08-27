"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

// Lo que esperamos recibir del backend
function Page() {
    const { "admin-slug": slug } = useParams<{ "admin-slug": string }>();
    useEffect(() => {
        if (!slug) return;

        const peticionFetch = async () => {
            const result = await fetch(`/api/admins/${slug}/predio`);

            if (!result.ok) {
                const body = await result.json().catch(() => null);
                throw new Error(
                body?.message ??
                    "Ha ocurrido un error al obtener los predios del administrador",
                );
            }

            const data = await result.json();
            console.log(data);
        };
        peticionFetch().catch((error: Error) => console.error(error.message));
    }, [slug]);
    return (
        <div className="bg-linear-to-b min-h-screen from-white to-gray-100 p-5 text-black">
            Hola
        </div>
    );
}

export default Page;
