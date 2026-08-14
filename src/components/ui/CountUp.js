'use client';

import {useLayoutEffect, useRef} from 'react';
import {gsap} from '@/lib/gsap';
import {useInModal} from '@/components/modals/InModalContext';

function parseValue(raw) {
    const match = String(raw).match(/^(\D*)([\d\s.,]+)(.*)$/);
    if (!match) {
        return {prefix: '', target: 0, suffix: String(raw)};
    }

    const [, prefix, digits, suffix] = match;
    return {
        prefix,
        target: Number(digits.replace(/\s/g, '').replace(',', '.')) || 0,
        suffix,
    };
}

/**
 * Counts from 0 to the given value when the element enters the viewport.
 * Plays once and respects prefers-reduced-motion. Skipped inside modals.
 */
export default function CountUp({
    value,
    className = '',
    duration = 1.6,
    start = 'top 85%',
    delay = 0.2,
}) {
    const ref = useRef(null);
    const inModal = useInModal();

    useLayoutEffect(() => {
        if (inModal) return;

        const el = ref.current;
        if (!el) return;

        const {prefix, target, suffix} = parseValue(value);
        const format = (n) => `${prefix}${Math.round(n)}${suffix}`;

        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            el.textContent = format(0);

            const obj = {n: 0};
            const tween = gsap.to(obj, {
                n: target,
                duration,
                delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start,
                    once: true,
                },
                onUpdate: () => {
                    el.textContent = format(obj.n);
                },
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, [inModal, value, duration, start, delay]);

    return (
        <span ref={ref} className={className}>
            {value}
        </span>
    );
}
