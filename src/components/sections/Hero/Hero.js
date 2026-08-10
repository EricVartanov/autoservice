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

export default function Hero({data}) {
    const {title, backgroundVideo, slides, stats, cta, phone, brands} = data

    const openModal = useModalStore((s) => s.openModal);

    const scrollToForm = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative flex flex-col justify-end overflow-hidden bg-black max-lg:pt-40 max-md:pt-28 lg:pt-[290]">
           <Container>
               {/* фон */}
               <div className="absolute inset-0">
                   <Video video={backgroundVideo} className={"inset-0 w-full h-full object-cover"}/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"/>
               </div>

               {/* Title; tablet: + stats side by side */}
               <div className="relative z-10 flex items-start justify-between gap-6 lg:block">
                   <h1 className="relative font-heading font-bold text-foreground-fixed text-7xl md:text-6xl leading-none whitespace-pre-line max-lg:text-[40px] max-md:text-[28px] md:max-lg:text-[48px]">
                       {title}
                   </h1>
                   <div className="hidden shrink-0 md:block lg:hidden">
                       <HeroStats stats={stats} compact />
                   </div>
               </div>

               {/* Mobile: stats in a row under title */}
               <div className="relative z-10 mt-8 md:hidden">
                   <HeroStats stats={stats} layout="row" />
               </div>

               {/* нижний блок: слайдер + статистика (desktop) */}
               <div className="relative z-10 mt-10 flex flex-col items-start justify-between max-lg:mt-12 max-md:mt-8 lg:mt-[210] lg:flex-row">
                   <Slider
                       count={slides.length}
                       arrowsPlacement="stack"
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

                   <div className="hidden lg:block">
                       <HeroStats stats={stats}/>
                   </div>
               </div>

               {/* кнопки действия */}
               <div className="relative z-10 flex items-center gap-4 px-0 pb-10 pt-8 max-lg:justify-start max-md:pt-6 max-md:pb-8 lg:justify-center lg:px-8">
                   <Button variant="primary" onClick={scrollToForm} className="max-md:flex-1 max-md:min-w-0">
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
            <div className="relative z-10 py-[60] max-md:py-8 bg-brands-bg">
                <BrandsMarquee brands={brands}/>
            </div>
        </section>
    );
}
