// components/ProcessSection.jsx
'use client';

import {motion, AnimatePresence} from "framer-motion";
import Slider from "@/components/ui/Slider";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {mediaUrl} from "@/lib/media";

function StepList({steps, className = ''}) {
    return (
        <ScrollReveal stagger className={className}>
            {steps.map((step) => (
                <div key={step.number} className={'md:max-w-[calc(50%-25px)] lg:max-w-[calc(50%-30px)]'}>
                    <div className={'relative inline-block'}>
                        <span className={'text-sm font-helvetica text-foreground-fixed'}>
                            {step.number}
                        </span>
                        <Icon
                            name={'number-bg'}
                            className={'z-[-1] absolute top-1/2 left-1/2 transform -translate-1/2 text-primary w-9 h-5'}
                        />
                    </div>
                    <h4 className={'font-sans font-medium text-sm md:text-lg text-foreground-fixed mt-2 md:mt-4'}>
                        {step.title}
                    </h4>
                    <p className={'font-sans text-sm text-foreground-light-fixed mt-1.5 md:mt-2.5'}>
                        {step.text}
                    </p>
                </div>
            ))}
        </ScrollReveal>
    );
}

export default function Steps({data}) {
    const {title, mark, steps, images} = data

    if (!images?.length) return null;

    return (
        <section className="relative bg-black lg:bg-transparent">
            <Slider
                count={images.length}
                autoplay
                interval={4000}
                pauseOnHover
                arrowsPlacement="bottom-lg-sides"
                showArrows
                className="flex flex-col pb-10 lg:block lg:pb-0"
            >
                {({index}) => (
                    <>
                        <div className="relative z-10">
                            <div className="pointer-events-none absolute inset-0 hidden bg-black/40 lg:block"/>
                            <div
                                className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(127deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(190,0,0,1)_100%)] lg:block"/>

                            <Container className="relative py-12 md:py-20 lg:py-[150]">
                                <div className="flex w-full flex-col justify-start ml-0 lg:ml-auto lg:w-[47%]">
                                    <SectionTitle
                                        title={title}
                                        mark={mark}
                                        variant={'left'}
                                        titleColor={'text-foreground-fixed'}
                                    />
                                    <StepList
                                        steps={steps}
                                        className="mt-[30] flex flex-col gap-5 md:mt-[50] md:flex-row md:flex-wrap md:gap-x-[50] md:gap-y-9 lg:gap-y-[24]"
                                    />
                                </div>
                            </Container>
                        </div>

                        <div
                            className="relative aspect-video lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:rounded-none">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{backgroundImage: `url(${mediaUrl(images[index].image)})`}}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 1, ease: "easeInOut"}}
                                />
                            </AnimatePresence>
                            <div className="pointer-events-none absolute inset-0 bg-black/20 lg:hidden"/>
                            <div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(127deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(190,0,0,1)_100%)] lg:hidden"/>
                        </div>
                    </>
                )}
            </Slider>
        </section>
    );
}
