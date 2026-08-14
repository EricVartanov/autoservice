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
    logo: {path: '/mock/footer-logo.png', alt: 'Авторитет'},
    logoDark: {path: '/mock/footer-logo-light.png', alt: 'Авторитет'},
    copyright: 'Авторитет',
    legal: [
        {label: 'Политика конфиденциальности', link: '#'},
        {label: 'Согласие на обработку перс. данных', link: '#'},
    ],
    branches: [
        {label: 'ф-л 2-я Дорожная', link: '#', logo: '/mock/max-logo-black.png', logoDark: '/mock/max-logo.png'},
        {label: 'ф-л 1-го Мая', link: '#', logo: '/mock/max-logo-black.png', logoDark: '/mock/max-logo.png'},
    ],
    socials: [{
        name: 'vk',
        url: 'https://vk.com/example',
        logo: '/mock/vk-logo-black.png',
        logoDark: '/mock/vk-logo.png',
        alt: 'Vk'
    }],
};

export const mockBranches = [
    {
        id: 1,
        name: 'Филиал 1',
        title: '2-я Дорожная',
        shortName: 'ф-л 2-я Дорожная',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 2-я Дорожная, д. 39',
        phone: '+7 (861) 207-07-71',
        panoramaUrl: '#',
        mapUrl: '#',
        // lower pin on map (left card connector)
        marker: {x: 52, y: 60},
    },
    {
        id: 2,
        name: 'Филиал 2',
        title: '1-го Мая',
        shortName: 'ф-л 1-го Мая',
        workHours: 'Ежедневно с 9:00 до 20:00',
        address: 'г. Краснодар, \nул. 1-го Мая, д. 316',
        phone: '+7 (861) 207-17-74',
        panoramaUrl: '#',
        mapUrl: '#',
        // upper pin on map (right card connector)
        marker: {x: 53, y: 40},
    },
];

const sharedQuickForm = {
    fields: [
        {
            name: 'name',
            label: 'Как к Вам обращаться?',
            type: 'text',
            placeholder: 'начните вводить',
            required: true,
        },
        {
            name: 'phone',
            label: 'Ваш номер телефона',
            type: 'tel',
            placeholder: '+7(098)465-95-05',
            required: true,
        },
        {
            name: 'carBrand',
            label: 'Марка вашего авто',
            type: 'select',
            placeholder: 'выберите из списка',
            required: true,
            options: ['Renault', 'Citroen', 'Ford', 'Volkswagen', 'Toyota', 'Другая'],
        },
    ],
    consent: {
        label: 'Согласен на обработку',
        linkText: 'персональных данных',
        url: '/privacy',
        required: true,
    },
    submitLabel: 'Отправить',
};

const SERVICE_ICONS = {
    engine: {path: '/mock/services/icons/engine.png', alt: 'Двигатель'},
    car: {path: '/mock/services/icons/car.png', alt: 'Автомобиль'},
    fire: {path: '/mock/services/icons/fire.png', alt: 'Огонь'},
    gears: {path: '/mock/services/icons/gears.png', alt: 'Шестерни'},
    gear: {path: '/mock/services/icons/gear.png', alt: 'Шестерня'},
    warning: {path: '/mock/services/icons/warning.png', alt: 'Предупреждение'},
};

const ENGINE_BENEFITS = [
    {icon: SERVICE_ICONS.engine, text: 'Стабильная работа двигателя'},
    {icon: SERVICE_ICONS.car, text: 'Экономия топлива'},
    {icon: SERVICE_ICONS.fire, text: 'Сохранение мощности'},
    {icon: SERVICE_ICONS.gears, text: 'Увеличение ресурса'},
    {icon: SERVICE_ICONS.gear, text: 'Безопасность на дороге'},
];

const ENGINE_SYMPTOMS = [
    {icon: SERVICE_ICONS.warning, text: 'Повышенный расход масла'},
    {icon: SERVICE_ICONS.warning, text: 'Посторонние шумы'},
    {icon: SERVICE_ICONS.warning, text: 'Дым из выхлопной'},
    {icon: SERVICE_ICONS.warning, text: 'Потеря тяги'},
    {icon: SERVICE_ICONS.warning, text: 'Перегрев двигателя'},
];

const ENGINE_POPULAR = [
    {title: 'Диагностика двигателя', price: 'от 1 200 руб.', image: '/mock/services/engine.webp'},
    {title: 'Замена масла и фильтров', price: 'от 1 100 руб.', image: '/mock/services/maintenance.webp'},
    {title: 'Ремонт ГРМ', price: 'от 8 500 руб.', image: '/mock/services/engine.webp'},
    {title: 'Чистка форсунок', price: 'от 3 200 руб.', image: '/mock/services/fuel-system.webp'},
];

