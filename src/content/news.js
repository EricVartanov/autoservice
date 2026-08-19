import {img} from '@/lib/media';

export const newsPage = {
    title: 'Новости',
    empty: 'Новостей за {year} пока нет.',
    seoTitle: 'Новости — Авторитет',
    seoDescription: 'Новости автосервиса Авторитет',
    pageSize: 2,
};

export const NEWS_PAGE_SIZE = newsPage.pageSize;

const NEWS_TEXT = [
    'Мы продолжаем развивать сервис и повышать качество обслуживания. В этом материале рассказываем о важных изменениях, которые уже доступны клиентам обоих филиалов.',
    'Команда Авторитет работает так, чтобы каждый визит был понятным и предсказуемым: от диагностики до выдачи автомобиля с рекомендациями.',
    'Если у вас остались вопросы — оставьте заявку на сайте или свяжитесь с менеджером выбранного филиала.',
];

export const mockNews = [
    {
        id: 1,
        slug: 'kommercheskij-transport',
        date: '2026-06-12',
        title: 'Расширили обслуживание коммерческого транспорта',
        category: 'Коммерческий транспорт',
        gallery: [
            img('/mock/commercial/commercial-bg.webp', 'Обслуживание коммерческого транспорта в автосервисе Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 2,
        slug: 'meropriyatie-iyun-2026',
        date: '2026-06-12',
        title: 'Открытый день в автосервисе Авторитет',
        category: 'Мероприятия',
        gallery: [
            img('/mock/services/engine2.png', 'Мероприятие в автосервисе Авторитет'),
            img('/mock/services/engine3.png', 'Гости на мероприятии автосервиса Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 3,
        slug: 'novye-uslugi-vesna-2026',
        date: '2026-03-18',
        title: 'Обновили линейку услуг по ремонту',
        category: 'Услуги',
        gallery: [
            img('/mock/services/engine4.png', 'Ремонт автомобиля в автосервисе Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 4,
        slug: 'akcii-yanvar-2026',
        date: '2026-01-22',
        title: 'Сезонные акции на диагностику и ТО',
        category: 'Акции',
        gallery: [
            img('/mock/services/engine1.png', 'Акция на услуги автосервиса Авторитет'),
            img('/mock/services/engine2.png', 'Специальное предложение автосервиса Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 5,
        slug: 'komanda-noyabr-2025',
        date: '2025-11-05',
        title: 'Знакомим с мастерами Авторитет',
        category: 'Команда',
        gallery: [
            img('/mock/services/engine3.png', 'Команда мастеров автосервиса Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 6,
        slug: 'meropriyatie-avgust-2025',
        date: '2025-08-14',
        title: 'Корпоративное мероприятие команды',
        category: 'Мероприятия',
        gallery: [
            img('/mock/services/engine4.png', 'Корпоративное мероприятие Авторитет'),
            img('/mock/services/engine1.png', 'Участники мероприятия автосервиса'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 7,
        slug: 'uslugi-aprel-2025',
        date: '2025-04-02',
        title: 'Как проходит диагностика на подъёмнике',
        category: 'Услуги',
        gallery: [
            img('/mock/services/engine2.png', 'Диагностика автомобиля на подъёмнике'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 8,
        slug: 'lcv-dekabr-2024',
        date: '2024-12-10',
        title: 'Ремонт лёгкого коммерческого транспорта',
        category: 'Коммерческий транспорт',
        gallery: [
            img('/mock/services/engine3.png', 'Ремонт лёгкого коммерческого транспорта'),
            img('/mock/services/engine4.png', 'Обслуживание фургона в сервисе Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 9,
        slug: 'akcii-iyul-2024',
        date: '2024-07-21',
        title: 'Летняя акция на обслуживание',
        category: 'Акции',
        gallery: [
            img('/mock/services/engine1.png', 'Сезонная акция автосервиса Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 10,
        slug: 'otkrytyj-den-2024',
        date: '2024-02-08',
        title: 'Открытый день и демонстрация работ',
        category: 'Мероприятия',
        gallery: [
            img('/mock/services/engine2.png', 'Открытый день в автосервисе Авторитет'),
            img('/mock/services/engine3.png', 'Демонстрация работ на мероприятии'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 11,
        slug: 'to-oktyabr-2023',
        date: '2023-10-30',
        title: 'Плановое техническое обслуживание',
        category: 'Услуги',
        gallery: [
            img('/mock/services/engine4.png', 'Техническое обслуживание автомобиля'),
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 12,
        slug: 'komanda-maj-2023',
        date: '2023-05-16',
        title: 'Мастера технического центра за работой',
        category: 'Команда',
        gallery: [
            img('/mock/services/engine1.png', 'Мастера автосервиса Авторитет за работой'),
            img('/mock/services/engine2.png', 'Команда технического центра Авторитет'),
        ],
        paragraphs: NEWS_TEXT,
    },
];
