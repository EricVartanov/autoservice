'use client';

import {useEffect} from 'react';
import {scrollToSection} from '@/lib/scrollToSection';

/**
 * On the home page, scroll to the section matching the URL hash
 * (e.g. after navigating from /news to /#services).
 */
export default function HashScroll() {
    useEffect(() => {
        const scrollToHash = () => {
            const id = window.location.hash.slice(1);
            if (!id) return;
            // Wait a tick so section DOM is ready after client navigation
            requestAnimationFrame(() => {
                scrollToSection(id);
            });
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => window.removeEventListener('hashchange', scrollToHash);
    }, []);

    return null;
}
