'use client';

import {useLayoutEffect} from 'react';
import {gsap, ScrollTrigger} from '@/lib/gsap';

/**
 * Pins #hero after it is fully in view so #about can scroll over it.
 * Desktop only; skipped when prefers-reduced-motion is set.
 */
export default function HeroCoverPin() {
    useLayoutEffect(() => {
        const hero = document.getElementById('hero');
        const about = document.getElementById('about');
        if (!hero || !about) return;

        const mm = gsap.matchMedia();

        mm.add(
            '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
            () => {
                const trigger = ScrollTrigger.create({
                    trigger: hero,
                    start: 'bottom bottom',
                    endTrigger: about,
                    end: 'top top',
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                });

                ScrollTrigger.refresh();

                return () => {
                    trigger.kill();
                };
            },
        );

        return () => mm.revert();
    }, []);

    return null;
}
