const LEFT = {
    path: 'M0.542969 0.839844L57.043 37.3398H470.043',
    viewBox: '0 0 471 39',
    /** Anchor = right end of path (marker): horizontal first from the pin */
    anchorX: 470.043 / 471,
    anchorY: 37.3398 / 39,
};

const RIGHT = {
    path: 'M382.199 35.9732L338.177 1H0.000137544',
    viewBox: '0 0 383 37',
    /** Anchor = left end of path (marker): horizontal first from the pin */
    anchorX: 0,
    anchorY: 1 / 37,
};

function ConnectorLine({side, marker}) {
    const isLeft = side === 'left';
    const cfg = isLeft ? LEFT : RIGHT;

    return (
        <svg
            className="absolute h-auto w-[min(38vw,380px)] text-primary"
            style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: `translate(-${cfg.anchorX * 100}%, -${cfg.anchorY * 100}%)`,
            }}
            viewBox={cfg.viewBox}
            preserveAspectRatio={isLeft ? 'xMaxYMax meet' : 'xMinYMin meet'}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d={cfg.path}
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
            />
        </svg>
    );
}

/**
 * Figma connector paths + map markers. Desktop only (lg+).
 * From each pin: horizontal first, then diagonal toward the branch title.
 */
export default function MapConnectors({branches}) {
    const [left, right] = branches;
    if (!left?.marker || !right?.marker) return null;

    return (
        <div className="pointer-events-none absolute inset-0 z-2 hidden lg:block" aria-hidden>
            <ConnectorLine side="left" marker={left.marker}/>
            <ConnectorLine side="right" marker={right.marker}/>

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
