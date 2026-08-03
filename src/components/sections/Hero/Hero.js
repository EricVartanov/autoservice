// src/components/sections/hero/Hero.js
'use client';

import {useState} from 'react';
import Icon from '@/components/icons/Icon';
import HeroSlideContent from './HeroSlideContent';
import HeroStats from './HeroStats';
import BrandsMarquee from './BrandsMarquee';
import {Video} from "@/components/ui/Video";
import {Container} from "@/components/Container";

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
               <div className="relative z-10 flex items-center gap-4 px-8 pb-24">
                   <a href={cta.link}
                      className="bg-primary hover:bg-primary-light transition-colors text-white font-medium px-6 py-3 rounded-full"
                   >
                       {cta.label}
                   </a>

                   <a href={`tel:${phone}`}
                      className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      aria-label="Позвонить"
                   >
                       <Icon name="phone-filled" className="w-5 h-5"/>
                   </a>
               </div>
           </Container>

            {/* бегущая лента брендов */}
            <div className="relative z-10 border-t border-white/10">
                <BrandsMarquee brands={brands}/>
            </div>
        </section>
    );
}
