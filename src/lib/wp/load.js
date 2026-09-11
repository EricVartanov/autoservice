import {cache} from 'react';
import {
    forms,
    getLegalDoc,
    mockBranches,
    mockNews,
    mockOffers,
    mockPage,
    mockServiceDetails,
    newsPage,
    site,
} from '@/content';
import {brands} from '@/content/brands';
import {wpRequest} from '@/lib/wp/client';
import {mapWpPayload} from '@/lib/wp/mappers';
import {SITE_QUERY} from '@/lib/wp/queries';

function mockPayload() {
    return {
        source: 'mock',
        site,
        forms,
        branches: mockBranches,
        brands,
        sections: mockPage.sections,
        servicesBySlug: mockServiceDetails,
        news: mockNews,
        newsPage,
        offers: mockOffers,
        legalDocs: Object.fromEntries(
            ['privacy', 'personal-data'].map((slug) => [slug, getLegalDoc(slug)]).filter(([, doc]) => doc),
        ),
    };
}

export const loadSiteData = cache(async () => {
    if (!process.env.WORDPRESS_GRAPHQL_URL) {
        return mockPayload();
    }
    try {
        const raw = await wpRequest(SITE_QUERY);
        return mapWpPayload(raw);
    } catch (error) {
        console.error('[wp] falling back to mocks', error);
        return mockPayload();
    }
});
