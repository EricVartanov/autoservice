'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * @param {string} query
 * @returns {boolean}
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);

        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}
