"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import Select from "@/components/ui/Select";
import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {useMediaQuery} from "@/hooks/useMediaQuery";

function validate({name, phoneDigits, carBrand, timing, branch, consent}) {
    const errors = {};

    if (!name.trim()) {
        errors.name = "Введите имя";
    } else if (name.trim().length < 2) {
        errors.name = "Слишком короткое имя";
    }

    if (phoneDigits.length < 10) {
        errors.phone = "Введите номер полностью";
    }

    if (!carBrand) {
        errors.carBrand = "Выберите марку авто";
    }

    if (!timing) {
        errors.timing = "Выберите срок обслуживания";
    }

    if (!branch) {
        errors.branch = "Выберите филиал";
    }

    if (!consent) {
        errors.consent = "Необходимо согласие";
    }

    return errors;
}

export default function ServiceContactForm({data}) {
    const {title, backgroundImage, form} = data;

    const [name, setName] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [timing, setTiming] = useState("");
    const [branch, setBranch] = useState("");
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const isMobileOrTablet = useMediaQuery('(max-width: 1278px)');

    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = {...prev};
            delete next[field];
            return next;
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        clearError("name");
    };

    const handlePhoneChange = (digits) => {
        setPhoneDigits(digits);
        clearError("phone");
    };

    const handleCarBrandChange = (val) => {
        setCarBrand(val);
        clearError("carBrand");
    };

    const handleTimingChange = (val) => {
        setTiming(val);
        clearError("timing");
    };

    const handleBranchChange = (val) => {
        setBranch(val);
        clearError("branch");
    };

    const handleConsentChange = (e) => {
        setConsent(e.target.checked);
        clearError("consent");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate({
            name,
            phoneDigits,
            carBrand,
            timing,
            branch,
            consent,
        });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const payload = {
            name: name.trim(),
            phone: getCleanPhone(phoneDigits),
            carBrand,
            timing,
            branch,
            consent,
        };
        // сюда позже уйдёт fetch на WP-эндпоинт
        console.log(payload);

        setSubmitted(true);
        setName("");
        setPhoneDigits("");
        setCarBrand("");
        setTiming("");
        setBranch("");
        setConsent(false);
    };

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border border-transparent bg-white/20 text-foreground-fixed px-5 py-4 md:py-3.5 font-helvetica text-sm md:text-base outline-none placeholder:text-foreground-fixed transition-colors ${
            hasError ? "border-primary" : "focus:border-white focus:border-foreground-fixed"
        }`;

    const renderMainField = (field) => {
        let control = null;

        if (field.type === "text") {
            control = (
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder={field.placeholder}
                    className={fieldInputClass(!!errors.name)}
                />
            );
        } else if (field.type === "tel") {
            control = (
                <PhoneInput
                    value={phoneDigits}
                    onChange={handlePhoneChange}
                    placeholder={field.placeholder}
                    className={fieldInputClass(!!errors.phone)}
                />
            );
        } else if (field.type === "select") {
            control = (
                <Select
                    options={field.options ?? []}
                    value={carBrand}
                    onChange={handleCarBrandChange}
                    placeholder={field.placeholder}
                    error={!!errors.carBrand}
                />
            );
        }

        return (
            <div
                key={field.name}
                className={`relative w-full md:w-[calc(50%-5px)] lg:w-[calc(50%-15px)] ${field.name === 'carBrand' ? 'lg:w-full': ''}`}
            >
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

    const renderRadioGroup = (group) => {
        const value = group.name === "timing" ? timing : branch;
        const onChange = group.name === "timing" ? handleTimingChange : handleBranchChange;
        const hasError = !!errors[group.name];

        return (
            <div key={group.name} className="relative">
                <p className="mb-4 font-helvetica text-sm md:text-base font-bold text-foreground-fixed">
                    {group.label}
                    {group.required && <span className="text-primary"> *</span>}
                </p>
                <div className="flex flex-col md:flex-row md:flex-wrap gap-x-5 gap-y-3">
                    {group.options.map((opt) => {
                        const checked = value === opt.value;
                        return (
                            <label
                                key={opt.value}
                                className="flex cursor-pointer items-center gap-1.5 font-helvetica text-sm md:text-base text-foreground-fixed"
                            >
                                <span
                                    className={`flex size-5 md:size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                        hasError
                                            ? "border-primary-light"
                                            : checked
                                                ? "border-foreground-fixed"
                                                : "border-white/40"
                                    }`}
                                >
                                    {checked && <span className="size-2.5 md:size-3.5 rounded-full bg-foreground-fixed"/>}
                                </span>
                                <input
                                    type="radio"
                                    name={group.name}
                                    value={opt.value}
                                    checked={checked}
                                    onChange={() => onChange(opt.value)}
                                    className="sr-only"
                                />
                                {opt.label}
                            </label>
                        );
                    })}
                </div>
                {hasError && (
                    <p className="absolute left-0 top-full mt-1.5 whitespace-nowrap text-xs text-primary">
                        {errors[group.name]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <section className="relative bg-primary rounded-t-[30] py-12 md:py-16 lg:py-[80]">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                    src={backgroundImage.path}
                    alt={backgroundImage.alt}
                    fill
                    className="object-cover"
                />
            </div>

            <Container className="relative justify-between flex flex-col gap-[50] md:gap-[100] lg:gap-10 lg:flex-row lg:gap-16 !px-5 md:!px-10 lg:!px-16 lg:items-start">
                <div className="lg:max-w-[555] pb-0 lg:pb-[40]">
                    <SectionTitle
                        title={title}
                        titleColor={'text-foreground-fixed!'}
                        variant={isMobileOrTablet ? 'center' : 'left'}
                        animate={false}
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative w-full rounded-[30] lg:w-1/2 max-w-[715]"
                >
                    <div className="flex flex-col">
                        <div className={'flex flex-wrap gap-5 md:gap-y-6 md:gap-2.5 lg:gap-y-6 lg:gap-x-3'}>
                            {form.fields.map(renderMainField)}
                        </div>

                        <div className={'flex flex-col gap-6 mt-6'}>
                            {form.radioGroups?.map(renderRadioGroup)}
                        </div>

                        <div className="mt-[50] relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className={'relative pb-1'}>
                                <label
                                    className="flex cursor-pointer items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed">
                                <span
                                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                                        errors.consent
                                            ? "border-primary-light"
                                            : consent
                                                ? "border-foreground-fixed"
                                                : "border-[#c4c4c4]"
                                    }`}
                                >
                                    {consent && (
                                        <Icon name={'square'} className={'size-6'} />
                                    )}
                                </span>
                                    <input
                                        type="checkbox"
                                        checked={consent}
                                        onChange={handleConsentChange}
                                        className="sr-only"
                                    />
                                    <span>
                                    {form.consent.label}{" "}
                                        <Link
                                            href={form.consent.url}
                                            className="pb-px border-b hover:opacity-60"
                                        >
                                        {form.consent.linkText}
                                    </Link>
                                </span>

                                </label>
                                {errors.consent && (
                                    <p className="absolute bottom-[-20] left-0 text-xs text-primary">{errors.consent}</p>
                                )}
                            </div>


                            <Button type="submit" className="shrink-0 w-full sm:w-auto min-w-[180] bg-foreground-fixed! text-primary! hover:opacity-60">
                                {form.submitLabel}
                            </Button>
                        </div>
                    </div>

                    {submitted && (
                        <p className="mt-4 text-base text-primary">
                            Спасибо! Заявка отправлена, мы скоро свяжемся с Вами.
                        </p>
                    )}
                </form>
            </Container>
        </section>
    );
}
