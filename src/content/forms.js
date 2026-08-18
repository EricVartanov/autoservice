import {brandSelectOptions} from '@/content/brands';
import {branchFormOptions} from '@/content/branches';

export const DEFAULT_CONSENT = {
    label: 'Согласен на обработку',
    linkText: 'персональных данных',
    slug: 'privacy',
    required: true,
};

export function nameField(overrides = {}) {
    return {
        name: 'name',
        label: 'Как к Вам обращаться?',
        type: 'text',
        placeholder: 'начните вводить',
        required: true,
        ...overrides,
    };
}

export function phoneField(overrides = {}) {
    return {
        name: 'phone',
        label: 'Ваш номер телефона',
        type: 'tel',
        placeholder: '+7(098)465-95-05',
        required: true,
        ...overrides,
    };
}

export function carBrandField(overrides = {}) {
    return {
        name: 'carBrand',
        label: 'Марка Вашего авто',
        type: 'select',
        placeholder: 'выберите из списка',
        required: true,
        options: brandSelectOptions(),
        ...overrides,
    };
}

export const sharedQuickForm = {
    fields: [
        nameField(),
        phoneField(),
        carBrandField({label: 'Марка вашего авто'}),
    ],
    consent: DEFAULT_CONSENT,
    submitLabel: 'Отправить',
};

export function commercialForm() {
    return {
        fields: [nameField(), phoneField(), carBrandField()],
        submitLabel: 'Отправить',
    };
}

export function contactForm() {
    return {
        fields: [nameField(), phoneField(), carBrandField()],
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
                options: branchFormOptions({includeAny: true}),
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
        consent: DEFAULT_CONSENT,
        submitLabel: 'Отправить',
    };
}

export function feedbackForm() {
    return {
        fields: [
            nameField(),
            phoneField({placeholder: 'начните вводить'}),
        ],
        consent: DEFAULT_CONSENT,
        branch: {
            name: 'branch',
            label: 'В каком филиале Вы обслуживались',
            required: true,
            options: branchFormOptions(),
        },
        message: {
            name: 'message',
            label: 'Напишите Ваше обращение',
            hint: 'указание номера Заказ-наряда упрощает задачу по установлению обстоятельств по Вашему случаю',
            placeholder: 'начните вводить',
            required: false,
        },
        submitLabel: 'Отправить',
    };
}
