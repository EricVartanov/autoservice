// src/lib/mock-data.js

export const mockGlobal = {
    logo: '/mock/logo.svg',
    phone: '+7 999 123-45-67',
    email: 'info@example.com',
    address: 'г. Краснодар, ул. Примерная, 1',
    socials: [
        { name: 'telegram', url: 'https://t.me/example' },
        { name: 'whatsapp', url: 'https://wa.me/79991234567' },
    ],
    menu: [
        { label: 'О компании', link: '#about' },
        { label: 'Услуги', link: '#services' },
        { label: 'Новости', link: '#news' },
        { label: 'Контакты', link: '#contacts' },
    ],
};


export const mockPage = {
    sections: [
        {
            type: 'hero',
            title: 'Заголовок Hero-секции',
            subtitle: 'Подзаголовок',
            backgroundImage: '/mock/hero-bg.jpg',
            cta: { label: 'Узнать больше', link: '#about' },
        },
        {
            type: 'about',
            title: 'О компании',
            text: 'Текст описания компании...',
            image: '/mock/about.jpg',
        },
        {
            type: 'services_slider',
            title: 'Наши услуги',
            slides: [
                { title: 'Услуга 1', image: '/mock/service-1.jpg', description: '...' },
                { title: 'Услуга 2', image: '/mock/service-2.jpg', description: '...' },
                { title: 'Услуга 3', image: '/mock/service-3.jpg', description: '...' },
            ],
        },
        {
            type: 'gallery',
            title: 'Фотографии',
            images: [
                '/mock/gallery-1.jpg',
                '/mock/gallery-2.jpg',
                '/mock/gallery-3.jpg',
            ],
        },
        {
            type: 'news',
            title: 'Новости',
            items: [
                { title: 'Новость 1', excerpt: '...', date: '2026-07-20', image: '/mock/news-1.jpg', slug: 'news-1' },
                { title: 'Новость 2', excerpt: '...', date: '2026-07-15', image: '/mock/news-2.jpg', slug: 'news-2' },
            ],
        },
        {
            type: 'contact_form',
            title: 'Оставьте заявку',
        },
    ],
};
