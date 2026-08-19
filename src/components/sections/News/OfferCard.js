import Image from 'next/image';
import {mediaUrl} from '@/lib/media';

function formatUntil(iso) {
    if (!iso || typeof iso !== 'string') return '';
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts;
    return `${d}.${m}.${y.slice(-2)}`;
}

export default function OfferCard({offer, active = true, onCta}) {
    const {badge, title, cta, disclaimer, until, image} = offer;
    const untilLabel = formatUntil(until);
    const imageUrl = mediaUrl(image);

    return (
        <article
            className={`relative flex h-full min-h-[240] overflow-hidden rounded-3xl transition-opacity duration-300 md:min-h-[320]`}
        >
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 82vw"
                    priority={active}
                />
            )}

            <div className="relative z-10 flex min-h-[inherit] w-full">
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 px-5 py-6 md:gap-8 md:px-10 md:py-9 lg:gap-[84] lg:px-[60] lg:pt-[40] lg:pb-[30]">
                    <div>
                        <p className="mb-3 font-helvetica text-base text-foreground-fixed md:mb-5 md:text-lg">
                            {badge}
                        </p>
                        <h2 className="font-heading text-xl font-medium max-w-2xl leading-tight text-foreground-fixed md:text-3xl lg:text-[34px] lg:leading-none whitespace-break-spaces">
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onCta}
                            className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-3 text-xs leading-none font-bold text-foreground-fixed transition hover:bg-primary-light md:mt-7 md:min-h-[54] md:min-w-[213] md:px-10 md:py-3.5 md:text-base"
                        >
                            {cta?.label}
                        </button>
                    </div>

                    {disclaimer && (
                        <p className="max-w-4xl text-[10px] leading-snug text-foreground-light-fixed md:text-xs md:leading-relaxed">
                            {disclaimer}
                        </p>
                    )}
                </div>

                <aside className="flex w-10 shrink-0 items-start py-5 justify-center bg-black/40 md:w-10 lg:w-[42]">
                    <span
                        className="whitespace-nowrap uppercase tracking-[0.18em] text-foreground-fixed text-base md:text-lg"
                        style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}
                    >
                        {badge} до {untilLabel}
                    </span>
                </aside>
            </div>
        </article>
    );
}
