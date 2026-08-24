'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mockHeader } from '@/lib/mock-data';
import TopBar from './TopBar';
import MainNav from './MainNav';
import {Container} from "@/components/Container";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!isHome) return; // на внутренних страницах хедер всегда в "компактном" состоянии

        const onScroll = () => setIsScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    useEffect(() => {
        const nav = headerRef.current?.querySelector('nav');
        if (!nav) return;

        const setOffset = () => {
            document.documentElement.style.setProperty(
                '--header-offset',
                `${nav.getBoundingClientRect().height}px`,
            );
        };

        const observer = new ResizeObserver(setOffset);
        observer.observe(nav);
        setOffset();

        return () => {
            observer.disconnect();
            document.documentElement.style.removeProperty('--header-offset');
        };
    }, []);

    // на главной — схлопывается после скролла, на внутренних — сразу схлопнут
    const collapsed = isHome ? isScrolled : true;

    return (
        <header ref={headerRef} className={`fixed top-0 left-0 w-full z-100 transition-colors duration-300 backdrop-blur-sm text-foreground-fixed ${
            collapsed || !isHome ? 'bg-black' : 'bg-black/40'
        }`}>
            <Container className="hidden lg:block">
                {isHome && (
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                            collapsed
                                ? 'max-h-0 opacity-0 pt-0 pb-0 pointer-events-none'
                                : 'max-h-28 opacity-100 pt-8 pb-5'
                        }`}
                    >
                        <TopBar logo={mockHeader.logo} />
                    </div>
                )}
            </Container>

            {isHome && (
                <span
                    aria-hidden
                    className={`hidden w-full border-t transition-all duration-500 ease-out lg:block ${
                        collapsed
                            ? 'border-transparent opacity-0'
                            : 'border-t-white/20 opacity-100'
                    }`}
                />
            )}

            <Container>
                <div className="w-full">
                    <MainNav data={mockHeader} isHome={isHome} collapsed={collapsed} />
                </div>
            </Container>
        </header>
    );
}