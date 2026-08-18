"use client";

import {useState} from "react";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import WaveTitle from "@/components/ui/WaveTitle";
import FieldError from "@/components/ui/FieldError";
import LegalLink from "@/components/ui/LegalLink";
import {Container} from "@/components/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FormSuccessOverlay from "@/components/ui/FormSuccessOverlay";
import {mediaAlt, mediaUrl} from "@/lib/media";

const cardGradient =
    "bg-[radial-gradient(circle_at_top_left,rgba(200,0,0,1)_0%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,0.8)_100%)]";

const cardGradient2 =
    "bg-[radial-gradient(circle_at_bottom_center,rgba(200,0,0,1)_0%,rgba(150,0,0,1)_40%,rgba(0,0,0,0.8)_75%,rgba(0,0,0,0.8)_100%)]";


const cardGradient3 =
    "bg-[linear-gradient(316deg,rgba(255,0,0,1)_0%,rgba(0,0,0,1)_100%)]";

function validate({name, phoneDigits, branch, consent}) {
    const errors = {};

    if (!name.trim()) {
        errors.name = "Введите имя";
    } else if (name.trim().length < 2) {
        errors.name = "Слишком короткое имя";
    }

    if (phoneDigits.length < 10) {
        errors.phone = "Введите номер полностью";
    }

    if (!branch) {
        errors.branch = "Выберите филиал";
    }

    if (!consent) {
        errors.consent = "Необходимо согласие";
    }

    return errors;
}

