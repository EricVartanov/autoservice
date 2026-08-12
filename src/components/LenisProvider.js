'use client';

import {useEffect, useRef, useState} from 'react';
import {ReactLenis, useLenis} from 'lenis/react';
import 'lenis/dist/lenis.css';
import {gsap, ScrollTrigger} from '@/lib/gsap';
import {setLenis} from '@/lib/scrollToSection';

function LenisGsapBridge() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        setLenis(lenis);
        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.refresh();

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
            setLenis(null);
        };
    }, [lenis]);

    return null;
}

/**
 * Root Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Skipped when the user prefers reduced motion.
 */
export default function LenisProvider({children}) {
    const lenisRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setEnabled(!mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const update = (time) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, [enabled]);

    if (!enabled) {
        return children;
    }

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                lerp: 0.1,
                smoothWheel: true,
            }}
        >
            <LenisGsapBridge />
            {children}
        </ReactLenis>
    );
}
