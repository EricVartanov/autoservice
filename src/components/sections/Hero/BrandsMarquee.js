import Image from "next/image";
import {mediaUrl} from "@/lib/media";

function BrandLogo({ brand, className }) {
    return (
        <>
            <Image
                src={mediaUrl(brand.logo)}
                alt={brand.name}
                width={185}
                height={85}
                className={`hidden not-even:${className} dark:block`}
            />
            {brand.logoDark && (
                <Image
                    src={mediaUrl(brand.logoDark)}
                    alt=""
                    width={185}
                    height={85}
                    className={`${className} dark:hidden`}
                />
            )}
        </>
    );
}

export default function BrandsMarquee({ brands }) {
    // дублируем массив, чтобы анимация зацикливалась без "скачка"
    const items = [...brands, ...brands];

    return (
        <>
            {/* Mobile: static 3×3 grid */}
            <div className="grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-4 px-2 md:hidden">
                {brands.map((brand) => (
                    <BrandLogo
                        key={brand.name}
                        brand={brand}
                        className="h-auto w-full max-w-[90px] object-contain"
                    />
                ))}
            </div>

            {/* Tablet+: marquee */}
            <div className="hidden overflow-hidden md:block">
                <div className="flex w-max gap-7 animate-marquee">
                    {items.map((brand, i) => (
                        <BrandLogo
                            key={`${brand.name}-${i}`}
                            brand={brand}
                            className="h-auto"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
