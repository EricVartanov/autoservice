export default function ServicePriceList({title, items, subtitle}) {
    return (
        <section className="px-5 md:px-10">
            <h3 className="font-heading text-xl md:text-[28px] lg:text-[34px] leading-none text-foreground">
                {title}
            </h3>
            <p className={'mt-4 text-foreground-light text-base md:text-lg leading-none'}>
                {subtitle}
            </p>
            <ul className="mt-6 md:mt-8">
                {items.map((item) => (
                    <li
                        key={item.title}
                        className="mb-2.5 flex gap-1 flex-row items-center justify-between px-9 py-3 md:py-[18] rounded-full bg-foreground-fixed"
                    >
                        <span className="font-helvetica text-base md:text-lg lg:text-[22px] text-black">
                            {item.title}
                        </span>
                        <span className="font-heading text-base md:text-lg lg:text-[22px] font-bold text-black shrink-0">
                            {item.price}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
