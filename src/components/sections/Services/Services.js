'use client'

import ShimmerText from "@/components/ui/ShimmerText";
import {useState} from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/sections/Services/ServiceCard";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";

const INITIAL_COUNT = 8;
const LOAD_STEP = 4;
export default function Services({data}) {
    const {services, title, titleBack, mark} = data

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const visibleServices = services.slice(0, visibleCount);
    const hasMore = visibleCount < services.length;

    return (
        <section className="relative py-24 px-6 md:px-10 overflow-hidden">
            <Container className={'relative'}>
               <SectionTitle titleBack={titleBack} title={title} mark={mark} variant={'left'}/>

                {/* сетка услуг */}
                <div className="mt-[84] flex flex-wrap gap-[30] justify-start">
                    {visibleServices.map((service) => (
                        <ServiceCard key={service.slug} service={service}/>
                    ))}
                </div>

                {/* показать еще */}
                {hasMore && (
                    <div className="mt-20 flex justify-center">
                        <Button
                            variant={'transparent'}
                            onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
                            className={'text-transparent-btn-text px-12 hover:bg-foreground-fixed hover:text-black'}
                        >
                            Показать еще
                        </Button>
                    </div>
                )}
                <div className="absolute z-[-1] w-[134] bottom-[5%] right-0 hidden md:block">
                    <Icon name={'dots'} className={'text-primary-light w-[134]'} />
                </div>
            </Container>
        </section>
    );
}