"use client";

import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import BlurredCircle from "@/components/ui/blurredCircle";
import Icon from "@/components/icons/Icon";
import FaqItem from "@/components/sections/Faq/FaqItem";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Parallax from "@/components/ui/Parallax";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const VISIBLE_COUNT = 7;

export default function Faq({data}) {
    const {mark, title, items, cta, messengers} = data;

    const [showAll, setShowAll] = useState(false);
    const [openId, setOpenId] = useState(items[0]?.id ?? null);

    const primaryItems = items.slice(0, VISIBLE_COUNT);
    const extraItems = showAll ? items.slice(VISIBLE_COUNT) : [];
    const hasMore = items.length > VISIBLE_COUNT;

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const handleShowAllToggle = () => {
        setShowAll((prev) => {
            if (prev) {
                const openIsExtra = items
                    .slice(VISIBLE_COUNT)
                    .some((item) => item.id === openId);
                if (openIsExtra) setOpenId(null);
            }
            return !prev;
        });
    };

    const renderItem = (item, index) => (
        <FaqItem
            index={index}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
        />
    );

    const isMobile = useMediaQuery('(max-width: 767px)');


    return (
        <section className="py-20 md:py-[150] overflow-hidden">
            <Container className={'relative'}>
                <BlurredCircle className="left-1/2 top-1/2 -translate-1/2 transform opacity-40"/>
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-[50] lg:gap-20">
                    <div className="relative">
                        <SectionTitle
                            title={title}
                            mark={mark}
                            variant={isMobile ? 'center' : 'left'}
                        />

                        <div className="mt-7 lg:mt-12 flex flex-col md:flex-row  justify-center md:justify-start md:flex-wrap lg:flex-nowrap items-center gap-3 md:gap-7">
                            {messengers?.map((messenger) => (
                                <a
                                    key={messenger.name}
                                    href={messenger.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full flex gap-2.5 w-full min-w-0 max-w-[253] lg:min-w-[253] lg:flex-none justify-center items-center bg-primary px-4 lg:px-7 py-3 text-sm md:text-lg font-helvetica text-foreground-fixed transition hover:opacity-90"
                                >
                                    <Image src={messenger.logo} width={30} height={30} alt={messenger.alt} className={'size-[30] text-foreground-fixed'}/>
                                    {messenger.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <ScrollReveal>
                        <div>
                            {primaryItems.map((item, index) => (
                                <div key={item.id}>
                                    {renderItem(item, index)}
                                </div>
                            ))}

                            <AnimatePresence initial={false}>
                                {extraItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: "auto"}}
                                        exit={{opacity: 0, height: 0}}
                                        transition={{duration: 0.3, ease: "easeInOut"}}
                                        className="overflow-hidden"
                                    >
                                        {renderItem(item, VISIBLE_COUNT + index)}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {hasMore && (
                            <div className="text-center lg:text-left mt-[30] md:mt-[50] lg:mt-[80]">
                                <Button
                                    variant="transparent"
                                    onClick={handleShowAllToggle}
                                    className="text-transparent-btn-text min-h-10 px-12 hover:bg-foreground-fixed hover:text-black"
                                >
                                    {showAll ? "Свернуть" : (cta?.label ?? "Смотреть все")}
                                </Button>
                            </div>
                        )}
                    </ScrollReveal>
                </div>
                <Parallax className="absolute z-[-1] w-[70] md:w-[134] left-[-5%] bottom-[-5%] md:top-[80%] md:left-[-10%] lg:top-full lg:left-0 block">
                    <Icon name="dots" className="text-primary-light w-[70] md:w-[134]"/>
                </Parallax>
            </Container>
        </section>
    );
}
