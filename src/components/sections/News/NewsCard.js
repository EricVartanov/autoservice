import Image from 'next/image';

function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
}

export default function NewsCard({item}) {
    const photos = (item.images ?? []).slice(0, 2);
    const isPair = photos.length >= 2;

    return (
        <div className={''}>
            <div className="mb-8 border-t border-btn-border md:mb-[30]"/>
            <article className="flex flex-col gap-4 md:gap-9">

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground md:text-lg">
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    {item.category && <span>{item.category}</span>}
                </div>

                {photos.length > 0 && (
                    <div
                        className={`grid gap-3 md:gap-4 ${
                            isPair ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                        }`}
                    >
                    {photos.map((photo, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            className="relative aspect-video overflow-hidden rounded-2xl bg-background-secondary"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover"
                                sizes={
                                    isPair
                                        ? '(max-width: 768px) 100vw, 50vw'
                                        : '(max-width: 1560px) 100vw, 1560px'
                                }
                            />
                        </div>
                    ))}
                    </div>
                )}

                <div
                    className="flex flex-col gap-3 text-base leading-relaxed text-foreground md:text-lg md:leading-none">
                    {item.paragraphs?.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </article>
        </div>
    );
}