const ENGINE_PRICE_LIST = [
    {title: 'Диагностика двигателя', price: 'от 1 200 руб.'},
    {title: 'Замена масла двигателя', price: 'от 1 100 руб.'},
    {title: 'Замена масляного фильтра', price: 'от 550 руб.'},
    {title: 'Замена воздушного фильтра', price: 'от 550 руб.'},
    {title: 'Замена свечей зажигания', price: 'от 2 450 руб.'},
    {title: 'Замена ремня ГРМ', price: 'от 8 500 руб.'},
    {title: 'Замена цепи ГРМ', price: 'от 18 000 руб.'},
    {title: 'Ремонт головки блока цилиндров', price: 'от 25 000 руб.'},
    {title: 'Капитальный ремонт двигателя', price: 'от 85 000 руб.'},
    {title: 'Чистка дроссельной заслонки', price: 'от 2 800 руб.'},
    {title: 'Чистка форсунок', price: 'от 3 200 руб.'},
    {title: 'Замена прокладки ГБЦ', price: 'от 12 000 руб.'},
    {title: 'Замена помпы', price: 'от 4 500 руб.'},
    {title: 'Замена термостата', price: 'от 2 900 руб.'},
    {title: 'Регулировка клапанов', price: 'от 3 500 руб.'},
    {title: 'Замена прокладки клапанной крышки', price: 'от 2 200 руб.'},
];

function buildServiceDetail({slug, title, price, image, description, benefits, symptoms, popular, priceList, trust}) {
    return {
        slug,
        mark: 'Услуги',
        title,
        description,
        heroImage: image,
        quickForm: sharedQuickForm,
        benefitsTitle: 'Что дает своевременный уход и ремонт',
        benefits,
        symptomsTitle: 'Признаки неисправностей:',
        symptoms,
        trust,
        popularTitle: 'Популярные услуги',
        popular,
        priceListTitle: 'Все услуги*',
        priceListSubTitle: '* Обращаем Ваше внимание, что здесь представлен не исчерпывающий перечень услуг. Если Вы не обнаружили интересующую Вас работу, просим связаться с нами по телефону или оставить заявку. Вероятно, мы сумеем Вам помочь.',
        priceList,
        startingPrice: price,
    };
}

