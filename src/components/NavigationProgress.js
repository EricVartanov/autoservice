'use client';

import {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import PageLoader from '@/components/ui/PageLoader';

/**
 * Instant overlay on internal path changes (before RSC loading.js streams in).
 * Ignores same-path hash navigations on the home page.
 */
export default function NavigationProgress() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const pathnameRef = useRef(pathname);

    useEffect(() => {
        pathnameRef.current = pathname;
        setLoading(false);
    }, [pathname]);

    useEffect(() => {
        const onClick = (e) => {
            if (e.defaultPrevented) return;
            if (e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const anchor = e.target instanceof Element ? e.target.closest('a[href]') : null;
            if (!anchor) return;
            if (anchor.hasAttribute('download') || anchor.target === '_blank') return;

            let url;
            try {
                url = new URL(anchor.href, window.location.href);
            } catch {
                return;
            }

            if (url.origin !== window.location.origin) return;
            if (url.pathname === pathnameRef.current) return;

            setLoading(true);
        };

        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    if (!loading) return null;
    return <PageLoader />;
}
