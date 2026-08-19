"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import PhoneInput, { getCleanPhone } from "@/components/ui/PhoneInput";
import Select from "@/components/ui/Select";
import FieldError from "@/components/ui/FieldError";
import LegalLink from "@/components/ui/LegalLink";
import { Container } from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FormSuccessOverlay from "@/components/ui/FormSuccessOverlay";
import {mediaAlt, mediaUrl} from "@/lib/media";
import {collectFormErrors} from "@/lib/formValidation";
import {site} from "@/lib/mock-data";

export default function ContactForm({ data }) {
    const { title, backgroundImage, form } = data;

    const [name, setName] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [timing, setTiming] = useState("");
    const [branch, setBranch] = useState("");
    const [consent, setConsent] = useState(false);
    const [extraValues, setExtraValues] = useState({});
    const [extraOpen, setExtraOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const isMobileOrTablet = useMediaQuery('(max-width: 1278px)');


    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
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

    const handleExtraChange = (fieldName, value) => {
        setExtraValues((prev) => ({ ...prev, [fieldName]: value }));
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
            extra: extraValues,
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
        setExtraValues({});
        setExtraOpen(false);
    };

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent text-foreground-fixed h-[44] md:h-[54] px-5 py-3.5 font-helvetica text-sm md:text-base outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent transition-colors ${hasError ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
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
                    variant="pill"
                />
            );
        }

        return (
            <div
                key={field.name}
                className={`relative w-full md:w-[calc(50%-5px)] lg:w-[calc(50%-15px)] lg:min-w-none ${field.name === 'carBrand' ? 'lg:w-full' : ''}`}
            >
                <label
                    className="mb-2.5 block font-helvetica text-sm md:text-base font-bold text-foreground-fixed">
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
                <div className="flex items-start flex-col md:flex-row md:flex-wrap gap-x-5 gap-y-3">
                    {group.options.map((opt) => {
                        const checked = value === opt.value;
                        return (
                            <label
                                key={opt.value}
                                className="flex cursor-pointer items-center gap-1.5 font-helvetica text-sm md:text-base text-foreground-fixed"
                            >
                                <span
                                    className={`flex size-5 md:size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${hasError
                                        ? "border-primary"
                                        : checked
                                            ? "border-primary"
                                            : "border-white/40"
                                        }`}
                                >
                                    {checked && <span className="size-2.5 md:size-3.5 rounded-full bg-primary" />}
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
                <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
                    {errors[group.name]}
                </FieldError>
            </div>
        );
    };

    const renderExtraField = (field) => {
        const value = extraValues[field.name] ?? "";

        let control = null;
        if (field.type === "text") {
            control = (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleExtraChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={fieldInputClass(false)}
                />
            );
        } else if (field.type === "select") {
            control = (
                <Select
                    options={field.options ?? []}
                    value={value}
                    onChange={(val) => handleExtraChange(field.name, val)}
                    placeholder={field.placeholder}
                    variant="pill"
                />
            );
        }

        return (
            <div key={field.name} className="relative w-full md:w-[calc(50%-15px)]">
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
        <section className="relative isolate bg-background py-[50] lg:py-[100]">
            <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden h-[84vw] lg:inset-0 lg:h-auto">
                <Image
                    src={mediaUrl(backgroundImage)}
                    alt={mediaAlt(backgroundImage)}
                    fill
                    className="object-cover object-top"
                />
            </div>

            <Container
                className="relative justify-between flex flex-col gap-[50] md:gap-[100] lg:gap-10 lg:flex-row lg:items-center lg:gap-16">
                <div className="lg:max-w-[555] mt-auto pb-0 lg:pb-[40]">
                    <SectionTitle
                        title={title}
                        titleColor={'text-foreground-fixed'}
                        variant={isMobileOrTablet ? 'center' : 'left'}
                    />
                </div>

                <ScrollReveal className="relative w-full lg:w-1/2 max-w-[715] mx-auto lg:mx-0">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="relative w-full rounded-[30] bg-black/60 p-5 pb-10 md:p-[30]"
                    >
                        <div className="flex flex-col">
                            <div className={'flex flex-wrap gap-5 md:gap-y-6 md:gap-2.5 lg:gap-y-6 lg:gap-x-3'}>
                                {form.fields.map(renderMainField)}
                            </div>

                            <div className={'flex flex-col gap-6 mt-6'}>
                                {form.radioGroups?.map(renderRadioGroup)}
                            </div>

                            <div className={'mt-10 pb-3 md:pb-6 border-b border-foreground-fixed/20'}>
                                {form.extraSection && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setExtraOpen((v) => !v)}
                                            className="flex flex-col md:flex-row w-full cursor-pointer items-center justify-between text-center md:text-left"
                                            aria-expanded={extraOpen}
                                        >
                                            <div
                                                className="font-heading text-center md:text-left leading-none font-bold text-base md:text-[22px] text-foreground-fixed">
                                                {form.extraSection.title}
                                            </div>
                                            <span className={'hidden md:block items-center'}>
                                                <span className={'text-primary text-xs md:hidden'}>
                                                    {extraOpen ? site.labels.collapse : site.labels.expand}
                                                </span>
                                                <span>
                                                    <Icon
                                                        name="arrow-down"
                                                        className={`size-7 shrink-0 text-primary transition-transform duration-300 ${extraOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </span>
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {extraOpen && (
                                                <motion.div
                                                    key="extra-fields"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{
                                                        height: { duration: 0.3, ease: "easeInOut" },
                                                        opacity: { duration: 0.2, ease: "easeOut" },
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <div
                                                        className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-[30] md:gap-2.5 lg:gap-y-6 lg:gap-x-7">
                                                        {form.extraSection.fields.map(renderExtraField)}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <button
                                            type="button"
                                            onClick={() => setExtraOpen((v) => !v)}
                                            className="flex md:hidden mt-5 flex-col md:flex-row w-full cursor-pointer items-center justify-between text-center md:text-left"
                                            aria-expanded={extraOpen}
                                        >
                                            <span className={'flex items-center'}>
                                                <span className={'text-foreground-fixed dark:text-primary text-xs md:hidden'}>
                                                    {extraOpen ? site.labels.collapse : site.labels.expand}
                                                </span>
                                                <span>
                                                    <Icon
                                                        name="arrow-down"
                                                        className={`size-7 shrink-0 text-foreground-fixed dark:text-primary transition-transform duration-300 ${extraOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div
                                className="mt-6 relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className={'relative pb-1'}>
                                    <label
                                        className="flex cursor-pointer justify-start items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed">
                                        <span
                                            className={`mt-0.5 p-1 flex size-5 md:size-7 shrink-0 items-center justify-center rounded border transition-colors ${errors.consent
                                                ? "border-primary"
                                                : consent
                                                    ? "border-primary bg-primary"
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
                                        <span>
                                            <span className={'inline'}>
                                                {form.consent.label}{" "}
                                            </span>
                                            <LegalLink
                                                slug={form.consent.slug}
                                                className="pb-px border-b hover:text-primary"
                                            >
                                                {form.consent.linkText}
                                            </LegalLink>
                                        </span>

                                    </label>
                                    <FieldError className="absolute bottom-[-20] left-0">
                                        {errors.consent}
                                    </FieldError>
                                </div>


                                <Button type="submit" className="shrink-0 w-full md:w-auto min-h-10 md:min-w-[180]">
                                    {form.submitLabel}
                                </Button>
                            </div>
                        </div>

                        <FormSuccessOverlay
                            open={submitted}
                            onClose={() => setSubmitted(false)}
                            message={form.successMessage}
                        />
                    </form>
                </ScrollReveal>
            </Container>
        </section>
    )
        ;
}
