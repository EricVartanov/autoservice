// components/ui/SectionTitle.jsx
'use client';

import ShimmerText from "@/components/ui/ShimmerText";
import WaveTitle from "@/components/ui/WaveTitle";
import Icon from "@/components/icons/Icon";

export default function SectionTitle({
    title = '',
    subtitle = '',
    titleBack = '',
    highlightHtml = null,
    mark,
    titleBackPosition = '',
    variant = 'center',
    titleColor = 'text-foreground',
    subtitleClass = '',
    animate = true,
}) {
    const variants = {
        center: 'text-center',
        left: 'text-left',

    };

    return (
        <div className={`${variants[variant]}`}>
            <div className={'relative z-10'}>
                {mark && (
                    <p className={`flex items-center gap-1.5 font-medium text-xs md:text-lg ${titleColor} font-sans mb-4 ${variant === 'center' ? 'justify-center' : ''}`}>
                        <Icon name={'star'} className={'text-primary-light size-2 md:size-3'} />
                        {mark}
                    </p>
                )}

                {animate ? (
                    <WaveTitle as="h2" breakClassName="hidden md:block" className={`font-heading tracking-tight text-[25px] md:text-[40px] lg:text-[54px] ${titleColor} md:whitespace-pre-line`}>
                        {title}
                    </WaveTitle>
                ) : (
                    <h2 className={`font-heading tracking-tight text-[25px] md:text-[40px] lg:text-[54px] ${titleColor} leading-none md:whitespace-pre-line`}>
                        {title}
                    </h2>
                )}

                {titleBack && (
                    <div className="pointer-events-none absolute bottom-[-20] md:bottom-[-25] lg:bottom-0 left-1/2 z-[-1] flex w-screen -translate-x-1/2 justify-center overflow-x-clip lg:left-0 lg:right-0 lg:block lg:w-auto lg:translate-x-0 lg:overflow-visible">
                        <ShimmerText
                            as="h3"
                            className={`py-2.5 md:pb-3 lg:pb-[1.5rem] whitespace-nowrap text-[58px] md:text-[120px] lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:text-[120px] leading-[0.8] font-bold font-heading tracking-tight ${titleBackPosition}`}
                        >
                            {titleBack}
                        </ShimmerText>
                    </div>
                )}
            </div>

            {highlightHtml ? (
                <div className="mt-4 md:mt-9 text-left flex flex-col items-center lg:items-baseline lg:justify-between gap-2.5">
                    <p className="max-w-md text-center lg:text-left text-lg md:text-[22px] lg:text-[34px] font-bold font-heading leading-none [&_span]:text-primary"
                        dangerouslySetInnerHTML={{ __html: highlightHtml }}>
                    </p>
                    {subtitle && (
                        <p className="lg:ml-auto text-center lg:text-left mt-2.5 max-w-[515] text-sm md:text-lg lg:text-[22px] text-foreground leading-tight md:leading-6 whitespace-pre-line">
                            {subtitle}
                        </p>
                    )}
                </div>
            ) : (
                subtitle && (
                    <p className={`mt-7 max-w-2xl mx-auto md:text-lg text-sm text-foreground-light leading-tight md:leading-6 md:whitespace-pre-line ${subtitleClass}`}>
                        {subtitle}
                    </p>
                )
            )}
        </div>
    )
}
