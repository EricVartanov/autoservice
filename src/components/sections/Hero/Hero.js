// src/components/sections/hero/Hero.js
'use client';

import {useState} from 'react';
import Icon from '@/components/icons/Icon';
import HeroSlideContent from './HeroSlideContent';
import HeroStats from './HeroStats';
import BrandsMarquee from './BrandsMarquee';
import {Video} from "@/components/ui/Video";

export default function Hero({data}) {
    const {title, backgroundVideo, slides, stats, cta, phone, brands} = data

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = () => setActiveSlide((i) => (i + 1) % slides.length);
    const prevSlide = () => setActiveSlide((i) => (i - 1 + slides.length) % slides.length);

    return (
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black">
            {/* фон */}
            <div className="absolute inset-0">
                <Video video={backgroundVideo} className={"inset-0 w-full h-full object-cover"}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"/>
            </div>

            {/* заголовок */}
            <h1 className="relative z-10 font-heading font-bold text-white text-4xl md:text-6xl leading-tight px-8 pt-40 whitespace-pre-line">
                {title}
            </h1>

            {/* нижний блок: слайдер + статистика */}
            <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8 px-8 pb-16 mt-20">
                <div className="flex gap-6 max-w-xl">
                    <div className="flex flex-col gap-3 shrink-0">
                        <button
                            onClick={prevSlide}
                            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            aria-label="Предыдущий слайд"
                        >
                            <Icon name="arrow-left" className="w-4 h-4"/>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            aria-label="Следующий слайд"
                        >
                            <Icon name="arrow-right" className="w-4 h-4"/>
                        </button>
                    </div>

                    <HeroSlideContent slide={slides[activeSlide]}/>
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

            {/* бегущая лента брендов */}
            <div className="relative z-10 border-t border-white/10">
                <BrandsMarquee brands={brands}/>
            </div>
        </section>
    );
}