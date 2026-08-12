import {mockOffers, mockNews} from '@/lib/mock-data';
import OffersSwiper from '@/components/sections/News/OffersSwiper';
import NewsSection from '@/components/sections/News/NewsSection';

export const metadata = {
    title: 'Новости — Авторитет',
    description: 'Новости автосервиса Авторитет',
};

export default function NewsPage() {
    return (
        <main>
            <OffersSwiper offers={mockOffers} />
            <NewsSection items={mockNews} />
        </main>
    );
}
