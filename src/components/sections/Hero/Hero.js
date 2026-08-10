// src/components/sections/hero/Hero.js
'use client';

import Icon from '@/components/icons/Icon';
import HeroSlideContent from './HeroSlideContent';
import HeroStats from './HeroStats';
import BrandsMarquee from './BrandsMarquee';
import {Video} from "@/components/ui/Video";
import {Container} from "@/components/Container";
import {useModalStore} from "../../../../public/store/useModalStore";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Slider from "@/components/ui/Slider";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export default function Hero({data}) {
    const {title, backgroundVideo, slides, stats, cta, phone, brands} = data

    const openModal = useModalStore((s) => s.openModal);
    const isMobile = useMediaQuery('(max-width: 767px)');

    const scrollToForm = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative flex flex-col justify-end overflow-hidden bg-black max-lg:pt-40 max-md:pt-22 lg:pt-[290]">
           <Container>
               {/* фон */}
               <div className="absolute inset-0">
                   <Video video={backgroundVideo} className={"inset-0 w-full h-full object-cover"}/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"/>
               </div>

               {/* Title;*/}
               <h1 className="relative font-heading font-bold text-foreground-fixed text-7xl md:text-6xl leading-none whitespace-pre-line max-lg:text-[40px] max-md:text-[28px] md:max-lg:text-[48px]">
                   {title}
               </h1>


               {/* нижний блок: слайдер + статистика (desktop) */}
               <div className="relative z-10 gap-[90] md:gap-[65] lg:gap-unset flex flex-col-reverse items-start md:items-end lg:items-start justify-between mt-5 md:mt-7 lg:mt-[210] lg:flex-row">
                   <Slider
                       count={slides.length}
                       arrowsPlacement="stack"
                       swipeable={isMobile}
                       showArrows={!isMobile}
                       className="w-full max-lg:max-w-none lg:w-lg"
                   >
                       {({index, direction}) => (
                           <HeroSlideContent
                               slide={slides[index]}
                               activeIndex={index}
                               direction={direction}
                           />
                       )}
                   </Slider>

                    <HeroStats stats={stats}/>
               </div>

               {/* кнопки действия */}
               <div className="relative z-10 flex items-center gap-4 px-0 pb-5 md:pb-9 pt-4 md:pt-8 lg:pb-10 justify-center lg:px-8">
                   <Button variant="primary" onClick={scrollToForm}>
                       {cta.label}
                   </Button>

                   <Button variant="icon" onClick={() => openModal('call')}>
                       <Icon name="phone-unfilled" className="w-6 h-6"/>
                   </Button>

                   <div className={'absolute z-10 -top-2 right-0 w-[70] h-[70] max-lg:hidden'}>
                       <ThemeToggle />
                   </div>
               </div>
           </Container>

            {/* бегущая лента брендов / mobile grid */}
            <div className="relative z-10 py-[50] md:py-[60] bg-brands-bg">
                <BrandsMarquee brands={brands}/>
            </div>
        </section>
    );
}
