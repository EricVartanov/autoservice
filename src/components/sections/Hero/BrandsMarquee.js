import Image from "next/image";

export default function BrandsMarquee({ brands }) {
    // дублируем массив, чтобы анимация зацикливалась без "скачка"
    const items = [...brands, ...brands];

    return (
        <>
            {/* Mobile: static 3×3 grid */}
            <div className="grid grid-cols-3 items-center justify-items-center gap-x-3 gap-y-6 px-2 py-4 md:hidden">
                {brands.map((brand) => (
                    <Image
                        key={brand.name}
                        src={brand.logo}
                        alt={brand.name}
                        width={185}
                        height={85}
                        className="h-auto w-full max-w-[90px] object-contain"
                    />
                ))}
            </div>

            {/* Tablet+: marquee */}
            <div className="hidden overflow-hidden py-6 md:block">
                <div className="flex w-max gap-7 animate-marquee">
                    {items.map((brand, i) => (
                        <Image
                            key={`${brand.name}-${i}`}
                            src={brand.logo}
                            alt={brand.name}
                            width={185}
                            height={85}
                            className="h-auto"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
