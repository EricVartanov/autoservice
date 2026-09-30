'use client';

import {useEffect} from 'react';
import {getLenis, scrollToSection} from '@/lib/scrollToSection';

const MAX_ATTEMPTS = 60;
const RETRY_MS = 32;

/**
 * On the home page, scroll to the section matching the URL hash
 * (e.g. after navigating from /news to /#services).
 */
export default function HashScroll() {
    useEffect(() => {
        let cancelled = false;
        let timer = 0;

        const scrollToHash = () => {
            const id = window.location.hash.slice(1).trim();
            if (!id) return;

            let attempts = 0;

            const tryScroll = () => {
                if (cancelled) return;

                const el = document.getElementById(id);
                if (el) {
                    getLenis()?.resize?.();
                    if (scrollToSection(id)) return;
                }

                attempts += 1;
                if (attempts < MAX_ATTEMPTS) {
                    timer = window.setTimeout(tryScroll, RETRY_MS);
                }
            };

            tryScroll();
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, []);

    return null;
}
