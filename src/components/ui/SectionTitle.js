// components/ui/SectionTitle.jsx
'use client';

import ShimmerText from "@/components/ui/ShimmerText";
import WaveTitle from "@/components/ui/WaveTitle";
import Icon from "@/components/icons/Icon";
import { useModalStore } from "../../../public/store/useModalStore";

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
    videoWrapper = '',
    animate = true,
}) {
    const openModal = useModalStore((s) => s.openModal);

    const openVideoModal = () => {
        if (!videoWrapper?.videos) return;
        openModal("aboutVideo", { videos: videoWrapper.videos });
    };

    const variants = {
        center: 'text-center',
        left: 'text-left',
    };

    return (
        <div className={`${variants[variant]} ${videoWrapper ? 'relative' : ''}`}>
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
                <div className="mt-4 md:mt-9 text-left flex flex-col items-center lg:grid lg:grid-cols-2 lg:items-baseline gap-2.5">
                    <p className="max-w-md text-center lg:text-left text-lg md:text-[22px] lg:text-[34px] font-bold font-heading leading-none [&_span]:text-primary"
                        dangerouslySetInnerHTML={{ __html: highlightHtml }}>
                    </p>
                    {subtitle && (
                        <p className="lg:col-start-2 lg:row-start-2 text-center lg:text-left mt-2.5 max-w-[515] text-sm md:text-lg lg:text-[22px] text-foreground leading-tight md:leading-6 whitespace-pre-line">
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
            {videoWrapper && (
                <div className="lg:absolute lg:right-0 mt-12.5 lg:mt-0 lg:-bottom-3.5 flex justify-center">
                    <button
                        onClick={openVideoModal}
                        className='cursor-pointer flex items-center gap-5 lg:gap-7 text-sm md:text-lg font-medium  transition-colors'
                    >
                        {videoWrapper.textBtn}
                        <span className="w-10 h-10 lg:w-14 lg:h-14 rounded-full md:w-14 md:h-14 bg-primary relative animate-pulse-ring flex items-center justify-center
                          before:content-[''] before:absolute before:inset-0 before:rounded-full
          before:bg-primary before:scale-100 before:animate-pulse-ring before:z-[-1]
                        ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>

                        </span>
                    </button>
                </div>
            )}
        </div>
    )
}
