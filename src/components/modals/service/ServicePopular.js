import Image from 'next/image';

export default function ServicePopular({title, items}) {
    return (
        <section className="px-5 py-10 md:px-10 md:py-12 lg:px-10 lg:py-[80]">
            <h3 className="font-heading text-xl md:text-[28px] lg:text-[34px] leading-none text-foreground">
                {title}
            </h3>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="relative overflow-hidden rounded-[30] min-h-[200] flex flex-col justify-center p-6"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(320deg,#be0000_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />
                        <div className="relative z-10 text-center">
                            <h4 className="font-heading text-lg md:text-[22px] font-bold leading-none text-foreground-fixed">
                                {item.title}
                            </h4>
                            <p className="mt-4 text-base md:text-lg text-foreground-fixed">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
