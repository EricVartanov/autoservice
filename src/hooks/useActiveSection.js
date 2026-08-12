'use client';

import { useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 90;
const ROOT_MARGIN = '-45% 0px -45% 0px';

/**
 * Tracks which section intersects the vertical center band of the viewport.
 * @param {{ id: string; theme: 'light' | 'dark' }[]} sections
 * @returns {{ index: number; theme: 'light' | 'dark' }}
 */
export function useActiveSection(sections) {
    const [active, setActive] = useState(() => ({
        index: 0,
        theme: sections[0]?.theme ?? 'dark',
    }));
    const currentIdRef = useRef(sections[0]?.id ?? null);
    const sectionKey = sections.map((s) => `${s.id}:${s.theme}`).join('|');

    useEffect(() => {
        if (!sections.length) return;

        const entriesMeta = sections
            .map((section, index) => {
                const el = document.getElementById(section.id);
                return el ? { el, index, theme: section.theme, id: section.id } : null;
            })
            .filter(Boolean);

        if (!entriesMeta.length) return;

        const byId = new Map(entriesMeta.map((m) => [m.id, m]));
        const intersecting = new Set();
        let debounceTimer = null;

        const pickBest = () => {
            if (!intersecting.size) return null;

            const viewportCenter = window.innerHeight / 2;
            let containing = null;
            let best = null;
            let bestDist = Infinity;

            for (const id of intersecting) {
                const meta = byId.get(id);
                if (!meta) continue;
                const rect = meta.el.getBoundingClientRect();
                if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                    containing = meta;
                }
                const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = meta;
                }
            }
            // Prefer the section that actually covers the viewport mid-line
            return containing ?? best;
        };

        const commit = (next) => {
            if (!next || next.id === currentIdRef.current) return;
            currentIdRef.current = next.id;
            setActive({ index: next.index, theme: next.theme });
        };

        const schedule = () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                commit(pickBest());
                debounceTimer = null;
            }, DEBOUNCE_MS);
        };

        const observer = new IntersectionObserver(
            (observerEntries) => {
                for (const entry of observerEntries) {
                    if (entry.isIntersecting) {
                        intersecting.add(entry.target.id);
                    } else {
                        intersecting.delete(entry.target.id);
                    }
                }
                schedule();
            },
            {
                root: null,
                rootMargin: ROOT_MARGIN,
                threshold: 0,
            },
        );

        for (const { el } of entriesMeta) {
            observer.observe(el);
        }

        return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            observer.disconnect();
        };
        // sectionKey encodes ids + themes; sections is read from the render that produced it
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionKey]);

    return active;
}
