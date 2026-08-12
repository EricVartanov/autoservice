'use client';

import {useLayoutEffect, useRef} from 'react';
import {gsap} from '@/lib/gsap';

/**
 * Fade + slide-up reveal on scroll. Optionally staggers direct children.
 * Plays once and respects prefers-reduced-motion.
 */
export default function ScrollReveal({
    children,
    className = '',
    stagger = false,
    staggerEach = 0.08,
    y = 32,
    delay = 0,
    start = 'top 85%',
    as: Tag = 'div',
}) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const targets = stagger
                ? Array.from(el.children).filter((child) => child.nodeType === 1)
                : [el];

            if (!targets.length) return;

            gsap.set(targets, {opacity: 0, y});

            const tween = gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power2.out',
                delay,
                stagger: stagger ? {each: staggerEach, from: 'start'} : 0,
                scrollTrigger: {
                    trigger: el,
                    start,
                    once: true,
                },
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, [stagger, staggerEach, y, delay, start]);

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
