'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useModalStore } from '../../../../public/store/useModalStore';
import HeroCtaButtons from './HeroCtaButtons';

const EASE = [0.22, 1, 0.36, 1];

export default function StickyCtaBar({ sentinelRef, label }) {
    const [scrolledPast, setScrolledPast] = useState(false);
    const [mounted, setMounted] = useState(false);
    const activeModal = useModalStore((s) => s.activeModal);
    const legalSlug = useModalStore((s) => s.legalSlug);
    const panoramaUrl = useModalStore((s) => s.panoramaUrl);
    const visible = scrolledPast && !activeModal && !legalSlug && !panoramaUrl;

    const sync = useCallback(() => {
        const el = sentinelRef.current;
        if (!el) return;
        setScrolledPast(el.getBoundingClientRect().bottom <= 0);
    }, [sentinelRef]);

    useLenis(sync, [sync]);

    useEffect(() => {
        setMounted(true);
        sync();
        window.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        return () => {
            window.removeEventListener('scroll', sync);
            window.removeEventListener('resize', sync);
        };
    }, [sync]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24, transition: { duration: 0.15, ease: EASE } }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] md:bottom-6"
                >
                    <div className="pointer-events-auto rounded-full bg-black/50 p-1.5 backdrop-blur-md md:p-2">
                        <HeroCtaButtons label={label} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
