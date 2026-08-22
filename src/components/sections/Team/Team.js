// components/sections/TeamSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";
import Parallax from "@/components/ui/Parallax";
import {mediaAlt, mediaUrl} from "@/lib/media";

export default function Team({data}) {
    const {title, mark, titleBack, highlightHtml, subtitle, image} = data

    return (
        <section className="relative py-14 md:py-24 lg:py-[150]">
            <Container>
                <SectionTitle
                    variant="center"
                    mark={mark}
                    title={title}
                    titleBack={titleBack}
                    highlightHtml={highlightHtml}
                    subtitle={subtitle}
                />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={'mt-5 md:mt-[65] lg:mt-[90] relative'}
                >
                    <div className="flex items-end justify-center rounded-[12] lg:rounded-[30] overflow-hidden">
                        <Image src={mediaUrl(image)} alt={mediaAlt(image)} width={1527} height={479} loading="eager" className={'w-full h-auto'} />
                    </div>
                    <Parallax className="absolute z-[-1] md:w-[70] lg:w-[134] top-[-20%] lg:top-0 left-1/3 hidden md:block">
                        <Icon name={'dots'} className={'text-primary-light w-full'} />
                    </Parallax>
                </motion.div>
            </Container>
        </section>
    );
}