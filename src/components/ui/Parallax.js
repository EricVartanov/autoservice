'use client';

import {useLayoutEffect, useRef} from 'react';
import {gsap} from '@/lib/gsap';
import {useInModal} from '@/components/modals/InModalContext';

/**
 * Moves its content vertically as the page scrolls past it.
 * Respects prefers-reduced-motion. Skipped inside modals.
 */
export default function Parallax({
    children,
    className = '',
    distance = 40,
    as: Tag = 'div',
    animate = true,
}) {
    const ref = useRef(null);
    const inModal = useInModal();
    const enabled = animate && !inModal;

    useLayoutEffect(() => {
        if (!enabled) return;

        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const tween = gsap.fromTo(
                el,
                {y: distance},
                {
                    y: -distance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, [enabled, distance]);

    return (
        <Tag ref={ref} className={className} aria-hidden>
            {children}
        </Tag>
    );
}