const SERVICE_DETAIL_SEED = [
    {
        slug: 'engine',
        title: 'Двигатель',
        price: 'от 1100 руб.',
        image: '/mock/services/modalbg.png',
        description: 'Двигатель — сердце автомобиля, и от его состояния зависит всё: динамика, расход топлива, безопасность и срок службы автомобиля. Регулярное обслуживание помогает избежать серьёзных поломок и серьезных трат, которые часто возникают неожиданно и приводят к дорогостоящему ремонту.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS,
        popular: ENGINE_POPULAR,
        priceList: ENGINE_PRICE_LIST,
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Премия 2ГИС',
            title: 'Почему клиенты доверяют нам ремонт двигателя',
            text: 'Мотористы с профильным стажем, диагностика на современном оборудовании и гарантия на работы. Согласуем смету до начала ремонта — без скрытых доплат.',
        },
    },
    {
        slug: 'suspension',
        title: 'Ходовая часть и подвеска',
        price: 'от 1350 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Исправная подвеска — это комфорт и безопасность. Диагностируем износ узлов, устраняем стуки и восстанавливаем геометрию.',
        benefits: [
            {icon: SERVICE_ICONS.engine, text: 'Комфорт на любой дороге'},
            {icon: SERVICE_ICONS.car, text: 'Устойчивость в поворотах'},
            {icon: SERVICE_ICONS.fire, text: 'Меньший износ шин'},
            {icon: SERVICE_ICONS.gears, text: 'Точная управляемость'},
            {icon: SERVICE_ICONS.gear, text: 'Предсказуемое поведение'},
        ],
        symptoms: [
            {icon: SERVICE_ICONS.warning, text: 'Стуки на кочках'},
            {icon: SERVICE_ICONS.warning, text: 'Увод в сторону'},
            {icon: SERVICE_ICONS.warning, text: 'Неравномерный износ шин'},
            {icon: SERVICE_ICONS.warning, text: 'Течи амортизаторов'},
            {icon: SERVICE_ICONS.warning, text: 'Крен кузова'},
        ],
        popular: [
            {title: 'Диагностика ходовой', price: 'от 1 350 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена амортизаторов', price: 'от 4 500 руб.', image: '/mock/services/engine2.png'},
            {title: 'Замена шаровых опор', price: 'от 2 800 руб.', image: '/mock/services/engine3.png'},
            {title: 'Замена сайлентблоков', price: 'от 3 200 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика ходовой части', price: 'от 1 350 руб.'},
            {title: 'Замена амортизатора', price: 'от 4 500 руб.'},
            {title: 'Замена пружины', price: 'от 3 800 руб.'},
            {title: 'Замена шаровой опоры', price: 'от 2 800 руб.'},
            {title: 'Замена стойки стабилизатора', price: 'от 1 600 руб.'},
            {title: 'Замена сайлентблока', price: 'от 3 200 руб.'},
            {title: 'Замена ступичного подшипника', price: 'от 4 200 руб.'},
            {title: 'Развал-схождение', price: 'от 2 500 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Диагностика подвески',
            title: 'Ходовая под контролем профессионалов',
            text: 'Проверяем подвеску на подъёмнике, фиксируем износ по узлам и предлагаем ремонт только того, что реально требует замены. После работ — проверка геометрии.',
        },
    },
    {
        slug: 'ac-system',
        title: 'Система кондиционирования',
        price: 'от 550 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Заправка, диагностика утечек и ремонт кондиционера — чтобы в салоне снова было комфортно в любую жару.',
        benefits: ENGINE_BENEFITS.map((b, i) => ({
            ...b,
            text: ['Прохлада в салоне', 'Чистый воздух', 'Меньше нагрузки на мотор', 'Защита от плесени', 'Стабильный климат'][i],
        })),
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Слабый холод', 'Посторонний запах', 'Шум компрессора', 'Подтёки фреона', 'Ошибки климата'][i],
        })),
        popular: [
            {title: 'Заправка кондиционера', price: 'от 2 500 руб.', image: '/mock/services/engine1.png'},
            {title: 'Диагностика системы', price: 'от 550 руб.', image: '/mock/services/engine2.png'},
            {title: 'Антибактериальная обработка', price: 'от 1 800 руб.', image: '/mock/services/engine3.png'},
            {title: 'Замена компрессора', price: 'от 12 000 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика кондиционера', price: 'от 550 руб.'},
            {title: 'Заправка фреоном', price: 'от 2 500 руб.'},
            {title: 'Поиск утечки', price: 'от 1 900 руб.'},
            {title: 'Замена компрессора', price: 'от 12 000 руб.'},
            {title: 'Замена радиатора кондиционера', price: 'от 8 500 руб.'},
            {title: 'Антибактериальная обработка', price: 'от 1 800 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Сервис кондиционера',
            title: 'Климат в салоне — наша зона ответственности',
            text: 'Ищем утечки фреона, заправляем по норме производителя и делаем антибактериальную обработку. Комфорт возвращается уже в день визита.',
        },
    },
    {
        slug: 'brakes',
        title: 'Тормозная система',
        price: 'от 1600 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Тормоза — главный элемент безопасности. Меняем колодки и диски, прокачиваем систему, устраняем биение и скрип.',
        benefits: ENGINE_BENEFITS.map((b, i) => ({
            ...b,
            text: ['Короткий тормозной путь', 'Стабильное замедление', 'Меньше износа дисков', 'Предсказуемая педаль', 'Безопасность пассажиров'][i],
        })),
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Скрип при торможении', 'Биение руля', 'Увод при торможении', 'Мягкая педаль', 'Индикатор ABS'][i],
        })),
        popular: [
            {title: 'Замена колодок', price: 'от 1 600 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена тормозных дисков', price: 'от 4 200 руб.', image: '/mock/services/engine2.png'},
            {title: 'Прокачка тормозов', price: 'от 1 800 руб.', image: '/mock/services/engine3.png'},
            {title: 'Диагностика тормозов', price: 'от 1 200 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика тормозной системы', price: 'от 1 200 руб.'},
            {title: 'Замена передних колодок', price: 'от 1 600 руб.'},
            {title: 'Замена задних колодок', price: 'от 1 800 руб.'},
            {title: 'Замена тормозного диска', price: 'от 4 200 руб.'},
            {title: 'Замена тормозной жидкости', price: 'от 2 100 руб.'},
            {title: 'Прокачка тормозов', price: 'от 1 800 руб.'},
            {title: 'Замена суппорта', price: 'от 6 500 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Ремонт тормозов',
            title: 'Тормоза, которым можно доверять',
            text: 'Используем проверенные колодки и диски, прокачиваем контур и проверяем систему после сборки. Безопасность — приоритет на каждом этапе.',
        },
    },
    {
        slug: 'transmission',
        title: 'Трансмиссия',
        price: 'от 2600 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'МКПП, АКПП и сцепление — обслуживаем и ремонтируем трансмиссию с диагностикой и прозрачной сметой.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Рывки при переключении', 'Шум КПП', 'Пробуксовка', 'Течь масла', 'Затруднённое включение'][i],
        })),
        popular: [
            {title: 'Диагностика КПП', price: 'от 2 600 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена масла АКПП', price: 'от 4 800 руб.', image: '/mock/services/engine2.png'},
            {title: 'Замена сцепления', price: 'от 18 000 руб.', image: '/mock/services/engine3.png'},
            {title: 'Ремонт МКПП', price: 'от 25 000 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика трансмиссии', price: 'от 2 600 руб.'},
            {title: 'Замена масла МКПП', price: 'от 2 800 руб.'},
            {title: 'Замена масла АКПП', price: 'от 4 800 руб.'},
            {title: 'Замена сцепления', price: 'от 18 000 руб.'},
            {title: 'Замена привода', price: 'от 5 500 руб.'},
            {title: 'Ремонт АКПП', price: 'от 45 000 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Обслуживание КПП',
            title: 'Трансмиссия без сюрпризов',
            text: 'Мы работаем с двигателями всех типов — бензиновыми, дизельными, турбированными и гибридными. Используем профессиональное оборудование, оригинальные расходники, расходные материалы  и даём гарантию на выполненные работы. Каждый автомобиль проходит индивидуальную диагностику, а клиент получает рекомендации без навязывания лишних услуг',
        },
    },
    {
        slug: 'exhaust',
        title: 'Выхлопная система',
        price: 'от 1375 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Устраняем шум, заменяем гофру, катализатор и глушитель — выхлоп снова тихий и экологичный.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Громкий выхлоп', 'Запах в салоне', 'Потеря тяги', 'Ошибка катализатора', 'Вибрация под днищем'][i],
        })),
        popular: [
            {title: 'Замена гофры', price: 'от 3 500 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена глушителя', price: 'от 4 200 руб.', image: '/mock/services/engine2.png'},
            {title: 'Ремонт выхлопа', price: 'от 1 375 руб.', image: '/mock/services/engine3.png'},
            {title: 'Замена катализатора', price: 'от 12 000 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика выхлопной системы', price: 'от 1 375 руб.'},
            {title: 'Замена гофры', price: 'от 3 500 руб.'},
            {title: 'Замена резонатора', price: 'от 4 000 руб.'},
            {title: 'Замена глушителя', price: 'от 4 200 руб.'},
            {title: 'Замена катализатора', price: 'от 12 000 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Ремонт выхлопа',
            title: 'Тихий и исправный выхлоп',
            text: 'Свариваем и меняем элементы выхлопа с учётом геометрии кузова. Подбираем аналоги или оригинал — вы выбираете бюджет и ресурс.',
        },
    },
    {
        slug: 'fuel-system',
        title: 'Топливная система',
        price: 'от 1375 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Чистка форсунок, замена фильтров и насоса — стабильная подача топлива и ровная работа мотора.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Трудный запуск', 'Плавают обороты', 'Повышенный расход', 'Провалы при разгоне', 'Запах топлива'][i],
        })),
        popular: [
            {title: 'Чистка форсунок', price: 'от 3 200 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена топливного фильтра', price: 'от 1 375 руб.', image: '/mock/services/engine2.png'},
            {title: 'Замена бензонасоса', price: 'от 6 500 руб.', image: '/mock/services/engine3.png'},
            {title: 'Диагностика топливной', price: 'от 1 500 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика топливной системы', price: 'от 1 500 руб.'},
            {title: 'Замена топливного фильтра', price: 'от 1 375 руб.'},
            {title: 'Чистка форсунок', price: 'от 3 200 руб.'},
            {title: 'Замена бензонасоса', price: 'от 6 500 руб.'},
            {title: 'Замена регулятора давления', price: 'от 3 800 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Топливная система',
            title: 'Топливная система работает ровно',
            text: 'Замеряем давление, чистим форсунки и меняем фильтры по факту диагностики. Цель — стабильный запуск и расход без «плавающих» оборотов.',
        },
    },
    {
        slug: 'maintenance',
        title: 'Техническое обслуживание',
        price: 'от 550 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Плановое ТО по регламенту: масло, фильтры, жидкости и проверка узлов — без сюрпризов в дороге.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Пробег до ТО', 'Индикатор сервиса', 'Шумы после пробега', 'Течи жидкостей', 'Снижение динамики'][i],
        })),
        popular: [
            {title: 'ТО-1', price: 'от 3 500 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена масла', price: 'от 1 100 руб.', image: '/mock/services/engine2.png'},
            {title: 'Замена фильтров', price: 'от 550 руб.', image: '/mock/services/engine3.png'},
            {title: 'Компьютерная диагностика', price: 'от 1 200 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Компьютерная диагностика', price: 'от 1 200 руб.'},
            {title: 'Замена масла двигателя', price: 'от 1 100 руб.'},
            {title: 'Замена воздушного фильтра', price: 'от 550 руб.'},
            {title: 'Замена салонного фильтра', price: 'от 550 руб.'},
            {title: 'Замена свечей', price: 'от 2 450 руб.'},
            {title: 'ТО по регламенту', price: 'от 3 500 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Плановое ТО',
            title: 'ТО по регламенту — без лишнего',
            text: 'Соблюдаем межсервисные интервалы производителя, ставим согласованные масла и фильтры. Вы получаете чек-лист выполненных работ и рекомендации на следующий визит.',
        },
    },
    {
        slug: 'steering-system',
        title: 'Рулевое управление\nЭлектрооборудование',
        price: 'от 550 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Ремонт рулевых реек, наконечников и электрики: от аккумулятора до генератора и стартера.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Люфт руля', 'Тяжёлое руление', 'Стук в рейке', 'Разряд АКБ', 'Не крутит стартер'][i],
        })),
        popular: [
            {title: 'Диагностика электрики', price: 'от 550 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена наконечника', price: 'от 2 200 руб.', image: '/mock/services/engine2.png'},
            {title: 'Ремонт рулевой рейки', price: 'от 12 000 руб.', image: '/mock/services/engine3.png'},
            {title: 'Замена генератора', price: 'от 5 500 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика электрооборудования', price: 'от 550 руб.'},
            {title: 'Замена рулевого наконечника', price: 'от 2 200 руб.'},
            {title: 'Замена рулевой тяги', price: 'от 2 800 руб.'},
            {title: 'Ремонт рулевой рейки', price: 'от 12 000 руб.'},
            {title: 'Замена генератора', price: 'от 5 500 руб.'},
            {title: 'Замена стартера', price: 'от 4 800 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Рулевое и электрика',
            title: 'Точное руление и надёжная электрика',
            text: 'Диагностируем рейку, наконечники и бортовую сеть сканером. Устраняем люфты и проблемы с зарядкой так, чтобы руль и электроника работали предсказуемо.',
        },
    },
    {
        slug: 'cooling-system',
        title: 'Система охлаждения',
        price: 'от 550 руб.',
        image: '/mock/services/modalbg.png',
        description:
            'Боремся с перегревом: радиатор, помпа, термостат, антифриз и герметичность системы.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Перегрев', 'Низкий уровень ОЖ', 'Течь радиатора', 'Холодная печка', 'Белый дым'][i],
        })),
        popular: [
            {title: 'Замена антифриза', price: 'от 2 200 руб.', image: '/mock/services/engine1.png'},
            {title: 'Замена термостата', price: 'от 2 900 руб.', image: '/mock/services/engine2.png'},
            {title: 'Замена помпы', price: 'от 4 500 руб.', image: '/mock/services/engine3.png'},
            {title: 'Промывка системы', price: 'от 3 500 руб.', image: '/mock/services/engine4.png'},
        ],
        priceList: [
            {title: 'Диагностика системы охлаждения', price: 'от 550 руб.'},
            {title: 'Замена антифриза', price: 'от 2 200 руб.'},
            {title: 'Замена термостата', price: 'от 2 900 руб.'},
            {title: 'Замена помпы', price: 'от 4 500 руб.'},
            {title: 'Замена радиатора', price: 'от 7 500 руб.'},
            {title: 'Промывка системы охлаждения', price: 'от 3 500 руб.'},
        ],
        trust: {
            image: '/mock/services/modal2gisbg.png',
            imageAlt: 'Система охлаждения',
            title: 'Защита двигателя от перегрева',
            text: 'Проверяем герметичность, меняем антифриз и узлы по результату опрессовки. Стабильная температура — меньше риска дорогого ремонта мотора.',
        },
    },
];

