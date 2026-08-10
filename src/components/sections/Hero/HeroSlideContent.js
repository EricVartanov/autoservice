// src/components/sections/hero/HeroSlideContent.js
'use client';

import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    enter: (direction) => ({
        opacity: 0,
        x: direction * 20,
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction * -20,
    }),
};

export default function HeroSlideContent({ slide, activeIndex, direction = 1 }) {
    return (
        <div className="relative min-h-[300px] max-md:min-h-0 w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                   <div className={'flex flex-col items-start justify-between gap-6 max-md:gap-4'}>
                       <h3 className="font-heading font-bold text-foreground-fixed text-4xl max-md:text-[22px] whitespace-pre-line">
                           {slide.title}
                       </h3>
                       <span className={'w-[50] block border-b-foreground-fixed border h-[1]'}></span>
                       <p className="text-foreground-fixed font-helvetica text-lg max-md:text-base leading-5">{slide.text}</p>
                   </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
