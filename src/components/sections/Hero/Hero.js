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
                   <Slider
                       count={slides.length}
                       arrowsPlacement="stack"
                       className="w-lg"
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
