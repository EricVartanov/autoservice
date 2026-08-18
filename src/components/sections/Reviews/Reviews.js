// components/sections/ReviewsSection.js
"use client";

import {useState, useMemo, useRef} from "react";
import {motion, AnimatePresence, useReducedMotion} from "framer-motion";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import {mockBranches} from "@/lib/mock-data";
import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import BlurredCircle from "@/components/ui/blurredCircle";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {scrollToElement} from "@/lib/scrollToSection";
import {mediaAlt, mediaUrl} from "@/lib/media";

const VISIBLE_COUNT = 4;

export default function Reviews({data}) {
    const {mark, title, titleBack, summary, platforms, items, cta} = data;

    const availableBranches = mockBranches.filter((b) =>
        items.some((r) => r.branchId === b.id)
    );

    const [activeBranch, setActiveBranch] = useState(availableBranches[0]?.id);
    const [activePlatform, setActivePlatform] = useState(platforms[0]?.id);
    const [showAll, setShowAll] = useState(false);
    const isMobileOrTablet = useMediaQuery('(max-width: 1279px)');
    const reduceMotion = useReducedMotion();
    const gridRef = useRef(null);

    const scrollToGrid = () => {
        requestAnimationFrame(() => scrollToElement(gridRef.current));
    };

    const handleBranchChange = (id) => {
        if (showAll) scrollToGrid();
        setActiveBranch(id);
        setShowAll(false);
    };

    const handlePlatformChange = (id) => {
        if (showAll) scrollToGrid();
        setActivePlatform(id);
        setShowAll(false);
    };

    const toggleShowAll = () => {
        setShowAll((v) => {
            if (v) scrollToGrid();
            return !v;
        });
    };

    const matched = useMemo(
        () =>
            items.filter(
                (r) => r.branchId === activeBranch && r.platform === activePlatform
            ),
        [items, activeBranch, activePlatform]
    );

    const visible = showAll ? matched : matched.slice(0, VISIBLE_COUNT);
    const hasMore = matched.length > VISIBLE_COUNT;

    return (
        <section className="relative py-14 md:py-[150] overflow-hidden">
            <BlurredCircle className={'right-[-15%] top-[10%] md:top-[25%]'}/>
            <Container>
                <div className="flex flex-col gap-6 md:gap-12 lg:flex-row items-center lg:justify-between lg:gap-8">
                    <SectionTitle title={title} titleBack={titleBack} mark={mark} variant={isMobileOrTablet ? 'center' : 'left'}
                                  titleBackPosition={isMobileOrTablet ? '' : 'left-full'}/>

                    {summary && (
                        <div className="flex items-center gap-3.5 md:gap-5 shrink-0">
                            <div className="flex -space-x-3">
                                {summary.platforms.map((platform) => (
                                    <span
                                        key={platform.id}
                                        className="size-[10vw] md:size-13.75 border-[3px] border-platforms-border overflow-hidden rounded-full bg-foreground-fixed flex items-center justify-center shadow-[-3px_4px_20px_0_rgba(0,0,0,0.25)]"
                                    >
                                        <Image src={mediaUrl(platform.logo)} alt={mediaAlt(platform.logo, platform.alt)} width={55} height={55}/>
                                    </span>
                                ))}
                            </div>
                            <div className="leading-none">
                                <p className="text-[22px] md:text-[34px] font-bold text-transparent-btn-text font-heading">{summary.count}</p>
                                <p className="text-sm md:text-base text-foreground font-helvetica">{summary.countLabel}</p>
                            </div>
                        </div>
                    )}
                </div>

                <ScrollReveal>
                    <div
                        className="mt-10 lg:mt-[70] flex bg-white-grey flex-col flex-wrap justify-center rounded-3xl lg:rounded-full shadow-[0px_4px_20px_0_rgba(0,0,0,0.15)] md:flex-row md:items-center lg:justify-between gap-5 md:gap-7 lg:gap-4 pt-2.5 pb-5 px-6 md:px-5 lg:px-10 md:py-7 lg:py-3.5">
                        <div className="flex justify-center flex-wrap items-center gap-2">
                            {availableBranches.map((branch) => (
                                <button
                                    key={branch.id}
                                    onClick={() => handleBranchChange(branch.id)}
                                    className={`px-5 min-w-[190] lg:px-4 py-2 rounded-full text-sm md:text-base font-helvetica cursor-pointer ${
                                        activeBranch === branch.id
                                            ? "bg-primary text-foreground-fixed"
                                            : "border-b-white/20 border-b"
                                    }`}
                                >
                                    {branch.shortName}
                                </button>
                            ))}
                        </div>

                        <div className="flex md:flex-wrap justify-center items-center gap-7 lg:gap-6">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.id}
                                    onClick={() => handlePlatformChange(platform.id)}
                                    className={`relative text-sm md:text-base font-helvetica cursor-pointer text-foreground w-[33%] max-w-[80] md:w-auto md:max-w-none`}
                                >
                                    {platform.label}
                                    <span
                                        className={`absolute left-0 right-0 -bottom-2.5 ${activePlatform === platform.id ? 'bg-primary h-0.5' : 'bg-grey-white h-px'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div ref={gridRef} className="relative mt-2.5 lg:mt-12 min-h-44 lg:min-h-80">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5 lg:gap-4 xl:gap-7">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {visible.map((review, i) => (
                                    <motion.div
                                        key={review.id}
                                        initial={reduceMotion ? {opacity: 0} : {x: '-100vw', opacity: 0}}
                                        animate={
                                            reduceMotion
                                                ? {opacity: 1, transition: {duration: 0.2}}
                                                : {
                                                    x: 0,
                                                    opacity: 1,
                                                    transition: {duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06},
                                                }
                                        }
                                        exit={
                                            reduceMotion
                                                ? {opacity: 0, transition: {duration: 0.15}}
                                                : {
                                                    x: '100vw',
                                                    opacity: 0,
                                                    transition: {duration: 0.35, ease: [0.4, 0, 1, 1]},
                                                }
                                        }
                                        className="rounded-[30] min-h-44 lg:min-h-80 font-helvetica border border-primary text-foreground-fixed bg-[#111111] p-4 md:p-5"
                                    >
                                        <div className="flex items-center gap-2.5 justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className="relative shrink-0 size-10 rounded-full overflow-hidden ">
                                                    <Image
                                                        src={mediaUrl(review.avatar)}
                                                        alt={review.author}
                                                        width={40}
                                                        height={40}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <span
                                                    className="text-sm md:text-base font-medium leading-tight">
                                                    {review.author}
                                                </span>
                                            </div>
                                            <span
                                                className="flex items-center text-sm md:text-base bg-white/10 rounded-full px-2.5 py-1">
                                                {review.rating}
                                                <Icon name="star-filled" className="size-5 md:size-6 text-[#FFAE00]"/>
                                            </span>
                                        </div>
                                        <p className="mt-3 md:mt-5 text-sm md:text-base leading-tight md:leading-6 line-clamp-11">
                                            {review.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {matched.length === 0 && (
                            <p className="absolute inset-0 flex items-center justify-center text-center text-foreground-light">
                                Пока нет отзывов по этому фильтру
                            </p>
                        )}
                    </div>
                </ScrollReveal>

                {hasMore && (
                    <div className="flex justify-center mt-12 lg:mt-10">
                        <Button
                            variant={'transparent'}
                            onClick={toggleShowAll}
                            className={'text-transparent-btn-text px-12 hover:bg-foreground-fixed hover:text-black'}
                        >
                            {showAll ? "Свернуть" : (cta?.label ?? "Смотреть все")}
                        </Button>
                    </div>
                )}
            </Container>
        </section>
    );
}
