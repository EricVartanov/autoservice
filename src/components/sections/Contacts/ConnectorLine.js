export default function ConnectorLine({side, marker, embedded = false}) {
    const LEFT = {
        path: 'M1 0V27C1 32.5228 5.47715 37 11 37H537C542.523 37 547 32.5228 547 27V1.52055',
        viewBox: '0 0 548 38',
        /** Anchor = right end of path (marker) */
        anchorX: 547 / 548,
        anchorY: 1.52055 / 38,
    };

    const RIGHT = {
        path: embedded ? 'M1 0V26C1 31.5228 5.47715 36 11 36H604C607.866 36 611 39.134 611 43' : 'M1 0V26C1 31.5228 5.47715 36 11 36H601C606.523 36 611 40.4772 611 46V66',
        viewBox: '0 0 612 66',
        /** Anchor = left end of path (marker) */
        anchorX: 1 / 612,
        anchorY: 0,
    };

    const isLeft = side === 'left';
    const cfg = isLeft ? LEFT : RIGHT;

    return (
        <svg
            className="absolute h-auto lg:w-[min(50vw,40vw)] xl:w-[min(50vw,700px)] text-primary"
            style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: `translate(-${cfg.anchorX * 100}%, -${cfg.anchorY * 100}%)`,
            }}
            viewBox={cfg.viewBox}
            preserveAspectRatio={isLeft ? 'xMaxYMin meet' : 'xMinYMin meet'}
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