export default function Feedback({data}) {
    const {intro, title, manager, tires, form} = data;

    const [name, setName] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [branch, setBranch] = useState("");
    const [message, setMessage] = useState("");
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

        const validationErrors = validate({name, phoneDigits, branch, consent});
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const payload = {
            name: name.trim(),
            phone: getCleanPhone(phoneDigits),
            branch,
            message: message.trim(),
            consent,
        };
        // сюда позже уйдёт fetch на WP-эндпоинт
        console.log(payload);

        setSubmitted(true);
        setName("");
        setPhoneDigits("");
        setBranch("");
        setMessage("");
        setConsent(false);
    };

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent text-foreground-fixed px-5 h-[44] md:h-[54] py-2.5 md:py-3.5 font-helvetica text-sm md:text-base outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent transition-colors ${
            hasError ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
        }`;

    return (
        <section className="relative bg-background-secondary pb-[35] md:pb-[150] pt-20 lg:py-[150]">
            <Container className="relative z-50">
                <ScrollReveal stagger className="relative z-20 flex flex-col gap gap-2.5 lg:gap-10 lg:flex-row lg:justify-between">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={`w-full lg:w-[calc(50%-10px)] relative z-10 flex flex-col rounded-[30] py-[50] px-2.5 md:py-12 md:px-10 text-foreground-fixed ${cardGradient}`}
                    >
                        <p className="font-helvetica text-center lg:text-left text-sm md:text-lg leading-tight text-foreground-light-fixed whitespace-break-spaces">
                            {intro}
                        </p>
                        <WaveTitle as="h2" className="mt-5 text-center lg:text-left font-heading text-[25px] md:text-[34px] font-bold whitespace-break-spaces">
                            {title}
                        </WaveTitle>

                        <div className="mt-10 md:mt-12 flex flex-col gap-5 md:gap-2.5 md:flex-row lg:gap-7">
                            {form.fields.map((field) => {
                                const hasError = !!errors[field.name];

                                return (
                                    <div
                                        key={field.name}
                                        className="relative w-full md:w-[calc(50%-5px)] lg:w-[calc(50%-14px)]"
                                    >
                                        <label className="mb-2.5 block font-helvetica text-sm md:text-base font-bold">
                                            {field.label}
                                            {field.required && (
                                                <span className="text-primary"> *</span>
                                            )}
                                        </label>
                                        {field.type === "tel" ? (
                                            <PhoneInput
                                                value={phoneDigits}
                                                onChange={(digits) => {
                                                    setPhoneDigits(digits);
                                                    clearError("phone");
                                                }}
                                                placeholder={field.placeholder}
                                                className={fieldInputClass(hasError)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    clearError("name");
                                                }}
                                                placeholder={field.placeholder}
                                                className={fieldInputClass(hasError)}
                                            />
                                        )}
                                        <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
                                            {errors[field.name]}
                                        </FieldError>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative mt-6">
                            <p className="mb-4 max-w-[80%] md:max-w-none font-helveticatext-sm md:text-base font-bold">
                                {form.branch.label}
                                {form.branch.required && (
                                    <span className="text-primary"> *</span>
                                )}
                            </p>
                            <div className="flex justify-start flex-wrap gap-x-5 gap-y-3">
                                {form.branch.options.map((opt) => {
                                    const checked = branch === opt.value;
                                    return (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-1.5 font-helvetica text-sm md:text-base"
                                        >
                                            <span
                                                className={`flex size-5 md:size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                                    errors.branch
                                                        ? "border-primary"
                                                        : checked
                                                          ? "border-primary"
                                                          : "border-white/40"
                                                }`}
                                            >
                                                {checked && (
                                                    <span className="size-2.5 md:size-3.5 rounded-full bg-primary" />
                                                )}
                                            </span>
                                            <input
                                                type="radio"
                                                name={form.branch.name}
                                                value={opt.value}
                                                checked={checked}
                                                onChange={() => {
                                                    setBranch(opt.value);
                                                    clearError("branch");
                                                }}
                                                className="sr-only"
                                            />
                                            {opt.label}
                                        </label>
                                    );
                                })}
                            </div>
                            <FieldError className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
                                {errors.branch}
                            </FieldError>
                        </div>

                        <div className="mt-6">
                            <label className="mb-2.5 block font-helvetica text-sm md:text-base font-bold">
                                {form.message.label}
                            </label>
                            {form.message.hint && (
                                <p className="mb-3.5 font-helvetica  text-sm md:text-base text-foreground-light-fixed">
                                    {form.message.hint}
                                </p>
                            )}
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={form.message.placeholder}
                                rows={4}
                                className="w-full resize-none rounded-[10] border border-white/20 bg-transparent px-5 py-2.5 md:py-3.5 font-helvetica text-sm md:text-base text-foreground-fixed outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent focus:border-foreground-fixed"
                            />
                        </div>

                        <div className="mt-5 relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="relative pb-1">
                                <label
                                    className="flex cursor-pointer justify-start items-center gap-2.5 font-helvetica text-sm md:text-base text-foreground-fixed"
                                >
                                    <span
                                        className={`mt-0.5 p-1 flex size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                                            errors.consent
                                                ? "border-primary"
                                                : consent
                                                    ? "border-primary bg-primary"
                                                    : "border-[#c4c4c4]"
                                        }`}
                                    >
                                        {consent && (
                                            <Icon name="square" className="size-5 md:size-6"/>
                                        )}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={consent}
                                        onChange={(e) => {
                                            setConsent(e.target.checked);
                                            clearError("consent");
                                        }}
                                        className="sr-only"
                                    />
                                    <span>
                                        <span className="inline">
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

                            <Button type="submit" variant="primary" className="shrink-0 w-full min-h-10 md:w-auto">
                                {form.submitLabel}
                            </Button>
                        </div>
                        <FormSuccessOverlay
                            open={submitted}
                            onClose={() => setSubmitted(false)}
                        />
                    </form>

                    <div
                        className={`w-full min-h-[230] md:max-w-2xl md:mx-auto lg:max-w-none lg:mx-0 lg:w-[calc(50%-10px)] md:min-h-[317] lg:min-h-auto lg:max-h-[544] relative z-10 flex flex-col overflow-hidden rounded-[30] py-5 px-3.5 md:py-12 md:px-6 lg:px-10 ${cardGradient3} lg:${cardGradient2}`}
                    >
                        <p className="z-10 font-heading leading-none text-lg md:text-[22px] whitespace-break-spaces text-foreground-fixed max-w-[230]">
                            {manager.title}
                        </p>
                        <div className="absolute w-[150] md:w-[250] lg:w-[410] z-10 right-0 md:right-[10%] lg:right-auto lg:left-1/2 lg:-translate-x-1/2 bottom-0 flex flex-1 items-end justify-center">
                            <Image
                                src={mediaUrl(manager.photo)}
                                alt={mediaAlt(manager.photo)}
                                width={410}
                                height={517}
                                className="relative max-w-[410] z-10 h-auto w-full"
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
            {mediaUrl(tires) && (
                <div
                    className="pointer-events-none mx-auto z-30 relative md:absolute md:right-0 md:bottom-[-5%] lg:bottom-[-8%] w-full max-w-[240] md:max-w-[320] md:overflow-hidden lg:max-w-[620]"
                >
                    <Image
                        src={mediaUrl(tires)}
                        alt={mediaAlt(tires)}
                        width={750}
                        height={824}
                        className="h-auto w-[250] md:w-[140%] max-w-none md:-mr-[20%] lg:w-[125%] lg:-mr-[10%]"
                    />
                </div>
            )}
        </section>
    );
}
