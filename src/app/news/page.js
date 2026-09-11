import {loadSiteData} from '@/lib/wp/load';
import OffersSwiper from '@/components/sections/News/OffersSwiper';
import NewsSection from '@/components/sections/News/NewsSection';

export async function generateMetadata() {
    const {newsPage} = await loadSiteData();
    return {
        title: newsPage.seoTitle,
        description: newsPage.seoDescription,
    };
}

export default async function NewsPage() {
    const {offers, news} = await loadSiteData();
    return (
        <main>
            <OffersSwiper offers={offers} />
            <NewsSection items={news} />
        </main>
    );
}
