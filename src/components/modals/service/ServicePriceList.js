'use client';

import {useState} from 'react';
import Button from '@/components/ui/Button';

const MOBILE_INITIAL_COUNT = 10;

export default function ServicePriceList({title, items, subtitle}) {
    const [expanded, setExpanded] = useState(false);
    const hasMore = items.length > MOBILE_INITIAL_COUNT;

    return (
        <section className="px-2.5 md:px-[30] lg:px-10">
            <h3 className="text-center md:text-left font-heading font-medium text-[25px] md:text-[28px] lg:text-[34px] leading-none text-foreground">
                {title}
            </h3>
            <p className={'text-center md:text-left mt-4 text-foreground-light text-sm md:text-lg leading-none'}>
                {subtitle}
            </p>
            <ul className="mt-[30] md:mt-8">
                {items.map((item, index) => (
                    <li
                        key={item.title}
                        className={`mb-2.5 flex gap-5 md:flex-row items-center justify-between px-2.5 py-[15] md:px-[30] md:py-[21] lg:px-[35] rounded-[10] md:rounded-full bg-foreground-fixed ${
                            !expanded && index >= MOBILE_INITIAL_COUNT ? 'max-md:hidden' : ''
                        }`}
                    >
                        <span className="font-helvetica leading-none font-medium text-sm text-left md:text-lg lg:text-[22px] text-black">
                            {item.title}
                        </span>
                        <span className="font-heading text-sm md:text-lg lg:text-[22px] font-bold text-black shrink-0">
                            {item.price}
                        </span>
                    </li>
                ))}
            </ul>
            {hasMore && !expanded && (
                <div className="mt-5 flex justify-center md:hidden">
                    <Button
                        variant="transparent"
                        onClick={() => setExpanded(true)}
                        className="text-transparent-btn-text px-8 hover:bg-foreground-fixed hover:text-black"
                    >
                        Показать еще
                    </Button>
                </div>
            )}
        </section>
    );
}
