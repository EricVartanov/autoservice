import Image from "next/image";

export default function QualityCard({card}) {
    if (card.variant === "third") {
        return (
            <div className="relative px-5 py-6 md:p-10 bg-[#181818] rounded-[30] overflow-hidden min-h-[300px] md:min-h-[360px] lg:min-h-[488px] flex flex-col justify-between">
                <span className="absolute right-0 top-0 h-full w-[15] md:w-[42] lg:w-[8.5%] bg-primary"/>
                <div className="text-[22px] md:text-[34px] leading-none font-bold text-foreground-fixed font-heading">{card.stat}</div>
                <p className="text-sm md:text-base mt-1 text-foreground-light-fixed">{card.statLabel}</p>

                <div className="relative pt-0 mt-auto">
                    <h5 className="text-foreground-fixed leading-none text-lg md:text-[22px] font-bold font-heading mb-3.5 md:mb-5">{card.title}</h5>
                    <p className="text-foreground-light-fixed text-sm md:text-base leading-5 whitespace-pre-line">
                        {card.text}
                    </p>
                </div>
            </div>
        );
    }

    if (card.variant === 'first') {
        return (
            <div className="relative px-5 py-6 md:p-10 border border-primary rounded-[30] overflow-hidden min-h-[300px] md:min-h-[360px] lg:min-h-[488px] flex flex-col justify-between">
                <Image
                    src={card.image}
                    alt={card.title}
                    width={1080}
                    height={601}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700"
                />

                {card.eyebrow && (
                    <p className="hidden md:block relative ml-auto leading-5 text-base text-foreground-fixed font-helvetica max-w-[190]">
                        {card.eyebrow}
                    </p>
                )}

                <div className="relative pt-0 mt-auto">
                    <h5 className="text-foreground-fixed leading-none text-lg md:text-[22px] font-bold font-heading mb-3.5 md:mb-5">
                        {card.title}
                    </h5>
                    <p className="text-foreground-light-fixed text-sm md:text-base leading-5 whitespace-pre-line">
                        {card.text}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative px-5 py-6 md:p-10 rounded-[30] overflow-hidden min-h-[300px] md:min-h-[360px] lg:min-h-[488px] flex flex-col justify-between">
            <Image
                src={card.image}
                alt={card.title}
                width={1080}
                height={601}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-[radial-gradient(90%_77%_at_78%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_25%,#be0000_100%)]"/>


            {card.eyebrow && (
                <p className="hidden md:block relative ml-auto leading-5 text-base text-foreground-fixed font-helvetica max-w-[190]">
                    {card.eyebrow}
                </p>
            )}

            <div className="relative pt-0 mt-auto">
                <h5 className="text-foreground-fixed leading-none text-lg md:text-[22px] font-bold font-heading mb-3.5 md:mb-5">{card.title}</h5>
                <p className="text-foreground-light-fixed text-sm md:text-base leading-5 whitespace-pre-line">
                    {card.text}
                </p>
            </div>
        </div>
    );
}