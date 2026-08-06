// components/sections/ReviewsSection.js
"use client";

import {useState, useMemo} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import ShimmerText from "@/components/ui/ShimmerText";
import {mockBranches} from "@/lib/mock-data";

export default function Reviews({section}) {
    const {mark, title, titleBack, summary, platforms, items, cta} = section;

    const availableBranches = mockBranches.filter((b) =>
        items.some((r) => r.branch === b.id)
    );

    const [activeBranch, setActiveBranch] = useState(availableBranches[0]?.id);
    const [activePlatform, setActivePlatform] = useState(platforms[0]?.id);

    const filtered = useMemo(
        () =>
            items.filter(
                (r) => r.branch === activeBranch && r.platform === activePlatform
            ),
        [items, activeBranch, activePlatform]
    );

    return (
        <section className="relative py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div className="text-left">
                        <p className="flex items-center gap-1.5 text-lg font-sans text-foreground mb-4">
                            <Icon name="star" className="text-primary-light size-3"/>
                            {mark}
                        </p>
                        <div className="relative">
                            <h2 className="font-heading tracking-tight text-[40px] md:text-[54px] text-foreground leading-tight whitespace-pre-line">
                                {title}
                            </h2>
                            <ShimmerText
                                as="h3"
                                className="absolute left-0 z-[-1] bottom-0 whitespace-nowrap text-[90px] md:text-[120px] leading-none font-bold font-heading tracking-tight"
                            >
                                {titleBack}
                            </ShimmerText>
                        </div>
                    </div>

                    {summary && (
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex -space-x-2">
                                {summary.platforms.map((icon) => (
                                    <span
                                        key={icon}
                                        className="size-9 rounded-full bg-background flex items-center justify-center ring-2 ring-background"
                                    >
                                        <Icon name={icon} className="size-5"/>
                                    </span>
                                ))}
                            </div>
                            <div className="leading-tight">
                                <p className="text-2xl font-bold text-foreground">{summary.count}</p>
                                <p className="text-sm text-foreground-light">{summary.countLabel}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                        {availableBranches.map((branch) => (
                            <button
                                key={branch.id}
                                onClick={() => setActiveBranch(branch.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                                    activeBranch === branch.id
                                        ? "bg-primary text-white"
                                        : "bg-white/5 text-foreground-light hover:text-foreground"
                                }`}
                            >
                                {branch.shortName}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        {platforms.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => setActivePlatform(platform.id)}
                                className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${
                                    activePlatform === platform.id
                                        ? "text-foreground"
                                        : "text-foreground-light hover:text-foreground"
                                }`}
                            >
                                {platform.label}
                                {activePlatform === platform.id && (
                                    <motion.span
                                        layoutId="platform-underline"
                                        className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                                className="rounded-2xl border border-primary/30 bg-white/[0.02] p-5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative size-9 rounded-full overflow-hidden bg-white/10">
                                            <Image src={review.avatar} alt={review.author} fill
                                                   className="object-cover"/>
                                        </div>
                                        <span
                                            className="text-sm font-medium text-foreground leading-tight max-w-[120px]">
                                            {review.author}
                                        </span>
                                    </div>
                                    <span
                                        className="flex items-center gap-1 text-xs font-medium bg-white/5 rounded-full px-2 py-1 text-foreground">
                                        {review.rating}
                                        <Icon name="star-filled" className="size-3 text-yellow-400"/>
                                    </span>
                                </div>
                                <p className="text-sm text-foreground-light leading-6 line-clamp-4">
                                    {review.text}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <p className="text-center text-foreground-light py-12">
                        Пока нет отзывов по этому фильтру
                    </p>
                )}

                {cta && (
                    <div className="flex justify-center mt-10">

                        <a href={cta.link}
                           className="px-6 py-3 rounded-full border border-white/15 text-sm font-medium text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            {cta.label}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}