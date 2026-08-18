'use client'

import {useState} from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/sections/Services/ServiceCard";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Parallax from "@/components/ui/Parallax";

const INITIAL_COUNT = 8;
const LOAD_STEP = 4;
export default function Services({data}) {
    const {services, title, titleBack, mark} = data

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const visibleServices = services.slice(0, visibleCount);
    const hasMore = visibleCount < services.length;

    const isMobileAndTablet = useMediaQuery('(max-width: 1279px)');


    return (
        <section className="relative pb-10 pt-20 md:py-[150] overflow-hidden">
            <Container className={'relative'}>
                <div className={'mb-10 md:mb-[84]'}>
                    <SectionTitle titleBack={titleBack} title={title} mark={mark}
                                  variant={`${isMobileAndTablet ? 'center' : 'left'}`}/>
                </div>

                {/* сетка услуг */}
                <ScrollReveal
                    stagger
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-2.5 md:gap-y-[15] lg:grid-cols-4 lg:gap-[30]"
                >
                    {visibleServices.map((service) => (
                        <ServiceCard key={service.slug} service={service}/>
                    ))}
                </ScrollReveal>

                {/* показать еще */}
                {hasMore && (
                    <div className="mt-10 md:mt-20 flex justify-center">
                        <Button
                            variant={'transparent'}
                            onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
                            className={'text-transparent-btn-text px-8 md:px-12 hover:bg-foreground-fixed hover:text-black'}
                        >
                            Показать еще
                        </Button>
                    </div>
                )}
                <Parallax className="absolute z-[-1] w-[134] bottom-[5%] right-0 hidden md:block">
                    <Icon name={'dots'} className={'text-primary-light w-[134]'}/>
                </Parallax>
            </Container>
        </section>
    );
}