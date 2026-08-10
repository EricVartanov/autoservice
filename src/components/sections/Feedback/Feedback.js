"use client";

import {useState} from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import {Container} from "@/components/Container";

const cardGradient =
    "bg-[radial-gradient(circle_at_top_left,rgba(200,0,0,1)_0%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,0.8)_100%)]";

const cardGradient2 =
    "bg-[radial-gradient(circle_at_bottom_center,rgba(200,0,0,1)_0%,rgba(150,0,0,1)_40%,rgba(0,0,0,0.8)_75%,rgba(0,0,0,0.8)_100%)]";

function validate({name, phoneDigits, branch}) {
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

    return errors;
}

export default function Feedback({data}) {
    const {intro, title, manager, tires, form} = data;

    const [name, setName] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [branch, setBranch] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

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

        const validationErrors = validate({name, phoneDigits, branch});
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const payload = {
            name: name.trim(),
            phone: getCleanPhone(phoneDigits),
            branch,
            message: message.trim(),
        };
        // сюда позже уйдёт fetch на WP-эндпоинт
        console.log(payload);

        setName("");
        setPhoneDigits("");
        setBranch("");
        setMessage("");
    };

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent text-foreground-fixed px-5 py-3.5 font-helvetica text-base outline-none placeholder:text-foreground-fixed transition-colors ${
            hasError ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
        }`;

    return (
        <section className="relative bg-background-secondary py-[150] max-lg:py-20">
            <Container className="relative">
                <div className="relative z-[21] flex gap-5 justify-between max-lg:flex-col">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={`w-[calc(50%-10px)] max-lg:w-full relative z-10 flex flex-col rounded-[30] py-12 px-10 max-lg:px-6 max-lg:py-8 text-foreground-fixed ${cardGradient}`}
                    >
                        <p className="font-helvetica text-lg leading-tight text-foreground-light-fixed whitespace-break-spaces">
                            {intro}
                        </p>
                        <h2 className="mt-7 font-heading text-[34px] font-bold leading-none whitespace-break-spaces">
                            {title}
                        </h2>

                        <div className="mt-12 flex gap-7 max-lg:flex-col max-lg:gap-5">
                            {form.fields.map((field) => {
                                const hasError = !!errors[field.name];

                                return (
                                    <div
                                        key={field.name}
                                        className="relative w-full sm:w-[calc(50%-14px)] max-lg:sm:w-full"
                                    >
                                        <label className="mb-2.5 block font-helvetica text-base font-bold">
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
                                        {hasError && (
                                            <p className="absolute left-0 top-full mt-1.5 whitespace-nowrap text-xs text-primary">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative mt-6">
                            <p className="mb-4 font-helvetica text-base font-bold">
                                {form.branch.label}
                                {form.branch.required && (
                                    <span className="text-primary"> *</span>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-3">
                                {form.branch.options.map((opt) => {
                                    const checked = branch === opt.value;
                                    return (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-1.5 font-helvetica text-base"
                                        >
                                            <span
                                                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                                    errors.branch
                                                        ? "border-primary"
                                                        : checked
                                                          ? "border-primary"
                                                          : "border-white/40"
                                                }`}
                                            >
                                                {checked && (
                                                    <span className="size-3.5 rounded-full bg-primary" />
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
                            {errors.branch && (
                                <p className="absolute left-0 top-full mt-1.5 whitespace-nowrap text-xs text-primary">
                                    {errors.branch}
                                </p>
                            )}
                        </div>

                        <div className="mt-6">
                            <label className="mb-2.5 block font-helvetica text-base font-bold">
                                {form.message.label}
                            </label>
                            {form.message.hint && (
                                <p className="mb-3.5 font-helvetica text-base text-foreground-light-fixed">
                                    {form.message.hint}
                                </p>
                            )}
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={form.message.placeholder}
                                rows={4}
                                className="w-full resize-none rounded-[10] border border-white/20 bg-transparent px-5 py-3.5 font-helvetica text-base text-foreground-fixed outline-none placeholder:text-foreground-fixed focus:border-foreground-fixed"
                            />
                        </div>

                        <div className="mt-10 flex justify-end">
                            <Button type="submit" variant="primary">
                                {form.submitLabel}
                            </Button>
                        </div>
                    </form>

                    <div
                        className={`w-[calc(50%-10px)] max-lg:w-full max-h-[544] max-lg:max-h-[420] relative z-10 flex flex-col overflow-hidden rounded-[30] py-12 px-10 max-lg:px-6 ${cardGradient2}`}
                    >
                        <p className="z-10 font-heading leading-none text-[22px] whitespace-break-spaces text-foreground-fixed max-w-[230]">
                            {manager.title}
                        </p>
                        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 flex flex-1 items-end justify-center">
                            <Image
                                src={manager.photo.path}
                                alt={manager.photo.alt}
                                width={410}
                                height={517}
                                className="relative z-10 h-auto w-full object-contain object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </Container>
            {/*{tires?.path && (*/}
            {/*    <div className="pointer-events-none z-20 absolute w-full max-w-[860] right-[-12%] bottom-[-13%] max-lg:opacity-40 max-lg:max-w-[420] max-lg:right-[-8%] max-lg:bottom-[-5%]">*/}
            {/*        <Image*/}
            {/*            src={tires.path}*/}
            {/*            alt={tires.alt || ""}*/}
            {/*            width={750}*/}
            {/*            height={824}*/}
            {/*            className="h-auto w-full"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
        </section>
    );
}
