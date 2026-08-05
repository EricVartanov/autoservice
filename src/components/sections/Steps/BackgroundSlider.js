// components/BackgroundSlider.jsx
"use client";

import {useState, useEffect, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Icon from "@/components/icons/Icon";

export default function BackgroundSlider({
                                             images = [],
                                             interval = 4000,
                                             showArrows = true,
                                             children,
                                             className = "",
                                         }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((p) => (p + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrent((p) => (p - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (paused || images.length <= 1) return;
        const t = setInterval(next, interval);
        return () => clearInterval(t);
    }, [paused, next, interval, images.length]);

    if (!images.length) return null;

    return (
        <div
            className={`overflow-hidden ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Background slides */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${images[current].image})`}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 1, ease: "easeInOut"}}
                />
            </AnimatePresence>

            {/* Content slot */}
            <div className="relative z-10">{children}</div>

            {/* Arrows */}
            {showArrows && images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Предыдущий слайд"
                    >
                        <Icon name={"arrow-left"} className="w-8 h-8"/>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Следующий слайд"
                    >
                        <Icon name={"arrow-right"} className="w-8 h-8"/>
                    </button>
                </>
            )}
        </div>
    );
}