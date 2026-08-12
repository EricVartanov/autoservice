'use client';

import Image from "next/image";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";
import WaveTitle from "@/components/ui/WaveTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SpecialOffer({data}) {
    const {image, highlightHtml, highlightMark, title, subtitle} = data

    return (
        <section className={'relative py-[50] md:py-[90] lg:py-[185]'}>
            <Container>
                {/* фон */}
                <div className="absolute inset-0">
                    <Image src={image.path} alt={image.alt} width={1920} height={640}
                           className={"inset-0 w-full h-full object-cover"}/>
                </div>

                <div className={'relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0'}>
                    <ScrollReveal className={'max-w-full lg:max-w-2xl flex flex-col justify-center items-center lg:items-start'}>
                        {highlightHtml && (
                            <div className="text-center w-[80%] lg:w-full lg:text-left font-heading relative">
                                <h5 className="text-[42px] md:text-[45px] lg:text-[68px] text-foreground-fixed uppercase font-[900] leading-[0.8] [&_span]:text-primary"
                                    dangerouslySetInnerHTML={{__html: highlightHtml}}>
                                </h5>
                                {highlightMark && (
                                    <div
                                        className={'absolute transform font-extrabold leading-none rotate-[-7deg] lg:-rotate-12 px-3 md:px-6 lg:px-9 py-3 text-xs md:text-sm uppercase right-[-15%] -bottom-6 lg:right-0 lg:translate-x-0 lg:-bottom-[5%] rounded-full bg-primary text-foreground-fixed'}>
                                        {highlightMark}
                                    </div>
                                )}
                            </div>
                        )}
                    </ScrollReveal>
                    <div className={'mt-10 md:mt-[75] mx-auto lg:mx-0 max-w-[320] md:max-w-[70%] w-full z-10 text-foreground-fixed font-heading leading-none lg:max-w-lg'}>
                        <WaveTitle as="h5" className="text-lg md:text-[30px] lg:text-[40px] md:max-w-1/2 font-bold leading-none">
                            {title[0]}
                        </WaveTitle>
                        <WaveTitle as="h5" delay={0.15} className="text-right lg:text-left text-lg md:text-[30px] lg:text-[40px] font-bold max-w-none lg:ml-auto lg:max-w-2/3 leading-none">
                            {title[1]}
                        </WaveTitle>
                        <ScrollReveal delay={0.2}>
                            <p className={'mt-2 mx-auto md:mx-0 lg:mt-5 text-center md:text-left text-base leading-5 max-w-[230] md:ml-auto lg:max-w-2/3'}>
                                {subtitle}
                            </p>
                            <div className={'mt-10 md:mt-[60] lg:mt-10 text-center lg:text-left'}>
                                <Button variant={'primary'}>
                                    Подробнее
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </Container>
        </section>
    );
}
