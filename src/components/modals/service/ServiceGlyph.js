import Image from 'next/image';

function resolveIcon(src) {
    if (!src) return {url: '', alt: ''};
    if (typeof src === 'string') return {url: src, alt: ''};
    return {url: src.url ?? src.path ?? src.src ?? '', alt: src.alt ?? ''};
}

export default function ServiceGlyph({src, alt = '', variant = 'filled'}) {
    const resolved = resolveIcon(src);
    const label = resolved.alt || alt;

    const shell =
        variant === 'outline'
            ? 'flex size-[30] md:size-12 shrink-0 items-center justify-center'
            : 'flex size-[30] md:size-[50] shrink-0 items-center justify-center rounded-full bg-primary-light';

    return (
        <span className={shell} role={label ? 'img' : undefined} aria-label={label || undefined}>
            {resolved.url ? (
                <Image
                    src={resolved.url}
                    alt={label}
                    width={30}
                    height={30}
                    className="size-[25] md:size-[30] object-contain"
                />
            ) : null}
        </span>
    );
}
