import {img} from '@/lib/media';

export const mockHeader = {
    logo: img('/mock/logo.png', 'main Logo'),
    menu: [
        {label: 'Об автосервисе', link: '/#about'},
        {label: 'Услуги', link: '/#services'},
        {label: 'Контакты', link: '/#contacts'},
        {label: 'Новости', link: '/news'},
        {label: 'Коммерческий транспорт', link: '/#commercial'},
    ],
    socials: [
        {name: 'vk', url: 'https://vk.com/example', logo: img('/mock/vk-logo.png', 'Vk'), alt: 'Vk'},
    ],
};

export const mockFooter = {
    logo: img('/mock/footer-logo.png', 'Авторитет'),
    logoDark: img('/mock/footer-logo-light.png', 'Авторитет'),
    copyright: 'Авторитет',
    legal: [
        {label: 'Политика конфиденциальности', slug: 'privacy'},
        {label: 'Согласие на обработку перс. данных', slug: 'personal-data'},
    ],
    socials: [
        {
            name: 'vk',
            url: 'https://vk.com/example',
            logo: img('/mock/vk-logo-black.png', 'Vk'),
            logoDark: img('/mock/vk-logo.png', 'Vk'),
            alt: 'Vk',
        },
    ],
};
