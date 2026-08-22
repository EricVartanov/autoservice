import {mockOffers, mockNews, newsPage} from '@/lib/mock-data';
import OffersSwiper from '@/components/sections/News/OffersSwiper';
import NewsSection from '@/components/sections/News/NewsSection';

export const metadata = {
    title: newsPage.seoTitle,
    description: newsPage.seoDescription,
};

export default function NewsPage() {
    return (
        <main>
            <OffersSwiper offers={mockOffers} />
            <NewsSection items={mockNews} />
        </main>
    );
}
