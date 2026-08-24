export default function ConnectorLine({side, marker, embedded = false, width = 0}) {
    const LEFT = {
        path: embedded
            ? 'M1 0V32.9172C1 38.4723 5.52754 42.9627 11.0824 42.9169L537.082 38.5817C542.573 38.5365 547 34.0728 547 28.5821V18.02055'
            : 'M1 0V27C1 32.5228 5.47715 37 11 37H537C542.523 37 547 32.5228 547 27V1.52055',
        viewBox: embedded ? '0 0 548 44' : '0 0 548 38',
        /** Anchor = right end of path (marker) */
        anchorX: 547 / 548,
        anchorY: embedded ? 18.02055 / 44 : 1.52055 / 38,
    };

    const RIGHT = {
        path: embedded
            ? 'M1 0V9.5C1 15.0228 5.47715 19.5 11 19.5H598C603.523 19.5 608 23.9772 608 29.5V44'
            : 'M1 0V26C1 31.5228 5.47715 36 11 36H601C606.523 36 611 40.4772 611 46V66',
        viewBox: embedded ? '0 0 609 30' : '0 0 612 66',
        /** Anchor = left end of path (marker) */
        anchorX: embedded ? 1 / 609 : 1 / 612,
        anchorY: 0,
    };

    const isLeft = side === 'left';
    const cfg = isLeft ? LEFT : RIGHT;

    return (
        <svg
            className="absolute h-auto text-primary"
            style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                width: `${width}px`,
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