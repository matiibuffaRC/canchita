'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Si se agranda a desktop con el menú mobile abierto, lo cerramos
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-[padding] duration-300`}>
            <div className={`nunito mx-auto flex w-full items-center justify-between rounded-2xl border border-[#243054]/10 bg-white/80 px-4 py-3 shadow-lg shadow-[#243054]/5 backdrop-blur-md transition-all duration-700 md:px-6 md:py-3.5 ${scrolled ? 'max-w-4xl' : 'max-w-5xl'}`}>

                <div className='flex gap-6'>
                    <Link href="/#inicio" className="flex items-center select-none" onClick={() => setMenuOpen(false)}>
                        <Image src="/icons/IconPNG.png" alt="Logo de Canchita" width={32} height={32} className={`transition-all duration-300 ${scrolled ? 'md:h-7 md:w-7' : 'md:h-8 md:w-8'}`} />
                        <span className="text-lg font-extrabold tracking-tight text-[#243054]">
                            Canchita
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-4 md:flex">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm font-bold text-[#243054]/70 transition-colors hover:text-[#243054]" >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <Link href="/admin" className="hidden rounded-4xl border-2 border-[#243054] px-5 py-2 text-sm font-semibold transition-all duration-300 bg-[#243054] text-white md:inline-block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#243054]" >
                    Soy administrador
                </Link>

                <button type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} className="flex h-9 w-9 items-center justify-center rounded-full text-[#243054] transition-colors hover:bg-[#243054]/5 md:hidden" >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Menú desplegable mobile */}
            <div id="mobile-menu" className={`nunito mx-auto w-full max-w-4xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${ menuOpen ? 'mt-3 max-h-96 opacity-100' : 'max-h-0 opacity-0' }`} >
                <div className="flex flex-col gap-1 rounded-2xl border border-[#243054]/10 bg-white/95 p-4 shadow-lg shadow-[#243054]/5 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#243054]/80 transition-colors hover:bg-[#243054]/5 hover:text-[#243054]" >
                            {link.label}
                        </Link>
                    ))}

                    <Link href="/admin" onClick={() => setMenuOpen(false)} className="mt-2 rounded-4xl bg-[#243054] px-5 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1b2644]" >
                        Soy administrador
                    </Link>
                </div>
            </div>
        </header>
    );
}