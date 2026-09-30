'use client';

/**
 * Full-screen route transition indicator.
 * @param {{ fixed?: boolean; className?: string }} [props]
 */
export default function PageLoader({fixed = true, className = ''}) {
    return (
        <div
            className={`${fixed ? 'fixed inset-0 z-200' : 'relative min-h-[50vh] w-full'} flex items-center justify-center bg-black ${className}`}
            role="status"
            aria-live="polite"
            aria-label="Загрузка"
        >
            <span className="sr-only">Загрузка…</span>
            <span
                className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-primary"
                aria-hidden
            />
        </div>
    );
}
