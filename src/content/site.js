import {img} from '@/lib/media';

export const site = {
    seo: {
        title: 'Авторитет — автосервис в Краснодаре',
        description: 'Диагностика, ремонт и обслуживание автомобилей в Краснодаре. Два филиала.',
    },
    labels: {
        branches: 'Филиалы',
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        backToTop: 'Наверх',
        showMore: 'Показать еще',
        collapse: 'Свернуть',
        expand: 'Развернуть',
        moreDetails: 'Подробнее',
        legalUpdated: 'Дата последнего обновления',
        themeToggle: 'Переключить тему',
        prevSlide: 'Предыдущий слайд',
        nextSlide: 'Следующий слайд',
        newsPagination: 'Пагинация новостей',
        prevPage: 'Предыдущая страница',
        nextPage: 'Следующая страница',
        selectPlaceholder: 'Выберите',
    },
    callModal: {
        title: 'Выберите филиал',
    },
    consent: {
        label: 'Согласен на обработку',
        linkText: 'персональных данных',
        slug: 'privacy',
        required: true,
    },
    formSuccess: {
        message: 'Спасибо! Заявка отправлена, мы скоро свяжемся с Вами.',
    },
    formErrors: {
        nameRequired: 'Введите имя',
        nameShort: 'Слишком короткое имя',
        phone: 'Введите номер полностью',
        carBrand: 'Выберите марку авто',
        timing: 'Выберите срок обслуживания',
        branch: 'Выберите филиал',
        consent: 'Необходимо согласие',
    },
    serviceModal: {
        mark: 'Услуги',
        benefitsTitle: 'Что дает своевременный уход и ремонт',
        symptomsTitle: 'Признаки неисправностей:',
        popularTitle: 'Популярные услуги',
        priceListTitle: 'Все услуги*',
        priceListSubTitle:
            '* Обращаем Ваше внимание, что здесь представлен не исчерпывающий перечень услуг. Если Вы не обнаружили интересующую Вас работу, просим связаться с нами по телефону или оставить заявку. Вероятно, мы сумеем Вам помочь.',
        cardCta: 'Подробнее',
        showMore: 'Показать еще',
    },
    header: {
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
    },
    footer: {
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
    },
};

export const mockHeader = site.header;
export const mockFooter = site.footer;
