'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {animate, motion, useMotionValue} from 'framer-motion';
import {useModalStore} from '../../../../public/store/useModalStore';
import OfferCard from './OfferCard';
import {useMediaQuery} from '@/hooks/useMediaQuery';

const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 300;
const AUTOPLAY_MS = 5000;
const GAP = 30;
const SPRING = {type: 'spring', stiffness: 220, damping: 36};

export default function OffersSwiper({offers = []}) {
    const count = offers.length;
    const canSlide = count >= 2;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [width, setWidth] = useState(0);
    const viewportRef = useRef(null);
    const x = useMotionValue(0);
    const openModal = useModalStore((s) => s.openModal);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const slideRatio = isMobile ? 0.92 : 0.82;

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const update = () => setWidth(el.clientWidth);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const next = useCallback(() => {
        if (!canSlide) return;
        setIndex((i) => (i + 1) % count);
    }, [canSlide, count]);

    const prev = useCallback(() => {
        if (!canSlide) return;
        setIndex((i) => (i - 1 + count) % count);
    }, [canSlide, count]);

    const slideWidth = width * slideRatio;
    const sidePad = (width - slideWidth) / 2;
    const trackX = width > 0 ? sidePad - index * (slideWidth + GAP) : 0;

    useEffect(() => {
        if (dragging || width <= 0) return;
        const controls = animate(x, trackX, SPRING);
        return () => controls.stop();
    }, [trackX, dragging, width, x]);

    useEffect(() => {
        if (!canSlide || paused || dragging) return;
        const t = setInterval(next, AUTOPLAY_MS);
        return () => clearInterval(t);
    }, [paused, dragging, next, canSlide]);

    const handleDragStart = useCallback(() => {
        setDragging(true);
    }, []);

    const handleDragEnd = useCallback(
        (_event, info) => {
            const {offset, velocity} = info;
            if (Math.abs(offset.y) <= Math.abs(offset.x)) {
                if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
                    next();
                } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
                    prev();
                } else {
                    animate(x, trackX, SPRING);
                }
            } else {
                animate(x, trackX, SPRING);
            }
            setDragging(false);
        },
        [next, prev, x, trackX],
    );

    if (count === 0) return null;

    return (
        <section
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="pt-22 md:pt-32"
        >
            <div ref={viewportRef} className="relative isolate overflow-hidden">
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing will-change-transform"
                    style={{x, gap: GAP}}
                    drag={canSlide ? 'x' : false}
                    dragConstraints={{
                        left: trackX - slideWidth,
                        right: trackX + slideWidth,
                    }}
                    dragElastic={0.12}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {offers.map((offer, i) => (
                        <div
                            key={offer.id}
                            className="shrink-0"
                            style={{width: slideWidth || `${slideRatio * 100}%`}}
                        >
                            <OfferCard
                                offer={offer}
                                active={i === index}
                                onCta={() => openModal('call')}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
