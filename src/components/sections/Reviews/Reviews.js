// components/sections/ReviewsSection.js
"use client";

import {useState, useMemo} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import {mockBranches} from "@/lib/mock-data";
import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import BlurredCircle from "@/components/ui/blurredCircle";

const VISIBLE_COUNT = 4;

export default function Reviews({data}) {
    const {mark, title, titleBack, summary, platforms, items, cta} = data;

    const availableBranches = mockBranches.filter((b) =>
        items.some((r) => r.branchId === b.id)
    );

    const [activeBranch, setActiveBranch] = useState(availableBranches[0]?.id);
    const [activePlatform, setActivePlatform] = useState(platforms[0]?.id);
    const [showAll, setShowAll] = useState(false);

    const handleBranchChange = (id) => {
        setActiveBranch(id);
        setShowAll(false);
    };

    const handlePlatformChange = (id) => {
        setActivePlatform(id);
        setShowAll(false);
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
        <section className="relative py-24 md:py-32 overflow-hidden">
            <BlurredCircle className={'right-[-15%] top-[25%]  transform'}/>
            <Container>
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <SectionTitle title={title} titleBack={titleBack} mark={mark} variant={'left'}
                                  titleBackPosition={'left-full'}/>

                    {summary && (
                        <div className="flex items-center gap-5 shrink-0">
                            <div className="flex -space-x-3">
                                {summary.platforms.map((platform) => (
                                    <span
                                        key={platform.id}
                                        className="size-13.75 border-[3px] border-platforms-border overflow-hidden rounded-full bg-foreground-fixed flex items-center justify-center shadow-[-3px_4px_20px_0_rgba(0,0,0,0.25)]"
                                    >
                                        <Image src={platform.logo} alt={platform.alt} width={55} height={55}/>
                                    </span>
                                ))}
                            </div>
                            <div className="leading-none">
                                <p className="text-[28px] lg:text-[34px] font-bold text-transparent-btn-text font-heading">{summary.count}</p>
                                <p className="text-base text-foreground font-helvetica">{summary.countLabel}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="mt-[70] flex bg-white-grey flex-col rounded-3xl lg:rounded-full shadow-[0px_4px_20px_0_rgba(0,0,0,0.15)] md:flex-row md:items-center md:justify-between gap-4 px-5 lg:px-10 py-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                        {availableBranches.map((branch) => (
                            <button
                                key={branch.id}
                                onClick={() => handleBranchChange(branch.id)}
                                className={`px-4 py-2 rounded-full text-base font-helvetica cursor-pointer ${
                                    activeBranch === branch.id
                                        ? "bg-primary text-foreground-fixed"
                                        : "border-b-white/20 border-b"
                                }`}
                            >
                                {branch.shortName}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        {platforms.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => handlePlatformChange(platform.id)}
                                className={`relative text-base font-helvetica cursor-pointer text-foreground`}
                            >
                                {platform.label}
                                <span
                                    className={`absolute left-0 right-0 -bottom-2.5 ${activePlatform === platform.id ? 'bg-primary h-0.5' : 'bg-grey-white h-px'}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4 xl:gap-7">
                    <AnimatePresence>
                        {visible.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                                className="rounded-[30] min-h-80 font-helvetica border border-primary text-foreground-fixed bg-[#111111] p-5"
                            >
                                <div className="flex items-center gap-2.5 justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative size-10 rounded-full overflow-hidden ">
                                            <Image src={review.avatar} alt={review.author} fill
                                                   className="object-cover"/>
                                        </div>
                                        <span
                                            className="text-base font-medium leading-tight">
                                            {review.author}
                                        </span>
                                    </div>
                                    <span
                                        className="flex items-center text-base bg-white/10 rounded-full px-2.5 py-1">
                                        {review.rating}
                                        <Icon name="star-filled" className="size-6 text-[#FFAE00]"/>
                                    </span>
                                </div>
                                <p className="mt-5 text-base leading-6 line-clamp-11">
                                    {review.text}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {matched.length === 0 && (
                    <p className="text-center text-foreground-light py-12">
                        Пока нет отзывов по этому фильтру
                    </p>
                )}

                {hasMore && (
                    <div className="flex justify-center mt-10">
                        <Button
                            variant={'transparent'}
                            onClick={() => setShowAll((v) => !v)}
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