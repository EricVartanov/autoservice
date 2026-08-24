'use client';

import {useLayoutEffect, useRef, useState} from 'react';
import ConnectorLine from '@/components/sections/Contacts/ConnectorLine';

function lineWidth(overlay, title, markerX) {
    if (!overlay || !title) return 0;
    const overlayRect = overlay.getBoundingClientRect();
    if (overlayRect.width === 0) return 0;
    const titleRect = title.getBoundingClientRect();
    const pinX = overlayRect.left + (overlayRect.width * markerX) / 100;
    const titleCenterX = titleRect.left + titleRect.width / 2;
    return Math.round(Math.abs(pinX - titleCenterX));
}

/**
 * Figma connector paths + map markers. Desktop only (lg+).
 * Rounded U-shapes from each pin toward the branch title.
 */
export default function MapConnectors({branches, embedded = false}) {
    const [left, right] = branches;
    const overlayRef = useRef(null);
    const [widths, setWidths] = useState({left: 0, right: 0});

    useLayoutEffect(() => {
        if (!left?.marker || !right?.marker) return undefined;

        const overlay = overlayRef.current;
        if (!overlay) return undefined;

        const measure = () => {
            const root = overlay.parentElement;
            const next = {
                left: lineWidth(
                    overlay,
                    root?.querySelector('[data-branch-title="left"]'),
                    left.marker.x,
                ),
                right: lineWidth(
                    overlay,
                    root?.querySelector('[data-branch-title="right"]'),
                    right.marker.x,
                ),
            };
            setWidths((prev) =>
                prev.left === next.left && prev.right === next.right ? prev : next,
            );
        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(overlay);
        if (overlay.parentElement) observer.observe(overlay.parentElement);
        const leftTitle = overlay.parentElement?.querySelector('[data-branch-title="left"]');
        const rightTitle = overlay.parentElement?.querySelector('[data-branch-title="right"]');
        if (leftTitle) observer.observe(leftTitle);
        if (rightTitle) observer.observe(rightTitle);

        let cancelled = false;
        document.fonts?.ready?.then(() => {
            if (!cancelled) measure();
        });

        const mq = window.matchMedia('(min-width: 80rem)');
        mq.addEventListener('change', measure);
        window.addEventListener('resize', measure);

        return () => {
            cancelled = true;
            observer.disconnect();
            mq.removeEventListener('change', measure);
            window.removeEventListener('resize', measure);
        };
    }, [left?.marker?.x, left?.marker?.y, right?.marker?.x, right?.marker?.y]);

    if (!left?.marker || !right?.marker) return null;

    return (
        <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-2 hidden lg:block"
            aria-hidden
        >
            <ConnectorLine
                side="left"
                marker={left.marker}
                embedded={embedded}
                width={widths.left}
            />
            <ConnectorLine
                side="right"
                marker={right.marker}
                embedded={embedded}
                width={widths.right}
            />

            <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light"
                style={{left: `${left.marker.x}%`, top: `${left.marker.y}%`}}
            />
            <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light"
                style={{left: `${right.marker.x}%`, top: `${right.marker.y}%`}}
            />
        </div>
    );
}
