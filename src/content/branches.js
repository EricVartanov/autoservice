import {img} from '@/lib/media';

export const mockBranches = [
    {
        id: 1,
        slug: 'maya',
        name: 'Филиал 1',
        title: '1-го Мая',
        shortName: 'ф-л 1-го Мая',
        formLabel: 'филиал на 1-го Мая',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 1-го Мая, д. 316',
        phone: '+7 (861) 207-17-74',
        panoramaUrl: 'https://yandex.ru/map-widget/v1/?ll=38.997736%2C45.133651&z=10&l=stv&panorama%5Bpoint%5D=38.997132%2C45.133730&panorama%5Bdirection%5D=292.765806%2C-9.262492&panorama%5Bspan%5D=117.625646%2C60.000000',
        mapUrl: '#',
        marker: {x: 53, y: 58},
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
        slug: 'dorozhnaya',
        name: 'Филиал 2',
        title: '2-я Дорожная',
        shortName: 'ф-л 2-я Дорожная',
        formLabel: 'филиал на 2-ой Дорожной',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 2-я Дорожная, д. 39',
        phone: '+7 (861) 207-07-71',
        panoramaUrl: 'https://yandex.ru/map-widget/v1/?ll=39.021325%2C45.070558&z=10&l=stv&panorama%5Bpoint%5D=39.021467%2C45.070555&panorama%5Bdirection%5D=42.416318%2C7.161085&panorama%5Bspan%5D=117.625646%2C60.000000',
        mapUrl: '#',
        marker: {x: 45, y: 27},
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
