import Image from "next/image";

export default function BrandsMarquee({ brands }) {
    // дублируем массив, чтобы анимация зацикливалась без "скачка"
    const items = [...brands, ...brands];

    return (
        <div className="overflow-hidden py-6">
            <div className="flex gap-7 animate-marquee w-max">
                {items.map((brand, i) => (
                    <Image
                        key={`${brand.name}-${i}`}
                        src={brand.logo}
                        alt={brand.name}
                        width={185} height={85}
                        className="h-auto"
                    />
                ))}
            </div>
        </div>
    );
}