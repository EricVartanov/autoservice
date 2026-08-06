// components/sections/CommercialSection.js
"use client";

import {useState} from "react";
import Image from "next/image";
import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import Select from "@/components/ui/Select";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Link from "next/link";

function validate({name, phoneDigits, carBrand}) {
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

    return errors;
}

export default function Commercial({data}) {
    const {mark, title, subtitle, cta, backgroundImage, limitations, form} = data;

    const [name, setName] = useState("");
    const [phoneDigits, setPhoneDigits] = useState("");
    const [carBrand, setCarBrand] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate({name, phoneDigits, carBrand});
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const payload = {
            name: name.trim(),
            phone: getCleanPhone(phoneDigits),
            carBrand,
        };
        // сюда позже уйдёт fetch на WP-эндпоинт
        console.log(payload);

        setSubmitted(true);
        setName("");
        setPhoneDigits("");
        setCarBrand("");
    };

    const carBrandField = form.fields.find((f) => f.name === "carBrand");
    const phoneField = form.fields.find((f) => f.name === "phone");

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent px-4 py-2.5 text-foreground text-sm outline-none placeholder:text-foreground-light/50 transition-colors ${
            hasError ? "border-red-500" : "border-white/20 focus:border-primary"
        }`;

    return (
        <section className="relative pt-[150] pb-[60]">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image src={backgroundImage.path} alt={backgroundImage.alt} fill className="object-cover"/>
            </div>

            <Container className="relative flex flex-col justify-between">
               <div className={'w-1/2 ml-auto'}>
                   <SectionTitle
                       variant="left"
                       mark={mark}
                       title={title}
                       subtitle={subtitle}
                       titleColor={'text-foreground-fixed'}
                       subtitleClass={'!mx-0 text-left !text-foreground-fixed'}
                   />

                   {cta && (
                       <Link
                           href={cta.link}
                           className="inline-block mt-3 text-lg text-foreground-fixed underline underline-offset-4 hover:text-primary transition-colors"
                       >
                           {cta.label}
                       </Link>
                   )}
               </div>

                <div className="flex flex-wrap gap-12 mt-4">
                    {limitations.map((item, i) => (
                        <div key={i} className="flex flex-col items-start gap-3.5 max-w-[250px]">
                            <span className="shrink-0 size-[50] rounded-full bg-primary flex items-center justify-center">
                                <Image src={item.image} width={40} height={40} className="text-white" alt={item.alt}/>
                            </span>
                            <p className="text-lg font-helvetica text-foreground-fixed leading-tight whitespace-pre-line">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-10 rounded-[30] bg-black/60 p-[50]"
                >
                    <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-6 pb-5">
                        <div className="relative flex-1 max-w-[320px]">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Как к Вам обращаться? <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="начните вводить"
                                className={fieldInputClass(!!errors.name)}
                            />
                            {errors.name && (
                                <p className="absolute left-0 top-full mt-1.5 text-xs text-red-500 whitespace-nowrap">{errors.name}</p>
                            )}
                        </div>

                        <div className="relative flex-1 min-w-[160px]">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Ваш номер телефона <span className="text-primary">*</span>
                            </label>
                            <PhoneInput
                                value={phoneDigits}
                                onChange={handlePhoneChange}
                                placeholder={phoneField?.placeholder ?? "+7 (098) 465 95 05"}
                                className={fieldInputClass(!!errors.phone)}
                            />
                            {errors.phone && (
                                <p className="absolute left-0 top-full mt-1.5 text-xs text-red-500 whitespace-nowrap">{errors.phone}</p>
                            )}
                        </div>

                        <div className="relative flex-1 min-w-[160px]">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Марка Вашего авто <span className="text-primary">*</span>
                            </label>
                            <Select
                                options={carBrandField?.options ?? []}
                                value={carBrand}
                                onChange={handleCarBrandChange}
                                placeholder={carBrandField?.placeholder ?? "выберите из списка"}
                                error={!!errors.carBrand}
                                variant="pill"
                            />
                            {errors.carBrand && (
                                <p className="absolute left-0 top-full mt-1.5 text-xs text-red-500 whitespace-nowrap">{errors.carBrand}</p>
                            )}
                        </div>

                        <Button type="submit" className="shrink-0 px-10 w-full md:w-auto">
                            {form.submitLabel}
                        </Button>
                    </div>
                </form>

                {submitted && (
                    <p className="mt-4 text-sm text-primary text-right">
                        Спасибо! Заявка отправлена, мы скоро свяжемся с Вами.
                    </p>
                )}
            </Container>
        </section>
    );
}