import Image from "next/image";
import {mediaAlt, mediaUrl} from "@/lib/media";

function BrandLogo({ brand, className }) {
    const logo = mediaUrl(brand.logo);
    const logoDark = mediaUrl(brand.logoDark);
    return (
        <>
            {logo && (
                <Image
                    src={logo}
                    alt={brand.name}
                    width={185}
                    height={85}
                    className={`hidden not-even:${className} dark:block`}
                />
            )}
            {logoDark && (
                <Image
                    src={logoDark}
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
                {brands.map((brand, i) => (
                    <BrandLogo
                        key={`${brand.name}-${i}`}
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
