'use client';

import {useMemo, useState} from 'react';
import {Container} from '@/components/Container';
import WaveTitle from '@/components/ui/WaveTitle';
import {NEWS_PAGE_SIZE, newsPage} from '@/lib/mock-data';
import NewsCard from './NewsCard';
import NewsPagination from './NewsPagination';

function getYear(iso) {
    return Number(iso.slice(0, 4));
}

export default function NewsSection({items = []}) {
    const years = useMemo(
        () =>
            [...new Set(items.map((n) => getYear(n.date)))].sort((a, b) => a - b),
        [items],
    );

    const [year, setYear] = useState(() => years.at(-1) ?? new Date().getFullYear());
    const [page, setPage] = useState(1);

    const filtered = useMemo(
        () =>
            items
                .filter((n) => getYear(n.date) === year)
                .sort((a, b) => b.date.localeCompare(a.date)),
        [items, year],
    );

    const pageCount = Math.max(1, Math.ceil(filtered.length / NEWS_PAGE_SIZE));
    const safePage = Math.min(page, pageCount);
    const visible = filtered.slice(
        (safePage - 1) * NEWS_PAGE_SIZE,
        safePage * NEWS_PAGE_SIZE,
    );

    const handleYear = (y) => {
        setYear(y);
        setPage(1);
    };

    const handlePage = (p) => {
        setPage(p);
        document.getElementById('news')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    return (
        <section id="news" className="scroll-mt-28 py-12 md:py-20 lg:pt-[120] pb-[80]">
            <Container>
                <WaveTitle as="h1" className="text-center font-heading font-medium text-3xl tracking-tight md:text-5xl lg:text-[54px]">
                    {newsPage.title}
                </WaveTitle>

                {years.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-[30] md:gap-[30]">
                        {years.map((y) => (
                            <button
                                key={y}
                                type="button"
                                onClick={() => handleYear(y)}
                                className={`min-w-[72] cursor-pointer leading-none bg-[#f1f1f1] rounded-full px-6 py-3 font-heading text-sm md:min-w-[88] md:text-lg lg:text-[22] ${
                                    y === year
                                        ? 'bg-primary-light text-foreground-fixed'
                                        : 'text-black hover:text-foreground'
                                }`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-12 md:mt-[35] md:gap-10">
                    {visible.length === 0 ? (
                        <p className="text-center text-foreground-light">
                            {newsPage.empty.replace('{year}', String(year))}
                        </p>
                    ) : (
                        visible.map((item) => <NewsCard key={item.id} item={item} />)
                    )}
                </div>

                <NewsPagination
                    page={safePage}
                    pageCount={pageCount}
                    onChange={handlePage}
                />
            </Container>
        </section>
    );
}
