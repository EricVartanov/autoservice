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
        id: 1,
        name: 'Филиал 1',
        shortName: 'ф-л 2-я Дорожная',
        workHours: 'Пн - Вс, с 09:00 до 20:00',
        address: 'г. Краснодар, ул. 2-я Дорожная, д. 39',
        phone: '+7 (861) 207-07-71'
    },
    {
        id: 2,
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
            title: 'Вы получаете качество\nс первого касания',
            titleBack: 'качество работы',
            subtitle: 'Качество начинается не с финального результата -\nего видно с первых минут. Когда работа начинается чётко\nи без суеты, Вы сразу понимаете, что процесс под контролем',
            cards: [
                {
                    image: "/mock/about/about-card-bg1.webp",
                    eyebrow: "Возможность предоставления фото и видео материалов",
                    title: "Прозрачная диагностика",
                    text: "Вы видите реальную картину по автомобилю: прозрачная диагностика, фото и видеоотчеты и пояснения к ним. Мы преподносим информацию так, чтобы вы могли принять взвешенное решение.",
                    variant: "first",
                },
                {
                    image: "/mock/about/about-card-bg2.webp",
                    title: "Согласование всех работ",
                    text: "Все работы обсуждаются заранее. Каждый шаг только после вашего решения. Никаких сюрпризов. Согласование — это демонстрация того, что именно вы управляете процессом.",
                    variant: "second",
                },
                {
                    title: "Надежность",
                    stat: "92%",
                    statLabel: "положительных отзывов",
                    text: "Вы понимаете, что вас не подведут, не затянут сроки, не «навесят» лишнее. Предсказуемость в каждом шаге. Все потому, что мы выполняем свою работу так, как договаривались.",
                    variant: "third",
                }],
        },
        {
            type: 'statistic',
            stats: [
                {
                    id: 1,
                    image: "/mock/statistics/tools.png",
                    alt: 'tools',
                    value: '10',
                    text: "Лет обслуживаем и ремонтируем авто",
                },
                {
                    id: 2,
                    image: "/mock/statistics/garage.png",
                    alt: 'garage',
                    value: '5000+',
                    text: "Автомобилей отремонтировано",
                },
                {
                    id: 3,
                    image: "/mock/statistics/winner.png",
                    alt: 'winner',
                    value: '92%',
                    text: "Положительных отзывов",
                },
                {
                    id: 4,
                    image: "/mock/statistics/worker.png",
                    alt: 'worker',
                    value: '10',
                    text: "Лет средний стаж мастеров",
                },
            ]
        },
        {
            type: 'services',
            title: 'Вы получаете полный спектр\nуслуг по диагностике, ремонту\nи обслуживанию автомобиля',
            titleBack: 'наши услуги',
            mark: 'Услуги',
            services: [
                {
                    slug: "engine",
                    title: "Двигатель",
                    price: "от 1100 руб.",
                    image: "/mock/services/engine.webp",
                },
                {
                    slug: "suspension",
                    title: "Ходовая часть и подвеска",
                    price: "от 1350 руб.",
                    image: "/mock/services/suspension.webp",
                },
                {
                    slug: "ac-system",
                    title: "Система кондиционирования",
                    price: "от 550 руб.",
                    image: "/mock/services/ac-system.webp",
                },
                {
                    slug: "brakes",
                    title: "Тормозная система",
                    price: "от 1600 руб.",
                    image: "/mock/services/brakes.webp",
                },
                {
                    slug: "transmission",
                    title: "Трансмиссия",
                    price: "от 2600 руб.",
                    image: "/mock/services/transmission.webp",
                },
                {
                    slug: "exhaust",
                    title: "Выхлопная система",
                    price: "от 1375 руб.",
                    image: "/mock/services/exhaust.webp",
                },
                {
                    slug: "fuel-system",
                    title: "Топливная система",
                    price: "от 1375 руб.",
                    image: "/mock/services/fuel-system.webp",
                },
                {
                    slug: "maintenance",
                    title: "Техническое обслуживание",
                    price: "от 550 руб.",
                    image: "/mock/services/maintenance.webp",
                },
                {
                    slug: "steering-system",
                    title: "Рулевое управление\nЭлектрооборудование",
                    price: "от 550 руб.",
                    image: "/mock/services/steering-system.webp",
                },
                {
                    slug: "cooling-system",
                    title: "Система охлаждения",
                    price: "от 550 руб.",
                    image: "/mock/services/cooling-system.webp",
                },
            ]
        },
        {
            type: 'steps',
            title: 'Процесс работы от первого шага до результата',
            mark: 'Этапы',
            steps: [
                {
                    number: '01',
                    title: "Диагностика и понимание задачи",
                    text: "Мы изучаем автомобиль и фиксируем факты по его состоянию. Объясняем, что происходит и какие есть варианты решения. Вы получаете ясную картину без догадок",
                },
                {
                    number: '02',
                    title: 'Обсуждение вариантов ремонта',
                    text: 'Мы предлагаем несколько подходов — по глубине работ, срокам и бюджету. Вы выбирает тот формат ремонта, который Вам подходит',
                },
                {
                    number: '03',
                    title: 'Согласование плана',
                    text: 'Формируем понятный план действий, их порядок. Если появляется новая информация — она обсуждается сразу, до выполнения. Согласование — это спокойный, честный диалог',
                },
                {
                    number: '04',
                    title: 'Выполнение работ',
                    text: 'Работы выполняет мастер, который закрепляется за Вашим автомобилем от начала до конца. Вы получаете обновления по ключевым этапам. Процесс идёт четко по согласованию',
                },
                {
                    number: '05',
                    title: 'Проверка и выдача',
                    text: 'Мы проверяем результат и убеждаемся, что всё работает корректно. Передаём автомобиль с отчётом и рекомендациями. Вы уезжаете с пониманием, что сделано и что нужно делать дальше',
                },
            ],
            images: [
                {id: 1, image: '/mock/steps/slide1.webp', alt: 'mechanic'},
                {id: 2, image: '/mock/steps/slide2.webp', alt: 'mechanic'},
                {id: 3, image: '/mock/steps/slide3.webp', alt: 'mechanic'},
                {id: 4, image: '/mock/steps/slide4.webp', alt: 'mechanic'},
                {id: 5, image: '/mock/steps/slide5.webp', alt: 'mechanic'},
                {id: 6, image: '/mock/steps/slide6.webp', alt: 'mechanic'},
                {id: 7, image: '/mock/steps/slide7.webp', alt: 'mechanic'},
                {id: 8, image: '/mock/steps/slide8.webp', alt: 'mechanic'},
                {id: 9, image: '/mock/steps/slide9.webp', alt: 'mechanic'}
            ]
        },
        {
            type: 'team',
            mark: 'Команда',
            title: 'Авторитет — это люди',
            titleBack: 'наша команда',
            highlightHtml: "Автосервис — это не стены и не оборудование, а, <span>прежде всего, люди</span>",
            subtitle: "Наши люди - это причина, по которой к нам с радостью хотят приехать снова. Каждый из нас в ответе за результат, поэтому мы работаем так, чтобы Вы уезжали без вопросов",
            image: {path: '/mock/team/team.webp', alt: 'the best team'}
        },
        {
            type: 'specialOffer',
            title: [
                'Отремонтируем сегодня — ',
                'оплатите потом.'
            ],
            subtitle: 'Чтобы рассчитать условия кредита уточняйте информацию у менеджера',
            highlightHtml: "Поломка <span> не должна менять</span> ваши планы",
            highlightMark: 'Специальное предложение',
            image: {path: '/mock/specialOffer/specialOffer.webp', alt: 'special Offer'}
        },
        {
            type: 'reviews',
            mark: 'Отзывы',
            title: 'Мы слышим Вас, поэтому\nкаждый отзыв важен',
            titleBack: 'отзывы',
            summary: {
                count: '900+',
                countLabel: 'отзывов на 3-х площадках',
                platforms: [
                    {id: 'google', logo: '/mock/reviews/google.webp', alt: 'google'},
                    {id: 'yandex', logo: '/mock/reviews/yandex.webp', alt: 'yandex'},
                    {id: '2gis', logo: '/mock/reviews/2gis.webp', alt: '2gis'},
                ],
            },
            branches: [
                {id: 1, label: 'Филиал на 2-я Дорожная'},
                {id: 2, label: 'Филиал на 1-го Мая'},
            ],
            platforms: [
                {id: 'yandex', label: 'Отзывы Яндекс'},
                {id: '2gis', label: 'Отзывы 2GIS'},
                {id: 'google', label: 'Отзывы Google'},
            ],
            items: [
                {
                    id: 1,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'm0kik',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 2,
                    branchId: 2,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar2.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 6,
                    branchId: 2,
                    platform: '2gis',
                    author: 'm0kik',
                    avatar: '/mock/reviews/avatar3.webp',
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 7,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 8,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 9,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 10,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 11,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar1.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 4,
                    branchId: 2,
                    platform: 'yandex',
                    author: 'm0kik',
                    avatar: '/mock/reviews/avatar2.webp',
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 5,
                    branchId: 1,
                    platform: 'google',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: '/mock/reviews/avatar3.webp',
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
            ],
            cta: {label: 'Смотреть все', link: '/reviews'},
        },
        {
            type: 'commercial',
            mark: 'Коммерческий транспорт',
            title: 'Обслуживание\nи ремонт коммерческого\nтранспорта',
            subtitle: 'Наш Автосервис также выполняет профессиональный ремонт\nи обслуживание коммерческого транспорта.',
            cta: {label: 'Подробнее', link: '/commercial'},
            backgroundImage: {path: '/mock/commercial/commercial-bg.webp', alt: 'commercial service'},
            limitations: [
                {image: '/mock/commercial/truck.webp', alt: 'truck', text: 'Не обслуживаем\nкрупнотоннажные грузовики'},
                {image: '/mock/commercial/semi-truck.webp', alt: 'semi truck', text: 'Не обслуживаем автомобили\nвыше 3 метров'},
            ],
            form: {
                fields: [
                    {name: 'name', label: 'Как к Вам обращаться?', type: 'text', placeholder: 'начните вводить', required: true},
                    {name: 'phone', label: 'Ваш номер телефона', type: 'tel', placeholder: '+7 (098) 465 95 05', required: true},
                    {
                        name: 'carBrand',
                        label: 'Марка Вашего авто',
                        type: 'select',
                        placeholder: 'выберите из списка',
                        required: true,
                        options: ['Renault', 'Citroen', 'Ford', 'Volkswagen', 'Другая'],
                    },
                ],
                submitLabel: 'Отправить',
            },
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
