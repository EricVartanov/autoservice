'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockHeader } from '@/lib/mock-data';
import TopBar from './TopBar';
import MainNav from './MainNav';
import {Container} from "@/components/Container";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!isHome) return; // на внутренних страницах хедер всегда в "компактном" состоянии

        const onScroll = () => setIsScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    // на главной — схлопывается после скролла, на внутренних — сразу схлопнут
    const collapsed = isHome ? isScrolled : true;

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition duration-300 backdrop-blur-sm text-foreground-fixed ${
            collapsed || !isHome ? 'bg-black' : 'bg-black/40'
        }`}>
            <Container className="max-lg:hidden">
                {isHome && !collapsed && (
                    <div
                        className={`overflow-hidden transition-all duration-500 pt-8 pb-5 ${
                            collapsed ? 'max-h-0 opacity-0 p-0' : 'max-h-28 opacity-100'
                        }`}
                    >
                        <TopBar logo={mockHeader.logo} />
                    </div>
                )}
            </Container>

            <span className={`w-full max-lg:hidden ${isHome && !collapsed ? 'block border-t border-t-white/20' : 'hidden'}`}>
            </span>

            <Container>
                <div
                    className={`transition-colors duration-300 w-full`}
                >
                    <MainNav data={mockHeader} isHome={isHome} collapsed={collapsed} />
                </div>
            </Container>
        </header>
    );
}