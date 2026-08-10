import Image from "next/image";

export default function QualityCard({card}) {
    if (card.variant === "third") {
        return (
            <div className="relative p-10 max-lg:p-7 max-md:p-5 bg-[#181818] rounded-[30] overflow-hidden min-h-[488px] max-lg:min-h-[360px] max-md:min-h-[300px] flex flex-col justify-between">
                <span className="absolute right-0 top-0 h-full w-[8.5%] bg-primary"/>
                <div className="text-[34px] leading-none font-bold text-foreground-fixed font-heading">{card.stat}</div>
                <p className="text-base mt-1 text-foreground-light-fixed">{card.statLabel}</p>

                <div className="relative pt-0 mt-auto">
                    <h5 className="text-foreground-fixed leading-none text-[22px] font-bold font-heading mb-5">{card.title}</h5>
                    <p className="text-foreground-light-fixed text-base leading-5 whitespace-pre-line">
                        {card.text}
                    </p>
                </div>
            </div>
        );
    }

    if (card.variant === 'first') {
        return (
            <div className="relative p-10 max-lg:p-7 max-md:p-5 border border-primary rounded-[30] overflow-hidden min-h-[488px] max-lg:min-h-[360px] max-md:min-h-[300px] flex flex-col justify-between">
                <Image
                    src={card.image}
                    alt={card.title}
                    width={1080}
                    height={601}
                    className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700"
                />

                {card.eyebrow && (
                    <p className="relative ml-auto leading-5 text-base text-foreground-fixed font-helvetica max-w-[190]">
                        {card.eyebrow}
                    </p>
                )}

                <div className="relative pt-0 mt-auto">
                    <h5 className="text-foreground-fixed leading-none text-[22px] font-bold font-heading mb-5">{card.title}</h5>
                    <p className="text-foreground-light-fixed text-base leading-5 whitespace-pre-line">
                        {card.text}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative p-10 max-lg:p-7 max-md:p-5 rounded-[30] overflow-hidden min-h-[488px] max-lg:min-h-[360px] max-md:min-h-[300px] flex flex-col justify-between">
            <Image
                src={card.image}
                alt={card.title}
                width={1080}
                height={601}
                className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-[radial-gradient(90%_77%_at_78%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_25%,#be0000_100%)]"/>


            {card.eyebrow && (
                <p className="relative ml-auto leading-5 text-base text-foreground-fixed font-helvetica max-w-[190]">
                    {card.eyebrow}
                </p>
            )}

            <div className="relative pt-0 mt-auto">
                <h5 className="text-foreground-fixed leading-none text-[22px] font-bold font-heading mb-5">{card.title}</h5>
                <p className="text-foreground-light-fixed text-base leading-5 whitespace-pre-line">
                    {card.text}
                </p>
            </div>
        </div>
    );
}