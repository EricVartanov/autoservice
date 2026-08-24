import {brandSelectOptions} from '@/content/brands';
import {branchFormOptions} from '@/content/branches';
import {site} from '@/content/site';

function withShared(form) {
    return {
        ...form,
        consent: site.consent,
        errors: site.formErrors,
        successMessage: site.formSuccess.message,
    };
}

export const forms = {
    quick: withShared({
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
                placeholder: '+7(999)999-99-99',
                required: true,
            },
            {
                name: 'carBrand',
                label: 'Марка вашего авто',
                type: 'select',
                placeholder: 'выберите из списка',
                required: true,
                options: brandSelectOptions(),
            },
        ],
        submitLabel: 'Отправить',
    }),
    commercial: withShared({
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
                placeholder: '+7(999)999-99-99',
                required: true,
            },
            {
                name: 'carBrand',
                label: 'Марка Вашего авто',
                type: 'select',
                placeholder: 'выберите из списка',
                required: true,
                options: brandSelectOptions(),
            },
        ],
        submitLabel: 'Отправить',
    }),
    contact: withShared({
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
                placeholder: '+7(999)999-99-99',
                required: true,
            },
            {
                name: 'carBrand',
                label: 'Марка Вашего авто',
                type: 'select',
                placeholder: 'выберите из списка',
                required: true,
                options: brandSelectOptions(),
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
                options: branchFormOptions({includeAny: true}),
            },
        ],
        extraSection: {
            title: 'Для заказа запчасти на автомобиль заполните дополнительные поля',
            fields: [
                {
                    name: 'vin',
                    label: 'VIN-номер или № кузова автомобиля',
                    type: 'vin',
                    placeholder: 'начните вводить',
                    required: false,
                },
                {
                    name: 'partName',
                    label: 'Какая деталь необходима',
                    type: 'select',
                    placeholder: 'выберите из списка',
                    required: false,
                    allowCustom: true,
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
        submitLabel: 'Отправить',
    }),
    feedback: withShared({
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
    }),
};
