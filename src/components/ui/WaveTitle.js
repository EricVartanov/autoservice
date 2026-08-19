'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';
import { useInModal } from '@/components/modals/InModalContext';

// SplitText normalizes whitespace (incl. "\n") before the browser ever
// renders it via CSS white-space, so manual line breaks in the source text
// must become real <br> nodes instead — SplitText leaves element nodes alone.
function withLineBreaks(children, breakClassName) {
    if (typeof children !== 'string' || !children.includes('\n')) return children;

    return children.split('\n').flatMap((line, i) =>
        i === 0 ? [line] : [' ', <br key={i} className={breakClassName} aria-hidden />, line]
    );
}

/**
 * Polymorphic heading wrapper that reveals its text letter-by-letter in a
 * "wave" cascade once the element scrolls into view. Plays once and respects
 * prefers-reduced-motion. Skipped inside modals.
 */
export default function WaveTitle({
    as: Tag = 'h2',
    children,
    className = '',
    delay = 0,
    breakClassName = '',
    animate = true,
    ...rest
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
            const split = new SplitText(el, { type: 'chars', mask: 'chars', smartWrap: true });

            gsap.set(split.chars, { yPercent: 30, opacity: 0 });

            const tween = gsap.to(split.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'back.out(1.6)',
                delay,
                stagger: { each: 0.035, from: 'start' },
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                onStart: () => {
                    // Снимаем overflow: clip у родительских div
                    split.chars.forEach(char => {
                        const parent = char.parentElement;
                        // setTimeout(() => {
                        if (parent) parent.style.overflow = 'visible';
                        // }, 200);

                    });
                }
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
                split.revert();
            };
        });

        return () => mm.revert();
    }, [enabled, delay]);

    return (
        <Tag ref={ref} className={`${className} leading-none font-medium`} {...rest}>
            {withLineBreaks(children, breakClassName)}
        </Tag>
    );
}