export const mockServiceDetails = Object.fromEntries(
    SERVICE_DETAIL_SEED.map((item) => [item.slug, buildServiceDetail(item)])
);

export function getServiceDetail(slug) {
    return mockServiceDetails[slug] ?? null;
}

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
            title: 'Вы получаете полный спектр\nуслуг по диагностике, ремонту \nи обслуживанию автомобиля',
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
                'Отремонтируем сегодня — \n',
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
                {
                    image: '/mock/commercial/semi-truck.webp',
                    alt: 'semi truck',
                    text: 'Не обслуживаем автомобили\nвыше 3 метров'
                },
            ],
            form: {
                fields: [
                    {
                        name: 'name',
                        label: 'Как к Вам обращаться?',
                        type: 'text',
                        placeholder: 'начните вводить',
                        required: true
                    },
                    {
                        name: 'phone',
                        label: 'Ваш номер телефона',
                        type: 'tel',
                        placeholder: '+7(098)465-95-05',
                        required: true
                    },
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
            type: 'faq',
            mark: 'F&Q',
            title: 'Мы собрали список\nсамых частых вопросов',
            cta: {label: 'Смотреть все'},
            messengers: [
                {name: 'ф-л 2-я Дорожная', url: 'http://max.ru', logo: '/mock/max-logo.png', alt: 'Max'},
                {name: 'ф-л 1-го Мая', url: 'http://max.ru', logo: '/mock/max-logo.png', alt: 'Max'}
            ],
            items: [
                {
                    id: 1,
                    question: 'Предоставляем ли мы гарантию?',
                    answer: 'Да, мы предоставляем гарантию на работы 3 месяца или 10 000 км. пробега — в зависимости от того, что наступит раньше. На запасные части, приобретенные у нас, предоставляется гарантия, установленная заводом-изготовителем',
                },
                {
                    id: 2,
                    question: 'Можно ли Клиентам посещать ремзону?',
                    answer: 'Да, вы можете присутствовать в ремонтной зоне в сопровождении мастера-приёмщика. Для безопасности просьба соблюдать правила нахождения на территории сервиса.',
                },
                {
                    id: 3,
                    question: 'Какой у нас режим работы и работаем ли мы в праздничные дни?',
                    answer: 'Работаем ежедневно с 09:00 до 20:00, включая праздничные дни. Актуальный график в праздники уточняйте у менеджера.',
                },
                {
                    id: 4,
                    question: 'Подбираем ли мы з/ч?',
                    answer: 'Да, мы подбираем оригинальные и качественные аналоги запасных частей под ваш автомобиль и согласовываем варианты с вами до начала работ.',
                },
                {
                    id: 5,
                    question: 'Можно ли отремонтировать автомобиль в кредит?',
                    answer: 'Да, доступна возможность ремонта с отсрочкой оплаты. Условия кредита и рассрочки уточняйте у менеджера — рассчитаем индивидуально.',
                },
                {
                    id: 6,
                    question: 'Обслуживаем ли мы коммерческий транспорт?',
                    answer: 'Да, обслуживаем лёгкий коммерческий транспорт. Не принимаем крупнотоннажные грузовики и автомобили выше 3 метров.',
                },
                {
                    id: 7,
                    question: 'Работаем ли мы с юр.лицами?',
                    answer: 'Да, работаем с юридическими лицами: заключаем договоры, предоставляем закрывающие документы и счёт на оплату.',
                },
                {
                    id: 8,
                    question: 'Нужна ли предварительная запись?',
                    answer: 'Рекомендуем записаться заранее, чтобы подобрать удобное время. Без записи принимаем при наличии свободных постов.',
                },
                {
                    id: 9,
                    question: 'Можно ли оставить автомобиль на ночь?',
                    answer: 'Да, при необходимости автомобиль можно оставить на охраняемой территории сервиса на время ремонта.',
                },
                {
                    id: 10,
                    question: 'Есть ли у вас эвакуатор?',
                    answer: 'Да, можем организовать эвакуацию автомобиля до сервиса. Стоимость и условия уточняйте у менеджера.',
                },
            ],
        },
        {
            type: 'contact_form',
            id: 'contact-form',
            title: 'Не откладывайте ремонт — чем раньше Вы решите вопрос, \n тем дешевле он Вам обойдётся!',
            backgroundImage: {
                path: '/mock/contactForm/contact-form-bg.webp',
                alt: 'механики за работой',
            },
            form: {
                fields: [
                    {
                        name: 'name',
                        label: 'Как к Вам обращаться?',
                        type: 'text',
                        placeholder: 'начните вводить',
                        required: true,
                    },
                    {
                        name: 'phone',
                        label: 'Ваш номер телефона',
                        type: 'tel',
                        placeholder: '+7(098)465-95-05',
                        required: true,
                    },
                    {
                        name: 'carBrand',
                        label: 'Марка Вашего авто',
                        type: 'select',
                        placeholder: 'выберите из списка',
                        required: true,
                        options: ['Renault', 'Citroen', 'Ford', 'Volkswagen', 'Другая'],
                    },
                ],
                radioGroups: [
                    {
                        name: 'timing',
                        label: 'Когда Вы хотите обслужиться?',
                        required: true,
                        options: [
                            {value: 'today', label: 'Сегодня'},
                            {value: 'week', label: 'В ближайшую неделю'},
                            {value: 'month', label: 'В ближайший месяц'},
                            {value: 'other', label: 'Другое'},
                        ],
                    },
                    {
                        name: 'branch',
                        label: 'Какой филиал Вам подходит?',
                        required: true,
                        options: [
                            {value: 'dorozhnaya', label: 'филиал на 2-ой Дорожной'},
                            {value: 'maya', label: 'филиал на 1-го Мая'},
                            {value: 'any', label: 'Не имеет значения'},
                        ],
                    },
                ],
                extraSection: {
                    title: 'Для заказа запчасти на автомобиль заполните дополнительные поля',
                    fields: [
                        {
                            name: 'vin',
                            label: 'VIN-номер автомобиля',
                            type: 'text',
                            placeholder: '17 символов',
                            required: false,
                        },
                        {
                            name: 'partName',
                            label: 'Какая деталь необходима',
                            type: 'select',
                            placeholder: 'выберите из списка',
                            required: false,
                            options: [
                                'Колодки',
                                'Суппорта',
                                'Масло',
                                'Фильтр',
                                'Паттрубки',
                                'Рычаг',
                                'Прокладки',
                            ],
                        },
                    ],
                },
                consent: {
                    label: 'Согласен на обработку',
                    linkText: 'персональных данных',
                    url: '/privacy',
                    required: true,
                },
                submitLabel: 'Отправить',
            },
        },
        {
            type: 'contacts',
            id: 'contacts',
            email: 'Avtoritet-servis23@yandex.ru',
            mapImage: '/mock/contacts/map.svg',
            mapAlt: 'Карта Краснодарского края',
            branches: mockBranches,
        },
        {
            type: 'feedback',
            id: 'feedback',
            intro:
                'У Вас есть рекомендации по улучшению качества услуг? \nОстались нерешённые вопросы после обслуживания? \nИли Вы просто хотите поделиться своими впечатлениями?',
            title: 'Будь то благодарность или конструктивная критика, \nпишите и мы свяжемся с вами',
            manager: {
                title: 'Менеджер по работе с клиентами – Мария',
                photo: {path: '/mock/feedback/maria.webp', alt: 'Мария'},
            },
            tires: {path: '/mock/feedback/tires.webp', alt: ''},
            form: {
                fields: [
                    {
                        name: 'name',
                        label: 'Как к Вам обращаться?',
                        type: 'text',
                        placeholder: 'начните вводить',
                        required: true,
                    },
                    {
                        name: 'phone',
                        label: 'Ваш номер телефона',
                        type: 'tel',
                        placeholder: 'начните вводить',
                        required: true,
                    },
                ],
                consent: {
                    label: 'Согласен на обработку',
                    linkText: 'персональных данных',
                    url: '/privacy',
                    required: true,
                },
                branch: {
                    name: 'branch',
                    label: 'В каком филиале Вы обслуживались',
                    required: true,
                    options: [
                        {value: 'dorozhnaya', label: 'филиал на 2-ой Дорожной'},
                        {value: 'maya', label: 'филиал на 1-го Мая'},
                    ],
                },
                message: {
                    name: 'message',
                    label: 'Напишите Ваше обращение',
                    hint: 'указание номера Заказ-наряда упрощает задачу по установлению обстоятельств по Вашему случаю',
                    placeholder: 'начните вводить',
                    required: false,
                },
                submitLabel: 'Отправить',
            },
        },
    ],
};

