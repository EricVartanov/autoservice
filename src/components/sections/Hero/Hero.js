// src/components/sections/hero/Hero.js
'use client';

import {useState} from 'react';
import Icon from '@/components/icons/Icon';
import HeroSlideContent from './HeroSlideContent';
import HeroStats from './HeroStats';
import BrandsMarquee from './BrandsMarquee';
import {Video} from "@/components/ui/Video";
import {Container} from "@/components/Container";
import {useModalStore} from "../../../../public/store/useModalStore";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Hero({data}) {
    const {title, backgroundVideo, slides, stats, cta, phone, brands} = data

    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextSlide = () => {
        setDirection(1);
        setActiveSlide((i) => (i + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveSlide((i) => (i - 1 + slides.length) % slides.length);
    };

    const openModal = useModalStore((s) => s.openModal);

    const scrollToForm = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative xl:pt-[290] flex flex-col justify-end overflow-hidden bg-black">
           <Container>
               {/* фон */}
               <div className="absolute inset-0">
                   <Video video={backgroundVideo} className={"inset-0 w-full h-full object-cover"}/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"/>
               </div>

               {/* заголовок */}
               <h1 className="relative font-heading font-bold text-foreground-fixed text-7xl md:text-6xl leading-none whitespace-pre-line">
                   {title}
               </h1>

               {/* нижний блок: слайдер + статистика */}
               <div className="relative z-10 flex flex-col md:flex-row items-start  justify-between mt-[210]">
                   <div className="w-lg relative">
                       <div className="absolute z-10 top-0 right-0 flex-col gap-3.5 shrink-0">
                           <button
                               onClick={prevSlide}
                               className="w-9 h-9 text-foreground-fixed hover:opacity-60 cursor-pointer"
                               aria-label="Предыдущий слайд"
                           >
                               <Icon name={"arrow-left"} className="w-8 h-8"/>
                           </button>
                           <button
                               onClick={nextSlide}
                               className="w-9 h-9 text-foreground-fixed hover:opacity-60 cursor-pointer"
                               aria-label="Следующий слайд"
                           >
                               <Icon name={"arrow-right"} className="w-8 h-8"/>
                           </button>
                       </div>

                       <HeroSlideContent
                           slide={slides[activeSlide]}
                           activeIndex={activeSlide}
                           direction={direction}
                       />
                   </div>

                   <HeroStats stats={stats}/>
               </div>

               {/* кнопки действия */}
               <div className="relative z-10 relative flex justify-center items-center gap-4 px-8 pb-10">
                   <Button variant="primary" onClick={scrollToForm}>
                       {cta.label}
                   </Button>

                   <Button variant="icon" onClick={() => openModal('call')}>
                       <Icon name="phone-unfilled" className="w-6 h-6"/>
                   </Button>

                   <div className={'absolute z-10 -top-2 right-0 w-[70] h-[70]'}>
                       <ThemeToggle />
                   </div>
               </div>
           </Container>

            {/* бегущая лента брендов */}
            <div className="relative z-10 py-[60] bg-brands-bg">
                <BrandsMarquee brands={brands}/>
            </div>
        </section>
    );
}
