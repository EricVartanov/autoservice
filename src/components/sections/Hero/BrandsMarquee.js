import Image from "next/image";

export default function BrandsMarquee({ brands }) {
    // дублируем массив, чтобы анимация зацикливалась без "скачка"
    const items = [...brands, ...brands];

    return (
        <div className="overflow-hidden py-6">
            <div className="flex gap-16 animate-marquee w-max">
                {items.map((brand, i) => (
                    <Image
                        key={`${brand.name}-${i}`}
                        src={brand.logo}
                        alt={brand.name}
                        width={185} height={85}
                        className="h-6 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                ))}
            </div>
        </div>
    );
}