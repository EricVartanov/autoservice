// components/ProcessSection.jsx
'use client';

import {motion, AnimatePresence} from "framer-motion";
import Slider from "@/components/ui/Slider";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";

function StepList({steps, className = ''}) {
    return (
        <div className={className}>
            {steps.map((step) => (
                <div key={step.number}>
                    <div className={'relative inline-block'}>
                        <span className={'text-sm font-helvetica text-foreground-fixed'}>
                            {step.number}
                        </span>
                        <Icon
                            name={'number-bg'}
                            className={'z-[-1] absolute top-1/2 left-1/2 transform -translate-1/2 text-primary w-9 h-5'}
                        />
                    </div>
                    <h4 className={'font-sans text-lg max-md:text-base text-foreground-fixed mt-4'}>
                        {step.title}
                    </h4>
                    <p className={'font-sans text-sm text-foreground-light-fixed mt-2.5'}>
                        {step.text}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function Steps({data}) {
    const {title, mark, steps, images} = data

    if (!images?.length) return null;

    return (
        <section className={'relative'}>
            {/* Mobile: steps on black, image slider below */}
            <div className="bg-black md:hidden">
                <Container className="relative py-14">
                    <SectionTitle
                        title={title}
                        mark={mark}
                        variant={'left'}
                        titleColor={'text-foreground-fixed'}
                    />
                    <StepList
                        steps={steps}
                        className="mt-10 flex flex-col gap-8"
                    />
                </Container>

                <Slider
                    count={images.length}
                    autoplay
                    interval={4000}
                    pauseOnHover
                    arrowsPlacement="bottom"
                    showArrows
                    className="px-5 pb-10"
                >
                    {({index}) => (
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{backgroundImage: `url(${images[index].image})`}}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.6, ease: "easeInOut"}}
                                />
                            </AnimatePresence>
                            <div className="pointer-events-none absolute inset-0 bg-black/20" />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(127deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(190,0,0,1)_100%)]"/>
                        </div>
                    )}
                </Slider>
            </div>

            {/* Tablet + desktop: full-bleed background slider */}
            <div className="hidden md:block">
                <Slider
                    count={images.length}
                    autoplay
                    interval={4000}
                    pauseOnHover
                    arrowsPlacement="sides"
                    showArrows
                >
                    {({index}) => (
                        <>
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{backgroundImage: `url(${images[index].image})`}}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 1, ease: "easeInOut"}}
                                />
                            </AnimatePresence>

                            <div className="relative z-10">
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute inset-0 transform bg-[linear-gradient(127deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(190,0,0,1)_100%)]"/>

                                <Container className="relative py-[150] max-lg:py-20">
                                    <div className={'flex flex-col justify-start w-[47%] ml-auto max-lg:ml-0 max-lg:w-full'}>
                                        <SectionTitle
                                            title={title}
                                            mark={mark}
                                            variant={'left'}
                                            titleColor={'text-foreground-fixed'}
                                        />
                                        <StepList
                                            steps={steps}
                                            className="mt-[50] flex flex-wrap gap-x-[50] gap-y-[30] max-lg:gap-x-6 max-lg:gap-y-6 [&>div]:max-w-[calc(50%-30px)] max-lg:[&>div]:max-w-[calc(50%-12px)]"
                                        />
                                    </div>
                                </Container>
                            </div>
                        </>
                    )}
                </Slider>
            </div>
        </section>
    );
}
