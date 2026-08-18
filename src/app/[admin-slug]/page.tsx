'use client';
import { useEffect } from 'react';

function page() {
    
    useEffect (()=>{
        const fetchPredios = async() => {
            const result = await fetch('/api/predios/')
        }
    },[]);

    return (
        <div className='bg-linear-to-b min-h-screen from-white to-gray-100 p-5 text-black'>
            
        </div>
    )
}

export default page