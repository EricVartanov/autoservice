'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import PhoneInput, {getCleanPhone} from '@/components/ui/PhoneInput';
import Icon from '@/components/icons/Icon';

function validate({name, phoneDigits, carBrand, consent}) {
    const errors = {};

    if (!name.trim()) {
        errors.name = 'Введите имя';
    } else if (name.trim().length < 2) {
        errors.name = 'Слишком короткое имя';
    }

    if (phoneDigits.length < 10) {
        errors.phone = 'Введите номер полностью';
    }

    if (!carBrand) {
        errors.carBrand = 'Выберите марку авто';
    }

    if (!consent) {
        errors.consent = 'Необходимо согласие';
    }

    return errors;
}

export default function ServiceHero({data}) {
    const {mark, title, description, heroImage, quickForm} = data;

    const [name, setName] = useState('');
    const [phoneDigits, setPhoneDigits] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = {...prev};
            delete next[field];
            return next;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate({name, phoneDigits, carBrand, consent});
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        console.log({
            service: title,
            name: name.trim(),
            phone: getCleanPhone(phoneDigits),
            carBrand,
            consent,
        });

        setSubmitted(true);
        setName('');
        setPhoneDigits('');
        setCarBrand('');
        setConsent(false);
    };

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent text-foreground-fixed px-5 py-4 lg:py-3.5 font-helvetica text-sm lg:text-base outline-none placeholder:text-foreground-fixed transition-colors ${
            hasError ? 'border-primary' : 'border-white/20 focus:border-foreground-fixed'
        }`;

    const renderField = (field) => {
        let control = null;

        if (field.type === 'text') {
            control = (
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        clearError('name');
                    }}
                    placeholder={field.placeholder}
                    className={fieldInputClass(!!errors.name)}
                />
            );
        } else if (field.type === 'tel') {
            control = (
                <PhoneInput
                    value={phoneDigits}
                    onChange={(digits) => {
                        setPhoneDigits(digits);
                        clearError('phone');
                    }}
                    placeholder={field.placeholder}
                    className={fieldInputClass(!!errors.phone)}
                />
            );
        } else if (field.type === 'select') {
            control = (
                <Select
                    options={field.options ?? []}
                    value={carBrand}
                    onChange={(val) => {
                        setCarBrand(val);
                        clearError('carBrand');
                    }}
                    placeholder={field.placeholder}
                    error={!!errors.carBrand}
                    variant="pill"
                />
            );
        }

        return (
            <div key={field.name} className="relative min-w-0">
                <label className="mb-2.5 block font-helvetica text-sm md:text-base font-bold text-foreground-fixed">
                    {field.label}
                    {field.required && <span className="text-primary"> *</span>}
                </label>
                {control}
                {errors[field.name] && (
                    <p className="absolute left-0 top-full mt-1.5 whitespace-nowrap text-xs text-primary">
                        {errors[field.name]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="relative overflow-hidden rounded-[20] md:rounded-[30]">
            <Image
                src={heroImage}
                alt={title}
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(335deg,#be0000_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8 lg:gap-[50] px-5 py-10 pr-14 md:px-10 md:py-12 md:pr-16 lg:px-20 lg:pt-20 lg:pb-[35]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <div className="max-w-xl">
                        <p className="font-helvetica text-base md:text-lg text-foreground-fixed">{mark}</p>
                        <h2 className="mt-2 lg:mt-5 font-heading text-[34px] md:text-[48px] lg:text-[54px] leading-none text-foreground-fixed whitespace-pre-line">
                            {title}
                        </h2>
                    </div>
                    <p className="max-w-2xl font-helvetica text-base md:text-lg leading-5 text-foreground-fixed/90 lg:text-right">
                        {description}
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-[75]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 flex-1 min-w-0">
                            {quickForm.fields.map(renderField)}
                        </div>
                        <Button
                            type="submit"
                            className="w-full lg:w-auto shrink-0 bg-foreground-fixed! text-black! hover:bg-foreground-fixed/90! min-w-0 lg:min-w-[262]"
                        >
                            {quickForm.submitLabel}
                        </Button>
                    </div>

                    {quickForm.consent && (
                        <div className="relative mt-4 max-w-md">
                            <label className="flex cursor-pointer items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed">
                                <span
                                    className={`flex size-5 md:size-6 shrink-0 items-center justify-center rounded border transition-colors ${
                                        errors.consent
                                            ? 'border-primary'
                                            : consent
                                              ? 'border-primary bg-primary'
                                              : 'border-white/40'
                                    }`}
                                >
                                    {consent && <Icon name="square" className="size-5 md:size-6" />}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => {
                                        setConsent(e.target.checked);
                                        clearError('consent');
                                    }}
                                    className="sr-only"
                                />
                                <span>
                                    {quickForm.consent.label}{' '}
                                    <Link
                                        href={quickForm.consent.url}
                                        className="pb-px border-b border-foreground-fixed hover:text-primary"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {quickForm.consent.linkText}
                                    </Link>
                                </span>
                            </label>
                            {errors.consent && (
                                <p className="mt-1.5 text-xs text-primary">{errors.consent}</p>
                            )}
                        </div>
                    )}

                    {submitted && (
                        <p className="mt-3 text-sm text-foreground-fixed">
                            Заявка принята, мы свяжемся с вами.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
