'use client';

import {useLayoutEffect, useRef} from 'react';
import {gsap} from '@/lib/gsap';

/**
 * Section enters from below scaled down and centered, then grows to full size on scroll.
 * Desktop only; skipped when prefers-reduced-motion is set.
 */
export default function ScrollScaleIn({
    children,
    className = '',
    from = 0.6,
    radius = 32,
    animate = true,
}) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!animate) return;

        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
            const tween = gsap.fromTo(
                el,
                {scale: from, borderRadius: radius},
                {
                    scale: 1,
                    borderRadius: 0,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: el,
                        start: '10% bottom',
                        end: 'top 30%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                },
            );

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, [animate, from, radius]);

    return (
        <div
            ref={ref}
            className={className}
            style={{transformOrigin: 'center top', willChange: 'transform'}}
        >
            {children}
        </div>
    );
}
