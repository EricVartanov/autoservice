'use client';

import {useState} from 'react';
import Image from 'next/image';
import Select from '@/components/ui/Select';
import FieldError from '@/components/ui/FieldError';
import Button from '@/components/ui/Button';
import PhoneInput, {getCleanPhone} from '@/components/ui/PhoneInput';
import Icon from '@/components/icons/Icon';
import LegalLink from '@/components/ui/LegalLink';
import FormSuccessOverlay from '@/components/ui/FormSuccessOverlay';
import {mediaUrl} from '@/lib/media';
import {collectFormErrors} from '@/lib/formValidation';

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

        const validationErrors = collectFormErrors(quickForm.errors, {name, phoneDigits, carBrand, consent});
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
        `w-full rounded-full border bg-transparent text-foreground-fixed px-5 py-3 md:py-4 lg:py-3.5 font-helvetica text-sm lg:text-base outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent transition-colors ${
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
                <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
                    {errors[field.name]}
                </FieldError>
            </div>
        );
    };

    return (
        <div className="relative overflow-hidden rounded-[20] md:rounded-[30]">
            <Image
                src={mediaUrl(heroImage)}
                alt={title}
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(335deg,#be0000_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-[60] md:gap-[50] px-2.5 pb-[50] pt-10 md:px-[30] md:py-12 md:pb-16 lg:px-20 lg:pt-20 lg:pb-[35]">
                <div className="flex flex-col gap-5 lg:flex-row items-center text-center lg:text-left lg:justify-between lg:gap-16">
                    <div className="w-full md:max-w-xl">
                        <p className="font-helvetica text-sm md:text-lg text-foreground-fixed">{mark}</p>
                        <h2 className="mt-2 lg:mt-5 wrap-break-word font-heading text-[25px] md:text-[48px] lg:text-[54px] leading-none text-foreground-fixed whitespace-pre-line">
                            {title}
                        </h2>
                    </div>
                    <p className="max-w-2xl font-helvetica text-sm md:text-lg leading-5 text-foreground-fixed/90">
                        {description}
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="relative">
                    <div className="grid grid-cols-1 gap-[30] md:gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-[75] lg:gap-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[30] md:gap-8 lg:gap-5 min-w-0">
                            {quickForm.fields.map(renderField)}
                        </div>

                        {quickForm.consent && (
                            <div className="relative max-w-md lg:col-span-2">
                                <label className="flex justify-center md:justify-start cursor-pointer items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed">
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
                                    <span className={'inline-grid md:inline'}>
                                        {quickForm.consent.label}{' '}
                                        <LegalLink
                                            slug={quickForm.consent.slug}
                                            className="pb-px border-b border-foreground-fixed hover:text-primary"
                                        >
                                            {quickForm.consent.linkText}
                                        </LegalLink>
                                    </span>
                                </label>
                                <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
                                    {errors.consent}
                                </FieldError>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full min-h-10 lg:w-auto shrink-0 bg-foreground-fixed! text-black! hover:bg-foreground-fixed/90! min-w-0 md:max-w-[262] mx-auto mt-5 lg:mt-0 lg:mx-0 lg:col-start-2 lg:row-start-1"
                        >
                            {quickForm.submitLabel}
                        </Button>
                    </div>
                </form>
                <FormSuccessOverlay
                    open={submitted}
                    onClose={() => setSubmitted(false)}
                    message={quickForm.successMessage}
                />
            </div>
        </div>
    );
}
