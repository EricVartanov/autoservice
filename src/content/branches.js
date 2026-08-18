import {img} from '@/lib/media';

export const mockBranches = [
    {
        id: 1,
        slug: 'dorozhnaya',
        name: 'Филиал 1',
        title: '2-я Дорожная',
        shortName: 'ф-л 2-я Дорожная',
        formLabel: 'филиал на 2-ой Дорожной',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 2-я Дорожная, д. 39',
        phone: '+7 (861) 207-07-71',
        panoramaUrl: '#',
        mapUrl: '#',
        marker: {x: 52, y: 60},
        messenger: {
            url: 'http://max.ru',
            logo: img('/mock/max-logo.png', 'Max'),
            alt: 'Max',
        },
        footerLogo: img('/mock/max-logo-black.png', 'Max'),
        footerLogoDark: img('/mock/max-logo.png', 'Max'),
    },
    {
        id: 2,
        slug: 'maya',
        name: 'Филиал 2',
        title: '1-го Мая',
        shortName: 'ф-л 1-го Мая',
        formLabel: 'филиал на 1-го Мая',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 1-го Мая, д. 316',
        phone: '+7 (861) 207-17-74',
        panoramaUrl: '#',
        mapUrl: '#',
        marker: {x: 53, y: 40},
        messenger: {
            url: 'http://max.ru',
            logo: img('/mock/max-logo.png', 'Max'),
            alt: 'Max',
        },
        footerLogo: img('/mock/max-logo-black.png', 'Max'),
        footerLogoDark: img('/mock/max-logo.png', 'Max'),
    },
];

export function toMessenger(branch) {
    return {
        name: branch.shortName,
        url: branch.messenger.url,
        logo: branch.messenger.logo,
        alt: branch.messenger.alt,
    };
}

export function branchMessengers() {
    return mockBranches.map(toMessenger);
}

export function branchFormOptions({includeAny = false} = {}) {
    const options = mockBranches.map((branch) => ({
        value: branch.slug,
        label: branch.formLabel,
    }));
    if (includeAny) {
        options.push({value: 'any', label: 'Не имеет значения'});
    }
    return options;
}
