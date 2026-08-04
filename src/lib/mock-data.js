// src/lib/mock-data.js

export const mockHeader = {
    logo: {path: '/mock/logo.png', alt: 'main Logo'},
    menu: [
        {label: 'Об автосервисе', link: '/#about'},
        {label: 'Услуги', link: '/#services'},
        {label: 'Контакты', link: '/#contacts'},
        {label: 'Новости', link: '/news'},
        {label: 'Коммерческий транспорт', link: '/#commercial'},
    ],
    messengers: [
        {name: 'ф-л 2-я Дорожная', url: 'http://max.ru', logo: '/mock/max-logo.png', alt: 'Max'},
        {name: 'ф-л 1-го Мая', url: 'http://max.ru', logo: '/mock/max-logo.png', alt: 'Max'}

    ],
    socials: [{name: 'vk', url: 'https://vk.com/example', logo: '/mock/vk-logo.png', alt: 'Vk'}],
};

export const mockFooter = {
    logo: '/mock/logo.svg',
    description: 'Ремонт автомобилей. Понятный процесс, надёжный результат.',
    columns: [
        {title: 'Меню', links: [{label: 'Услуги', link: '/#services'}, {label: 'Контакты', link: '/#contacts'}]},
        {title: 'Филиалы', links: [{label: 'ф-л 2-я Дорожная', link: '#'}, {label: 'ф-л 1-го Мая', link: '#'}]},
    ],
    legal: '© 2026 Автритет. Все права защищены.',
    socials: [{name: 'vk', url: 'https://vk.com/example'}],
};

export const mockBranches = [
        {
            id: '1',
            name: 'Филиал 1',
            shortName: 'ф-л 2-я Дорожная',
            workHours: 'Пн - Вс, с 09:00 до 20:00',
            address: 'г. Краснодар, ул. 2-я Дорожная, д. 39',
            phone: '+7 (861) 207-07-71'
        },
        {
            id: '2',
            name: 'Филиал 2',
            shortName: 'ф-л 1-го Мая',
            workHours: 'Пн - Вс, с 09:00 до 20:00',
            address: 'г. Краснодар, ул. 1-го Мая, д. 316',
            phone: '+7 (861) 207-17-74'
        },
    ];

export const mockPage = {
    sections: [
        {
            type: 'hero',
            title: 'Ремонт автомобилей.\nПонятный процесс,\nнадёжный результат!',
            backgroundVideo: '/mock/hero-video.mp4',
            slides: [
                {
                    title: 'Диагностика,\nобслуживание\nи ремонт',
                    text: 'Когда всё - от диагностики до сложного ремонта - можно сделать в одном месте, жизнь становится проще. Мы работаем так, чтобы Вы могли спокойно заниматься своими делами. Просто привозите автомобиль — остальное мы берём на себя',
                },
                {
                    title: 'Кузовной\nремонт\nи покраска',
                    text: 'Второй слайд с описанием услуги...',
                },
                {
                    title: 'Шиномонтаж\nи развал-\nсхождение',
                    text: 'Третий слайд с описанием услуги...',
                },
            ],
            stats: [
                {value: '900+', label: 'Довольных клиентов'},
                {value: '10', label: 'Лет на рынке'},
            ],
            cta: {label: 'Оставить заявку', link: '#contacts'},
            brands: [
                {name: 'Renault', logo: '/mock/brands/renault.png'},
                {name: 'Citroen', logo: '/mock/brands/citroen.png'},
                {name: 'Audi', logo: '/mock/brands/audi.png'},
                {name: 'Ford', logo: '/mock/brands/ford.png'},
                {name: 'Opel', logo: '/mock/brands/opel.png'},
                {name: 'Chevrolet', logo: '/mock/brands/chevrolet.png'},
                {name: 'Nissan', logo: '/mock/brands/nissan.png'},
                {name: 'Volkswagen', logo: '/mock/brands/vw.png'},
            ],
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
                {title: 'Услуга 1', image: '/mock/service-1.jpg', description: '...'},
                {title: 'Услуга 2', image: '/mock/service-2.jpg', description: '...'},
                {title: 'Услуга 3', image: '/mock/service-3.jpg', description: '...'},
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
                {title: 'Новость 1', excerpt: '...', date: '2026-07-20', image: '/mock/news-1.jpg', slug: 'news-1'},
                {title: 'Новость 2', excerpt: '...', date: '2026-07-15', image: '/mock/news-2.jpg', slug: 'news-2'},
            ],
        },
        {
            type: 'contact_form',
            title: 'Оставьте заявку',
        },
    ],
};