export function getMockSection(type) {
    return mockPage.sections.find((section) => section.type === type) ?? null;
}

export const NEWS_PAGE_SIZE = 2;

export const mockOffers = [
    {
        id: 1,
        badge: 'Акция',
        title: 'Диагностика вашего автомобиля со скидкой 20% до 31.07.26*',
        cta: {label: 'Оставить заявку'},
        disclaimer:
            '* Акция действует при записи через сайт. Скидка не суммируется с другими спецпредложениями. Подробности уточняйте у менеджера.',
        until: '31.07.26',
        image: '/mock/specialOffer/specialOffer.webp',
    },
    {
        id: 2,
        badge: 'Акция',
        title: 'Замена масла и фильтров — скидка 15% до 30.09.26*',
        cta: {label: 'Оставить заявку'},
        disclaimer:
            '* Акция действует при записи через сайт. Скидка не суммируется с другими спецпредложениями. Подробности уточняйте у менеджера.',
        until: '30.09.26',
        image: '/mock/commercial/commercial-bg.webp',
    },
    {
        id: 3,
        badge: 'Акция',
        title: 'Компьютерная диагностика в подарок при любом ТО до 31.12.26*',
        cta: {label: 'Оставить заявку'},
        disclaimer:
            '* Акция действует при записи через сайт. Скидка не суммируется с другими спецпредложениями. Подробности уточняйте у менеджера.',
        until: '31.12.26',
        image: '/mock/about/about-card-bg1.webp',
    },
    {
        id: 4,
        badge: 'Акция',
        title: 'Заправка кондиционера со скидкой 10% до 15.08.26*',
        cta: {label: 'Оставить заявку'},
        disclaimer:
            '* Акция действует при записи через сайт. Скидка не суммируется с другими спецпредложениями. Подробности уточняйте у менеджера.',
        until: '15.08.26',
        image: '/mock/contactForm/contact-form-bg.webp',
    },
];

