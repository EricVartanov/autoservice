'use client';

import Image from "next/image";
import Button from "@/components/ui/Button";
import {useModalStore} from "../../../../public/store/useModalStore";

export default function ServiceCard({service}) {
    const openModal = useModalStore((s) => s.openModal);

    const openService = () => openModal('service', {slug: service.slug});

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={openService}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openService();
                }
            }}
            className={`cursor-pointer group overflow-hidden relative rounded-[30] w-full min-h-[200] md:min-h-[300] lg:min-h-[330] flex flex-col justify-end p-7 md:pb-11 lg:p-7`}
        >
            <Image
                src={service.image}
                alt={service.title}
                width={356}
                height={330}
                className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
            />
            <div
                className={`absolute transition inset-0 bg-[radial-gradient(76.76%_77.83%_at_70.8%_26.11%,rgba(0,0,0,0)_0%,#000_100%)] group-hover:bg-[radial-gradient(76.76%_77.83%_at_70.8%_26.11%,rgba(0,0,0,0)_0%,#be0000_100%)]`}
            />

            <div className={'flex h-full z-10 flex-col justify-end items-center'}>
                <h3 className="text-foreground-fixed font-bold font-heading text-lg md:text-[22px] leading-none md:max-w-4/5 text-center whitespace-pre-line">
                    {service.title}
                </h3>
                <p className="mt-2.5 lg:mt-5 text-foreground-fixed text-sm md:text-lg">{service.price}</p>
                <Button
                    variant={'serviceCard'}
                    onClick={(e) => {
                        e.stopPropagation();
                        openService();
                    }}
                    className={'mt-5 md:mt-[30] lg:mt-12 bg-primary transition text-foreground-fixed group-hover:bg-foreground-fixed group-hover:text-primary'}
                >
                    Подробнее
                </Button>
            </div>
        </div>
    );
}
