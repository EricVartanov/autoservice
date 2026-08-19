import {img} from '@/lib/media';
import {forms} from '@/content/forms';
import {site} from '@/content/site';

const SERVICE_ICONS = {
    engine: img('/mock/services/icons/engine.png', 'Двигатель'),
    car: img('/mock/services/icons/car.png', 'Автомобиль'),
    fire: img('/mock/services/icons/fire.png', 'Огонь'),
    gears: img('/mock/services/icons/gears.png', 'Шестерни'),
    gear: img('/mock/services/icons/gear.png', 'Шестерня'),
    warning: img('/mock/services/icons/warning.png', 'Предупреждение'),
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

const DEFAULT_HERO = img('/mock/services/modalbg.png', 'Автосервис Авторитет');
const DEFAULT_TRUST_IMAGE = img('/mock/services/modal2gisbg.png', 'Премия 2ГИС');

function popular(title, price, url) {
    return {title, price, image: img(url, title)};
}

export const services = [
    {
        slug: 'engine',
        title: 'Двигатель',
        price: 'от 1100 руб.',
        image: img('/mock/services/engine.webp', 'Двигатель'),
        heroImage: DEFAULT_HERO,
        description: 'Двигатель — сердце автомобиля, и от его состояния зависит всё: динамика, расход топлива, безопасность и срок службы автомобиля. Регулярное обслуживание помогает избежать серьёзных поломок и серьезных трат, которые часто возникают неожиданно и приводят к дорогостоящему ремонту.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS,
        popular: [
            popular('Диагностика двигателя', 'от 1 200 руб.', '/mock/services/engine.webp'),
            popular('Замена масла и фильтров', 'от 1 100 руб.', '/mock/services/maintenance.webp'),
            popular('Ремонт ГРМ', 'от 8 500 руб.', '/mock/services/engine.webp'),
            popular('Чистка форсунок', 'от 3 200 руб.', '/mock/services/fuel-system.webp'),
        ],
        priceList: [
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
        ],
        trust: {
            image: img('/mock/services/modal2gisbg.png', 'Премия 2ГИС'),
            title: 'Почему клиенты доверяют нам ремонт двигателя',
            text: 'Мотористы с профильным стажем, диагностика на современном оборудовании и гарантия на работы. Согласуем смету до начала ремонта — без скрытых доплат.',
        },
    },
    {
        slug: 'suspension',
        title: 'Ходовая часть и подвеска',
        price: 'от 1350 руб.',
        image: img('/mock/services/suspension.webp', 'Ходовая часть и подвеска'),
        heroImage: DEFAULT_HERO,
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
            popular('Диагностика ходовой', 'от 1 350 руб.', '/mock/services/engine1.png'),
            popular('Замена амортизаторов', 'от 4 500 руб.', '/mock/services/engine2.png'),
            popular('Замена шаровых опор', 'от 2 800 руб.', '/mock/services/engine3.png'),
            popular('Замена сайлентблоков', 'от 3 200 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Диагностика подвески'),
            title: 'Ходовая под контролем профессионалов',
            text: 'Проверяем подвеску на подъёмнике, фиксируем износ по узлам и предлагаем ремонт только того, что реально требует замены. После работ — проверка геометрии.',
        },
    },
    {
        slug: 'ac-system',
        title: 'Система кондиционирования',
        price: 'от 550 руб.',
        image: img('/mock/services/ac-system.webp', 'Система кондиционирования'),
        heroImage: DEFAULT_HERO,
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
            popular('Заправка кондиционера', 'от 2 500 руб.', '/mock/services/engine1.png'),
            popular('Диагностика системы', 'от 550 руб.', '/mock/services/engine2.png'),
            popular('Антибактериальная обработка', 'от 1 800 руб.', '/mock/services/engine3.png'),
            popular('Замена компрессора', 'от 12 000 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Сервис кондиционера'),
            title: 'Климат в салоне — наша зона ответственности',
            text: 'Ищем утечки фреона, заправляем по норме производителя и делаем антибактериальную обработку. Комфорт возвращается уже в день визита.',
        },
    },
    {
        slug: 'brakes',
        title: 'Тормозная система',
        price: 'от 1600 руб.',
        image: img('/mock/services/brakes.webp', 'Тормозная система'),
        heroImage: DEFAULT_HERO,
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
            popular('Замена колодок', 'от 1 600 руб.', '/mock/services/engine1.png'),
            popular('Замена тормозных дисков', 'от 4 200 руб.', '/mock/services/engine2.png'),
            popular('Прокачка тормозов', 'от 1 800 руб.', '/mock/services/engine3.png'),
            popular('Диагностика тормозов', 'от 1 200 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Ремонт тормозов'),
            title: 'Тормоза, которым можно доверять',
            text: 'Используем проверенные колодки и диски, прокачиваем контур и проверяем систему после сборки. Безопасность — приоритет на каждом этапе.',
        },
    },
    {
        slug: 'transmission',
        title: 'Трансмиссия',
        price: 'от 2600 руб.',
        image: img('/mock/services/transmission.webp', 'Трансмиссия'),
        heroImage: DEFAULT_HERO,
        description:
            'МКПП, АКПП и сцепление — обслуживаем и ремонтируем трансмиссию с диагностикой и прозрачной сметой.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Рывки при переключении', 'Шум КПП', 'Пробуксовка', 'Течь масла', 'Затруднённое включение'][i],
        })),
        popular: [
            popular('Диагностика КПП', 'от 2 600 руб.', '/mock/services/engine1.png'),
            popular('Замена масла АКПП', 'от 4 800 руб.', '/mock/services/engine2.png'),
            popular('Замена сцепления', 'от 18 000 руб.', '/mock/services/engine3.png'),
            popular('Ремонт МКПП', 'от 25 000 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Обслуживание КПП'),
            title: 'Трансмиссия без сюрпризов',
            text: 'Мы работаем с двигателями всех типов — бензиновыми, дизельными, турбированными и гибридными. Используем профессиональное оборудование, оригинальные расходники, расходные материалы  и даём гарантию на выполненные работы. Каждый автомобиль проходит индивидуальную диагностику, а клиент получает рекомендации без навязывания лишних услуг',
        },
    },
    {
        slug: 'exhaust',
        title: 'Выхлопная система',
        price: 'от 1375 руб.',
        image: img('/mock/services/exhaust.webp', 'Выхлопная система'),
        heroImage: DEFAULT_HERO,
        description:
            'Устраняем шум, заменяем гофру, катализатор и глушитель — выхлоп снова тихий и экологичный.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Громкий выхлоп', 'Запах в салоне', 'Потеря тяги', 'Ошибка катализатора', 'Вибрация под днищем'][i],
        })),
        popular: [
            popular('Замена гофры', 'от 3 500 руб.', '/mock/services/engine1.png'),
            popular('Замена глушителя', 'от 4 200 руб.', '/mock/services/engine2.png'),
            popular('Ремонт выхлопа', 'от 1 375 руб.', '/mock/services/engine3.png'),
            popular('Замена катализатора', 'от 12 000 руб.', '/mock/services/engine4.png'),
        ],
        priceList: [
            {title: 'Диагностика выхлопной системы', price: 'от 1 375 руб.'},
            {title: 'Замена гофры', price: 'от 3 500 руб.'},
            {title: 'Замена резонатора', price: 'от 4 000 руб.'},
            {title: 'Замена глушителя', price: 'от 4 200 руб.'},
            {title: 'Замена катализатора', price: 'от 12 000 руб.'},
        ],
        trust: {
            image: img('/mock/services/modal2gisbg.png', 'Ремонт выхлопа'),
            title: 'Тихий и исправный выхлоп',
            text: 'Свариваем и меняем элементы выхлопа с учётом геометрии кузова. Подбираем аналоги или оригинал — вы выбираете бюджет и ресурс.',
        },
    },
    {
        slug: 'fuel-system',
        title: 'Топливная система',
        price: 'от 1375 руб.',
        image: img('/mock/services/fuel-system.webp', 'Топливная система'),
        heroImage: DEFAULT_HERO,
        description:
            'Чистка форсунок, замена фильтров и насоса — стабильная подача топлива и ровная работа мотора.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Трудный запуск', 'Плавают обороты', 'Повышенный расход', 'Провалы при разгоне', 'Запах топлива'][i],
        })),
        popular: [
            popular('Чистка форсунок', 'от 3 200 руб.', '/mock/services/engine1.png'),
            popular('Замена топливного фильтра', 'от 1 375 руб.', '/mock/services/engine2.png'),
            popular('Замена бензонасоса', 'от 6 500 руб.', '/mock/services/engine3.png'),
            popular('Диагностика топливной', 'от 1 500 руб.', '/mock/services/engine4.png'),
        ],
        priceList: [
            {title: 'Диагностика топливной системы', price: 'от 1 500 руб.'},
            {title: 'Замена топливного фильтра', price: 'от 1 375 руб.'},
            {title: 'Чистка форсунок', price: 'от 3 200 руб.'},
            {title: 'Замена бензонасоса', price: 'от 6 500 руб.'},
            {title: 'Замена регулятора давления', price: 'от 3 800 руб.'},
        ],
        trust: {
            image: img('/mock/services/modal2gisbg.png', 'Топливная система'),
            title: 'Топливная система работает ровно',
            text: 'Замеряем давление, чистим форсунки и меняем фильтры по факту диагностики. Цель — стабильный запуск и расход без «плавающих» оборотов.',
        },
    },
    {
        slug: 'maintenance',
        title: 'Техническое обслуживание',
        price: 'от 550 руб.',
        image: img('/mock/services/maintenance.webp', 'Техническое обслуживание'),
        heroImage: DEFAULT_HERO,
        description:
            'Плановое ТО по регламенту: масло, фильтры, жидкости и проверка узлов — без сюрпризов в дороге.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Пробег до ТО', 'Индикатор сервиса', 'Шумы после пробега', 'Течи жидкостей', 'Снижение динамики'][i],
        })),
        popular: [
            popular('ТО-1', 'от 3 500 руб.', '/mock/services/engine1.png'),
            popular('Замена масла', 'от 1 100 руб.', '/mock/services/engine2.png'),
            popular('Замена фильтров', 'от 550 руб.', '/mock/services/engine3.png'),
            popular('Компьютерная диагностика', 'от 1 200 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Плановое ТО'),
            title: 'ТО по регламенту — без лишнего',
            text: 'Соблюдаем межсервисные интервалы производителя, ставим согласованные масла и фильтры. Вы получаете чек-лист выполненных работ и рекомендации на следующий визит.',
        },
    },
    {
        slug: 'steering-system',
        title: 'Рулевое управление\nЭлектрооборудование',
        price: 'от 550 руб.',
        image: img('/mock/services/steering-system.webp', 'Рулевое управление и электрооборудование'),
        heroImage: DEFAULT_HERO,
        description:
            'Ремонт рулевых реек, наконечников и электрики: от аккумулятора до генератора и стартера.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Люфт руля', 'Тяжёлое руление', 'Стук в рейке', 'Разряд АКБ', 'Не крутит стартер'][i],
        })),
        popular: [
            popular('Диагностика электрики', 'от 550 руб.', '/mock/services/engine1.png'),
            popular('Замена наконечника', 'от 2 200 руб.', '/mock/services/engine2.png'),
            popular('Ремонт рулевой рейки', 'от 12 000 руб.', '/mock/services/engine3.png'),
            popular('Замена генератора', 'от 5 500 руб.', '/mock/services/engine4.png'),
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
            image: img('/mock/services/modal2gisbg.png', 'Рулевое и электрика'),
            title: 'Точное руление и надёжная электрика',
            text: 'Диагностируем рейку, наконечники и бортовую сеть сканером. Устраняем люфты и проблемы с зарядкой так, чтобы руль и электроника работали предсказуемо.',
        },
    },
    {
        slug: 'cooling-system',
        title: 'Система охлаждения',
        price: 'от 550 руб.',
        image: img('/mock/services/cooling-system.webp', 'Система охлаждения'),
        heroImage: DEFAULT_HERO,
        description:
            'Боремся с перегревом: радиатор, помпа, термостат, антифриз и герметичность системы.',
        benefits: ENGINE_BENEFITS,
        symptoms: ENGINE_SYMPTOMS.map((s, i) => ({
            ...s,
            text: ['Перегрев', 'Низкий уровень ОЖ', 'Течь радиатора', 'Холодная печка', 'Белый дым'][i],
        })),
        popular: [
            popular('Замена антифриза', 'от 2 200 руб.', '/mock/services/engine1.png'),
            popular('Замена термостата', 'от 2 900 руб.', '/mock/services/engine2.png'),
            popular('Замена помпы', 'от 4 500 руб.', '/mock/services/engine3.png'),
            popular('Промывка системы', 'от 3 500 руб.', '/mock/services/engine4.png'),
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
            image: DEFAULT_TRUST_IMAGE,
            title: 'Защита двигателя от перегрева',
            text: 'Проверяем герметичность, меняем антифриз и узлы по результату опрессовки. Стабильная температура — меньше риска дорогого ремонта мотора.',
        },
    },
];

export function toServiceCard(service) {
    return {
        slug: service.slug,
        title: service.title,
        price: service.price,
        image: service.image,
    };
}

export function toServiceDetail(service) {
    const modal = site.serviceModal;
    return {
        slug: service.slug,
        mark: modal.mark,
        title: service.title,
        description: service.description,
        heroImage: service.heroImage,
        quickForm: forms.quick,
        benefitsTitle: modal.benefitsTitle,
        benefits: service.benefits,
        symptomsTitle: modal.symptomsTitle,
        symptoms: service.symptoms,
        trust: service.trust,
        popularTitle: modal.popularTitle,
        popular: service.popular,
        priceListTitle: modal.priceListTitle,
        priceListSubTitle: modal.priceListSubTitle,
        priceList: service.priceList,
        startingPrice: service.price,
        cardCta: modal.cardCta,
        showMore: modal.showMore,
    };
}

export const mockServiceDetails = Object.fromEntries(
    services.map((service) => [service.slug, toServiceDetail(service)]),
);

export function getServiceDetail(slug) {
    return mockServiceDetails[slug] ?? null;
}
