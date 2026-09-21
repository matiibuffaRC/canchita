'use client'

// Import dependencies
import { useEffect, useState } from 'react'

// Import components
import { Loader } from "../../../components/loader/Loader";

function page() {
    const [emailAdmin, setEmailAdmin] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchEmailAdmin = async() => {
            try{
                const result = await fetch('/api/auth/me');
                
                if (!result.ok) {
                    const body = await result.json().catch(() => null);

                    throw new Error(
                        body?.message ??
                            "Ha ocurrido un error al obtener el mail del administrador",
                    );
                }
                const data = await result.json();
                setEmailAdmin(data.email)
                console.log("Esto se obtuvo: ", data.email)
            }catch(error){

            }finally{
                setLoading(false)
            }
        }
        fetchEmailAdmin();
    },[emailAdmin])

    if (loading) return <Loader />;

    return (
        <div>page</div>
    )
}

export default page