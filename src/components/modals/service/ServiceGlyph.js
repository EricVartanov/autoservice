import Image from 'next/image';
import {mediaAlt, mediaUrl} from '@/lib/media';

export default function ServiceGlyph({src, alt = '', variant = 'filled'}) {
    const url = mediaUrl(src);
    const label = mediaAlt(src, alt);

    const shell =
        variant === 'outline'
            ? 'flex size-[30] md:size-12 shrink-0 items-center justify-center'
            : 'flex size-[30] md:size-[50] shrink-0 items-center justify-center rounded-full bg-primary-light';

    return (
        <span className={shell} role={label ? 'img' : undefined} aria-label={label || undefined}>
            {url ? (
                <Image
                    src={url}
                    alt={label}
                    width={30}
                    height={30}
                    className="size-[25] md:size-[30] object-contain"
                />
            ) : null}
        </span>
    );
}
