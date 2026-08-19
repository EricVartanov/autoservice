"use client";

import {useState} from "react";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import Select from "@/components/ui/Select";
import FieldError from "@/components/ui/FieldError";
import LegalLink from "@/components/ui/LegalLink";
import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import FormSuccessOverlay from "@/components/ui/FormSuccessOverlay";
import {collectFormErrors} from "@/lib/formValidation";

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

        const validationErrors = collectFormErrors(form.errors, {
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
        `w-full rounded-full border bg-white/20 text-foreground-fixed h-[44] md:h-[54] px-5 py-3.5 font-helvetica text-sm md:text-base outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent transition-colors ${
            hasError
                ? "border-foreground-fixed"
                : "border-transparent focus:border-white focus:border-foreground-fixed"
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
                    errorClass="border-foreground-fixed"
                />
            );
        }

        return (
            <div
                key={field.name}
                className={`relative w-full md:w-full lg:w-[calc(50%-10px)] ${field.name === 'carBrand' ? 'lg:w-full': ''}`}
            >
                <label className="mb-2.5 block font-helvetica text-sm md:text-base font-bold text-foreground-fixed">
                    {field.label}
                    {field.required && <span className="text-primary"> *</span>}
                </label>
                {control}
                <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap" colorClass="text-foreground-fixed">
                    {errors[field.name]}
                </FieldError>
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
                                className="flex md:flex-row flex-row-reverse justify-between md:justify-start cursor-pointer items-center gap-1.5 font-helvetica text-sm md:text-base text-foreground-fixed"
                            >
                                <span
                                    className={`flex size-5 md:size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                        hasError
                                            ? "border-foreground-fixed"
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
                <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap" colorClass="text-foreground-fixed">
                    {errors[group.name]}
                </FieldError>
            </div>
        );
    };

    return (
        <section className="relative bg-[radial-gradient(circle_at_top_left,rgba(200,0,0,1)_0%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,0.8)_100%)] rounded-t-[30] py-[50] md:py-16 lg:py-[80]">
            <Container className="relative justify-between flex flex-col gap-[30] md:gap-[100] lg:gap-10 lg:flex-row lg:gap-16 !px-5 md:!px-[30] lg:!px-16 lg:items-start">
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
                    className="relative w-full rounded-[30] mx-auto lg:w-1/2 max-w-[715]"
                >
                    <div className="flex flex-col">
                        <div className={'flex flex-col lg:flex-row lg:flex-wrap lg:justify-between gap-[30] md:gap-y-6 md:gap-2.5 lg:gap-y-6 lg:gap-x-3'}>
                            {form.fields.map(renderMainField)}
                        </div>

                        <div className={'flex flex-col gap-[30] md:gap-6 mt-[30] md:mt-6'}>
                            {form.radioGroups?.map(renderRadioGroup)}
                        </div>

                        <div className="mt-[30] md:mt-[50] relative flex flex-col gap-[30] md:gap-6 md:flex-row md:items-center md:justify-between">
                            <div className={'relative pb-1'}>
                                <label
                                    className="flex flex-row-reverse justify-between md:flex-row cursor-pointer md:justify-start items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed">
                                <span
                                    className={`mt-0.5 p-1 flex size-6 md:size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                                        errors.consent
                                            ? "border-foreground-fixed"
                                            : consent
                                                ? "border-foreground-fixed"
                                                : "border-[#c4c4c4]"
                                    }`}
                                >
                                    {consent && (
                                        <Icon name={'square'} className={'size-5 md:size-6'} />
                                    )}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={handleConsentChange}
                                    className="sr-only"
                                />
                                <span className={'inline'}>
                                    {form.consent.label}{" "}
                                        <LegalLink
                                            slug={form.consent.slug}
                                            className="pb-px border-b hover:opacity-60"
                                        >
                                        {form.consent.linkText}
                                    </LegalLink>
                                </span>

                                </label>
                                <FieldError className="absolute bottom-[-20] left-0" colorClass="text-foreground-fixed">
                                    {errors.consent}
                                </FieldError>
                            </div>


                            <Button type="submit" className="shrink-0 w-full md:w-auto min-w-[180] bg-foreground-fixed! text-primary! hover:opacity-60">
                                {form.submitLabel}
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
            <FormSuccessOverlay
                open={submitted}
                onClose={() => setSubmitted(false)}
                message={form.successMessage}
            />
        </section>
    );
}
