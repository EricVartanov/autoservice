'use client';

import Image from "next/image";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";
import WaveTitle from "@/components/ui/WaveTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {useModalStore} from "../../../../public/store/useModalStore";
import {mediaAlt, mediaUrl} from "@/lib/media";

export default function SpecialOffer({data}) {
    const {image, highlightHtml, highlightMark, title, subtitle, cta} = data
    const openModal = useModalStore((s) => s.openModal);

    return (
        <section className={'relative py-[60] md:py-[90] lg:py-[185]'}>
            <Container>
                {/* фон */}
                <div className="absolute inset-0">
                    <Image src={mediaUrl(image)} alt={mediaAlt(image)} fill sizes="100vw" priority
                           className={"object-cover"}/>
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className={'relative z-10 flex flex-col items-start md:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0'}>
                    <ScrollReveal className={'max-w-full mx-auto lg:mx-0 lg:max-w-2xl flex flex-col justify-center items-center lg:items-start'}>
                        {highlightHtml && (
                            <div className="text-center w-[80%] md:w-[70%] lg:w-full lg:text-left font-heading relative">
                                <h5 className="text-[22px] md:text-[45px] lg:text-[68px] text-foreground-fixed uppercase font-[900] leading-[0.8] [&_span]:text-primary"
                                    dangerouslySetInnerHTML={{__html: highlightHtml}}>
                                </h5>
                                {highlightMark && (
                                    <div
                                        className={'absolute transform font-extrabold leading-none rotate-[-7deg] lg:-rotate-12 px-2.5 py-1.5 md:px-6 lg:px-9 md:py-3 text-[10px] md:text-sm uppercase right-[-15%] -bottom-5 md:-bottom-6 lg:right-0 lg:translate-x-0 lg:-bottom-[5%] rounded-full bg-primary text-foreground-fixed'}>
                                        {highlightMark}
                                    </div>
                                )}
                            </div>
                        )}
                    </ScrollReveal>
                    <div className={'mt-[50] md:mt-[75] mx-auto lg:mx-0 max-w-[320] md:max-w-[70%] w-full z-10 text-foreground-fixed font-heading leading-none lg:max-w-lg'}>
                        <WaveTitle as="h5" className="text-center md:text-left text-lg md:text-[30px] lg:text-[40px] md:max-w-1/2 font-bold">
                            {title[0]}
                        </WaveTitle>
                        <WaveTitle as="h5" delay={0.15} className="text-center md:text-right lg:text-left text-lg md:text-[30px] lg:text-[40px] font-bold max-w-none lg:ml-auto lg:max-w-2/3">
                            {title[1]}
                        </WaveTitle>
                        <ScrollReveal delay={0.2}>
                            <p className={'mt-[30] md:mt-2 mx-auto md:mx-0 lg:mt-5 text-center md:text-left text-base leading-5 max-w-[230] md:ml-auto lg:max-w-2/3'}>
                                {subtitle}
                            </p>
                            <div className={'mt-10 md:mt-[60] lg:mt-10 text-center lg:text-left'}>
                                <Button variant={'primary'} onClick={() => openModal('specialOffer', data)}>
                                    {cta?.label ?? 'Подробнее'}
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </Container>
        </section>
    );
}
