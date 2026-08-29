'use client';

// Import dependencies
import { useEffect } from 'react';
import { useParams } from "next/navigation";

function page() {
    const { "predio-slug": slug } = useParams<{ "predio-slug": string }>();
    useEffect(()=>{
        const fetchCanchas = async() => {
            try{
                const result = await fetch('api/predios/${id}/canchas')
            }catch(error){

            }finally{

            }
        }
    },[slug])
    return (
        <div>predio page</div>
    )
}

export default page