const NEWS_TEXT = [
    'Мы продолжаем развивать сервис и повышать качество обслуживания. В этом материале рассказываем о важных изменениях, которые уже доступны клиентам обоих филиалов.',
    'Команда Авторитет работает так, чтобы каждый визит был понятным и предсказуемым: от диагностики до выдачи автомобиля с рекомендациями.',
    'Если у вас остались вопросы — оставьте заявку на сайте или свяжитесь с менеджером выбранного филиала.',
];

export const mockNews = [
    {
        id: 1,
        date: '2026-06-12',
        category: 'Коммерческий транспорт',
        images: [
            {src: '/mock/commercial/commercial-bg.webp', alt: 'Обслуживание коммерческого транспорта в автосервисе Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 2,
        date: '2026-06-12',
        category: 'Мероприятия',
        images: [
            {src: '/mock/services/engine2.png', alt: 'Мероприятие в автосервисе Авторитет'},
            {src: '/mock/services/engine3.png', alt: 'Гости на мероприятии автосервиса Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 3,
        date: '2026-03-18',
        category: 'Услуги',
        images: [
            {src: '/mock/services/engine4.png', alt: 'Ремонт автомобиля в автосервисе Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 4,
        date: '2026-01-22',
        category: 'Акции',
        images: [
            {src: '/mock/services/engine1.png', alt: 'Акция на услуги автосервиса Авторитет'},
            {src: '/mock/services/engine2.png', alt: 'Специальное предложение автосервиса Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 5,
        date: '2025-11-05',
        category: 'Команда',
        images: [
            {src: '/mock/services/engine3.png', alt: 'Команда мастеров автосервиса Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 6,
        date: '2025-08-14',
        category: 'Мероприятия',
        images: [
            {src: '/mock/services/engine4.png', alt: 'Корпоративное мероприятие Авторитет'},
            {src: '/mock/services/engine1.png', alt: 'Участники мероприятия автосервиса'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 7,
        date: '2025-04-02',
        category: 'Услуги',
        images: [
            {src: '/mock/services/engine2.png', alt: 'Диагностика автомобиля на подъёмнике'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 8,
        date: '2024-12-10',
        category: 'Коммерческий транспорт',
        images: [
            {src: '/mock/services/engine3.png', alt: 'Ремонт лёгкого коммерческого транспорта'},
            {src: '/mock/services/engine4.png', alt: 'Обслуживание фургона в сервисе Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 9,
        date: '2024-07-21',
        category: 'Акции',
        images: [
            {src: '/mock/services/engine1.png', alt: 'Сезонная акция автосервиса Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 10,
        date: '2024-02-08',
        category: 'Мероприятия',
        images: [
            {src: '/mock/services/engine2.png', alt: 'Открытый день в автосервисе Авторитет'},
            {src: '/mock/services/engine3.png', alt: 'Демонстрация работ на мероприятии'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 11,
        date: '2023-10-30',
        category: 'Услуги',
        images: [
            {src: '/mock/services/engine4.png', alt: 'Техническое обслуживание автомобиля'},
        ],
        paragraphs: NEWS_TEXT,
    },
    {
        id: 12,
        date: '2023-05-16',
        category: 'Команда',
        images: [
            {src: '/mock/services/engine1.png', alt: 'Мастера автосервиса Авторитет за работой'},
            {src: '/mock/services/engine2.png', alt: 'Команда технического центра Авторитет'},
        ],
        paragraphs: NEWS_TEXT,
    },
];

