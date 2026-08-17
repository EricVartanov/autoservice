import Image from 'next/image';

export default function ServicePopular({title, items}) {
    return (
        <section className="px-2.5 py-20 md:px-10 md:py-12 lg:px-10 lg:py-[80]">
            <h3 className="font-heading text-center md:text-left font-medium text-[25px] md:text-[28px] lg:text-[34px] leading-none text-foreground">
                {title}
            </h3>
            <div className="mt-[30] md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-2">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="relative overflow-hidden rounded-[30] min-h-[200] flex flex-col justify-center p-6"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                            loading="eager"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(320deg,#be0000_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />
                        <div className="relative z-10 text-center">
                            <h4 className="font-heading text-lg md:text-[22px] font-bold leading-none text-foreground-fixed">
                                {item.title}
                            </h4>
                            <p className="mt-2.5 md:mt-4 text-base md:text-lg text-foreground-fixed">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
