// src/components/sections/hero/Hero.js
'use client';

import Icon from '@/components/icons/Icon';
import HeroSlideContent from './HeroSlideContent';
import HeroStats from './HeroStats';
import BrandsMarquee from './BrandsMarquee';
import { Video } from "@/components/ui/Video";
import { Container } from "@/components/Container";
import { useModalStore } from "../../../../public/store/useModalStore";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Slider from "@/components/ui/Slider";
import WaveTitle from "@/components/ui/WaveTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Hero({ data }) {
    const { title, backgroundVideo, slides, stats, cta, phone, brands } = data

    const openModal = useModalStore((s) => s.openModal);
    const isMobile = useMediaQuery('(max-width: 767px)');

    const scrollToForm = () => {
        scrollToSection('contact-form');
    };

    return (
        <section className="relative flex flex-col overflow-hidden bg-black">
            <div className="relative flex lg:min-h-[900] xl:min-h-dvh flex-col">
                <div className="absolute inset-0">
                    <Video video={backgroundVideo} className={"inset-0 w-full h-full object-cover"} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                </div>

                <Container className="relative z-10 flex min-h-0 flex-1 flex-col justify-start lg:justify-center gap-5 lg:gap-20 xl:gap-32 pb-14 md:pb-0 pt-22 md:pt-40 lg:pt-35">
                    <WaveTitle as="h1" className="relative font-heading font-bold text-foreground-fixed text-[25px] md:text-[clamp(24px,4.2vh,44px)] lg:text-[clamp(28px,6vh,72px)] whitespace-pre-line">
                        {title}
                    </WaveTitle>

                    <div className="relative z-10 min-h-0 gap-23 md:gap-[clamp(16px,4vh,65px)] lg:gap-unset flex flex-col-reverse items-start md:items-end lg:items-start justify-between md:mt-[clamp(14px,2.4vh,28px)] lg:min-h-[230] lg:mt-0 lg:flex-row">
                        <Slider
                            count={slides.length}
                            arrowsPlacement="stack"
                            swipeable={isMobile}
                            showArrows={!isMobile}
                            className="w-[calc(100%+30px)] md:w-full -mx-3.75 px-3.75 md:px-0 md:mx-0 max-w-none lg:w-lg"
                        >
                            {({ index, direction }) => (
                                <HeroSlideContent
                                    slide={slides[index]}
                                    activeIndex={index}
                                    direction={direction}
                                />
                            )}
                        </Slider>

                        <HeroStats stats={stats} />
                    </div>

                    <div className="md:relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:bottom-0 z-10 flex items-center gap-1 md:gap-4 md:pt-[clamp(12px,3vh,32px)] md:pb-[clamp(16px,3.7vh,40px)] justify-center">
                        <Button variant="primary" onClick={scrollToForm}>
                            {cta.label}
                        </Button>

                        <Button variant="icon" onClick={() => openModal('call')}>
                            <Icon name="phone-unfilled" className="w-6 h-6" />
                        </Button>
                        <div className={'absolute bottom-4 right-4 md:right-0 lg:right-10 xl:right-20 xl:right-0 md:top-[clamp(0px,3vh,22px)] z-10 w-[50] h-[50] md:w-[70] md:h-[70]'}>
                            <ThemeToggle />
                        </div>
                    </div>
                </Container>
            </div>

            <div className="relative z-10 py-[60] md:py-[50] lg:py-[60] bg-background-secondary">
                <BrandsMarquee brands={brands} />
            </div>
        </section>
    );
}
