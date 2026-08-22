import {img} from '@/lib/media';
import {mockBranches, branchMessengers} from '@/content/branches';
import {brands} from '@/content/brands';
import {services, toServiceCard} from '@/content/services';
import {forms} from '@/content/forms';

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
            brands,
        },
        {
            type: 'about',
            title: 'Вы получаете качество\nс первого касания',
            titleBack: 'качество работы',
            subtitle: 'Качество начинается не с финального результата -\nего видно с первых минут. Когда работа начинается чётко\nи без суеты, Вы сразу понимаете, что процесс под контролем',
            cards: [
                {
                    image: img('/mock/about/about-card-bg1.webp', 'Прозрачная диагностика'),
                    eyebrow: 'Возможность предоставления фото и видео материалов',
                    title: 'Прозрачная диагностика',
                    text: 'Вы видите реальную картину по автомобилю: прозрачная диагностика, фото и видеоотчеты и пояснения к ним. Мы преподносим информацию так, чтобы вы могли принять взвешенное решение.',
                    variant: 'first',
                },
                {
                    image: img('/mock/about/about-card-bg2.webp', 'Согласование всех работ'),
                    title: 'Согласование всех работ',
                    text: 'Все работы обсуждаются заранее. Каждый шаг только после вашего решения. Никаких сюрпризов. Согласование — это демонстрация того, что именно вы управляете процессом.',
                    variant: 'second',
                },
                {
                    title: 'Надежность',
                    stat: '92%',
                    statLabel: 'положительных отзывов',
                    text: 'Вы понимаете, что вас не подведут, не затянут сроки, не «навесят» лишнее. Предсказуемость в каждом шаге. Все потому, что мы выполняем свою работу так, как договаривались.',
                    variant: 'third',
                },
            ],
            stats: [
                {
                    id: 1,
                    image: img('/mock/statistics/tools.png', 'tools'),
                    value: '10',
                    text: 'Лет обслуживаем и ремонтируем авто',
                },
                {
                    id: 2,
                    image: img('/mock/statistics/garage.png', 'garage'),
                    value: '5000+',
                    text: 'Автомобилей отремонтировано',
                },
                {
                    id: 3,
                    image: img('/mock/statistics/winner.png', 'winner'),
                    value: '92%',
                    text: 'Положительных отзывов',
                },
                {
                    id: 4,
                    image: img('/mock/statistics/worker.png', 'worker'),
                    value: '10',
                    text: 'Лет средний стаж мастеров',
                },
            ],
        },
        {
            type: 'services',
            title: 'Вы получаете полный спектр\nуслуг по диагностике, ремонту \nи обслуживанию автомобиля',
            titleBack: 'наши услуги',
            mark: 'Услуги',
            services: services.map(toServiceCard),
        },
        {
            type: 'steps',
            title: 'Процесс работы от первого шага до результата',
            mark: 'Этапы',
            steps: [
                {
                    number: '01',
                    title: 'Диагностика и понимание задачи',
                    text: 'Мы изучаем автомобиль и фиксируем факты по его состоянию. Объясняем, что происходит и какие есть варианты решения. Вы получаете ясную картину без догадок',
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
                {id: 1, image: img('/mock/steps/slide1.webp', 'mechanic')},
                {id: 2, image: img('/mock/steps/slide2.webp', 'mechanic')},
                {id: 3, image: img('/mock/steps/slide3.webp', 'mechanic')},
                {id: 4, image: img('/mock/steps/slide4.webp', 'mechanic')},
                {id: 5, image: img('/mock/steps/slide5.webp', 'mechanic')},
                {id: 6, image: img('/mock/steps/slide6.webp', 'mechanic')},
                {id: 7, image: img('/mock/steps/slide7.webp', 'mechanic')},
                {id: 8, image: img('/mock/steps/slide8.webp', 'mechanic')},
                {id: 9, image: img('/mock/steps/slide9.webp', 'mechanic')},
            ],
        },
        {
            type: 'team',
            mark: 'Команда',
            title: 'Авторитет — это люди',
            titleBack: 'наша команда',
            highlightHtml: 'Автосервис — это не стены и не оборудование, а, <span>прежде всего, люди</span>',
            subtitle: 'Наши люди - это причина, по которой к нам с радостью хотят приехать снова. Каждый из нас в ответе за результат, поэтому мы работаем так, чтобы Вы уезжали без вопросов',
            image: img('/mock/team/team1.webp', 'the best team'),
        },
        {
            type: 'specialOffer',
            title: [
                'Отремонтируем сегодня — \n',
                'оплатите потом.',
            ],
            subtitle: 'Чтобы рассчитать условия кредита уточняйте информацию у менеджера',
            highlightHtml: 'Поломка <span> не должна менять</span> ваши планы',
            highlightMark: 'Специальное предложение',
            cta: {label: 'Подробнее'},
            image: img('/mock/specialOffer/specialOffer.webp', 'special Offer'),
            detailsHtml: '<p>Не откладывайте заботу об автомобиле на потом! Ведь, решив вопрос сегодня, Вы можете предотвратить более серьёзные неисправности в будущем и избежать больших расходов на их устранении ☝️</p><p>Наш Автосервис предоставляет удобную возможность воспользоваться услугами в кредит. Мы сотрудничаем с ведущими банками страны: Сбербанком и Т-банком — всё просто и удобно. Оформление заявки займёт всего несколько минут.</p><p>Не позволяйте текущей ситуации перерасти в более серьёзную проблему. Ездите сейчас — платите потом! Все подробности по телефону.</p>',
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
                    {id: 'google', logo: img('/mock/reviews/google.webp', 'google')},
                    {id: 'yandex', logo: img('/mock/reviews/yandex.webp', 'yandex')},
                    {id: '2gis', logo: img('/mock/reviews/2gis.webp', '2gis')},
                ],
            },
            platforms: [
                {
                    id: 'yandex',
                    label: 'Отзывы Яндекс',
                    links: [
                        {branchId: 1, url: 'https://yandex.ru/maps/org/avtoritet_2_ya_dorozhnaya'},
                        {branchId: 2, url: 'https://yandex.ru/maps/org/avtoritet_1_go_maya'},
                    ],
                },
                {
                    id: '2gis',
                    label: 'Отзывы 2GIS',
                    links: [
                        {branchId: 1, url: 'https://2gis.ru/krasnodar/firm/avtoritet_2_ya_dorozhnaya'},
                        {branchId: 2, url: 'https://2gis.ru/krasnodar/firm/avtoritet_1_go_maya'},
                    ],
                },
                {
                    id: 'google',
                    label: 'Отзывы Google',
                    links: [
                        {branchId: 1, url: 'https://maps.google.com/?cid=avtoritet_2_ya_dorozhnaya'},
                        {branchId: 2, url: 'https://maps.google.com/?cid=avtoritet_1_go_maya'},
                    ],
                },
            ],
            items: [
                {
                    id: 1,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'm0kik',
                    avatar: img('/mock/reviews/avatar1.webp', 'm0kik'),
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 2,
                    branchId: 2,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar2.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 6,
                    branchId: 2,
                    platform: '2gis',
                    author: 'm0kik',
                    avatar: img('/mock/reviews/avatar3.webp', 'm0kik'),
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 7,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar1.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 8,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar1.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 9,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar1.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 10,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar1.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 11,
                    branchId: 1,
                    platform: 'yandex',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar1.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
                {
                    id: 4,
                    branchId: 2,
                    platform: 'yandex',
                    author: 'm0kik',
                    avatar: img('/mock/reviews/avatar2.webp', 'm0kik'),
                    rating: 4.9,
                    text: 'Обратился с проблемами в электрике. Сделали полную диагностику, нашли неисправный датчик и проблемы с проводкой. Все исправили аккуратно, объяснили, что и как, дали гарантию. Электроника теперь работает отлично.',
                },
                {
                    id: 5,
                    branchId: 1,
                    platform: 'google',
                    author: 'Anastasia Deshevaya-Butkevich',
                    avatar: img('/mock/reviews/avatar3.webp', 'Anastasia Deshevaya-Butkevich'),
                    rating: 4.9,
                    text: 'Всем кто ищет сто для своего авто, всем в Авторитет. Здесь вы получите качественное обслуживание, менеджеры грамотно проконсультируют и ответят на все вопросы.',
                },
            ],
            cta: {label: 'Смотреть все'},
        },
        {
            type: 'commercial',
            mark: 'Коммерческий транспорт',
            title: 'Обслуживание\nи ремонт коммерческого\nтранспорта',
            subtitle: 'Наш Автосервис также выполняет профессиональный ремонт\nи обслуживание коммерческого транспорта.',
            cta: {label: 'Подробнее'},
            detailsHtml: '<p>Наш Автосервис также выполняет профессиональный ремонт и обслуживание коммерческого транспорта.</p><p>Для Вашего автопарка доступен полный спектр услуг. Имеются только два ограничения:</p><p>— мы не обслуживаем крупнотоннажные грузовики,<br>— не принимаем автомобили выше 3 метров.</p><p>Мы понимаем, насколько важна бесперебойная работа коммерческого транспорта, поэтому обеспечиваем оперативность, точность и стабильное качество. Вы получаете предсказуемый результат, на который можно опираться ежедневно.</p>',
            backgroundImage: img('/mock/commercial/commercial-bg.webp', 'commercial service'),
            limitations: [
                {image: img('/mock/commercial/truck.webp', 'truck'), text: 'Не обслуживаем\nкрупнотоннажные грузовики'},
                {image: img('/mock/commercial/semi-truck.webp', 'semi truck'), text: 'Не обслуживаем автомобили\nвыше 3 метров'},
            ],
            form: forms.commercial,
        },
        {
            type: 'faq',
            mark: 'F&Q',
            title: 'Мы собрали список\nсамых частых вопросов',
            cta: {label: 'Смотреть все'},
            messengers: branchMessengers(),
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
            backgroundImage: img('/mock/contactForm/contact-form-bg.webp', 'механики за работой'),
            form: forms.contact,
        },
        {
            type: 'contacts',
            id: 'contacts',
            email: 'Avtoritet-servis23@yandex.ru',
            mapImage: img('/mock/contacts/map.svg', 'Карта Краснодарского края'),
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
                photo: img('/mock/feedback/maria.webp', 'Мария'),
            },
            tires: img('/mock/feedback/tires.webp', ''),
            form: forms.feedback,
        },
    ],
};

export function getMockSection(type) {
    return mockPage.sections.find((section) => section.type === type) ?? null;
}
