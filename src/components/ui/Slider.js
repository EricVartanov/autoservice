'use client';

import {useState, useEffect, useCallback} from 'react';
import {motion} from 'framer-motion';
import Icon from '@/components/icons/Icon';

const arrowBtnClass =
    'w-9 h-9 text-foreground-fixed hover:opacity-60 cursor-pointer';

const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 300;

export default function Slider({
    count,
    autoplay = false,
    interval = 4000,
    pauseOnHover = false,
    showArrows = true,
    arrowsPlacement = 'stack',
    swipeable = false,
    className = '',
    children,
}) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % count);
    }, [count]);

    const prev = useCallback(() => {
        setDirection(-1);
        setIndex((i) => (i - 1 + count) % count);
    }, [count]);

    useEffect(() => {
        if (!autoplay || paused || count <= 1) return;
        const t = setInterval(next, interval);
        return () => clearInterval(t);
    }, [autoplay, paused, next, interval, count]);

    const handleDragEnd = useCallback(
        (_event, info) => {
            const {offset, velocity} = info;
            if (Math.abs(offset.y) > Math.abs(offset.x)) return;
            if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
                next();
            } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
                prev();
            }
        },
        [next, prev],
    );

    if (count <= 0) return null;

    const hoverProps =
        pauseOnHover
            ? {
                  onMouseEnter: () => setPaused(true),
                  onMouseLeave: () => setPaused(false),
              }
            : {};

    const arrowsVisible = showArrows && count > 1;

    const content =
        typeof children === 'function'
            ? children({index, direction})
            : children;

    return (
        <div className={`relative overflow-hidden ${className}`} {...hoverProps}>
            {swipeable && count > 1 ? (
                <motion.div
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                >
                    {content}
                </motion.div>
            ) : (
                content
            )}

            {arrowsVisible && arrowsPlacement === 'stack' && (
                <div className="absolute z-10 top-0 right-0 flex gap-3.5 shrink-0">
                    <button
                        onClick={prev}
                        className={arrowBtnClass}
                        aria-label="Предыдущий слайд"
                    >
                        <Icon name="arrow-left" className="w-8 h-8" />
                    </button>
                    <button
                        onClick={next}
                        className={arrowBtnClass}
                        aria-label="Следующий слайд"
                    >
                        <Icon name="arrow-right" className="w-8 h-8" />
                    </button>
                </div>
            )}

            {arrowsVisible && arrowsPlacement === 'sides' && (
                <>
                    <button
                        onClick={prev}
                        className={`absolute left-[8%] top-1/2 z-20 -translate-y-1/2 ${arrowBtnClass}`}
                        aria-label="Предыдущий слайд"
                    >
                        <Icon name="arrow-left" className="w-8 h-8" />
                    </button>
                    <button
                        onClick={next}
                        className={`absolute right-[52%] top-1/2 z-20 -translate-y-1/2 ${arrowBtnClass}`}
                        aria-label="Следующий слайд"
                    >
                        <Icon name="arrow-right" className="w-8 h-8" />
                    </button>
                </>
            )}

            {arrowsVisible && arrowsPlacement === 'bottom' && (
                <div className="relative z-10 mt-4 flex items-center justify-center gap-10">
                    <button
                        onClick={prev}
                        className={arrowBtnClass}
                        aria-label="Предыдущий слайд"
                    >
                        <Icon name="arrow-left" className="w-8 h-8" />
                    </button>
                    <button
                        onClick={next}
                        className={arrowBtnClass}
                        aria-label="Следующий слайд"
                    >
                        <Icon name="arrow-right" className="w-8 h-8" />
                    </button>
                </div>
            )}
        </div>
    );
}
