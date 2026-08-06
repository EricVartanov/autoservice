// components/sections/TeamSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";

export default function Team({data}) {
    const {title, mark, titleBack, highlightHtml, subtitle, image} = data

    return (
        <section className="relative py-24 md:py-[150]">
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
                    className={'mt-[90] relative'}
                >
                    <div className="flex items-end justify-center">
                        <Image src={image.path} alt={image.alt} width={1527} height={479} className={'w-full h-auto'} />
                    </div>
                    <div className="absolute z-[-1] w-[134] top-0 left-1/3 hidden md:block">
                        <Icon name={'dots'} className={'text-primary-light w-[134]'} />
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}