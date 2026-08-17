// components/sections/CommercialSection.js
"use client";

import {useState} from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import PhoneInput, {getCleanPhone} from "@/components/ui/PhoneInput";
import Select from "@/components/ui/Select";
import FieldError from "@/components/ui/FieldError";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Link from "next/link";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

    const fieldInputClass = (hasError) =>
        `w-full rounded-full border bg-transparent text-foreground-fixed px-5 py-3 md:py-3.5 h-[44] md:h-[54] font-helvetica text-sm lg:text-base outline-none placeholder:text-foreground-fixed focus:placeholder:text-transparent transition-colors ${
            hasError ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
        }`;

    const renderField = (field) => {
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
            <div key={field.name} className={'min-w-0 lg:max-w-[320px] w-full relative'}>
                <label className="block text-sm lg:text-base font-helvetica font-bold text-foreground-fixed mb-2.5 lg:mb-3.5">
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
        <section className="relative py-[80] md:py-[90] lg:pt-[150] lg:pb-[60]">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image src={backgroundImage.path} alt={backgroundImage.alt} fill className="object-cover"/>
            </div>

            <Container className="relative flex flex-col justify-between">
               <div className={'w-full ml-0 lg:w-1/2 lg:ml-auto text-center lg:text-left '}>
                   <SectionTitle
                       variant={isMobileOrTablet ? 'center' : "left"}
                       mark={mark}
                       title={title}
                       subtitle={subtitle}
                       titleColor={'text-foreground-fixed'}
                       subtitleClass={`!mx-0 ${isMobileOrTablet ? 'text-center' : 'text-left'} !text-foreground-fixed`}
                   />

                   {cta && (
                       <Link
                           href={cta.link}
                           className="inline-block mt-7 lg:mt-3 text-lg text-foreground-fixed underline underline-offset-4 hover:text-primary transition-colors"
                       >
                           {cta.label}
                       </Link>
                   )}
               </div>

                <ScrollReveal stagger className="flex justify-center mt-[30] lg:mt-4 lg:justify-start gap-12">
                    {limitations.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3.5 max-w-[250px] lg:items-start lg:text-left">
                            <span className="shrink-0 size-[30] md:size-[50] rounded-full bg-primary flex items-center justify-center">
                                <Image src={item.image} width={40} height={40} className="text-white size-[25] md:size-[40]" alt={item.alt}/>
                            </span>
                            <p className="text-sm lg:text-lg font-helvetica text-foreground-fixed leading-tight whitespace-pre-line">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="mt-8 lg:mt-10 px-[25] py-[30] rounded-[30] w-full mx-auto lg:mx-0 max-w-[450] lg:max-w-none bg-black/60 p-6 lg:p-[50]"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-7">
                            <div className={'flex flex-col gap-5 min-w-0 flex-1 lg:flex-row lg:items-end lg:gap-6'}>
                                {form.fields.map(renderField)}
                            </div>
                            <Button type="submit" className="shrink-0 py-4 lg:ml-auto md:max-w-[213] mx-auto lg:mx-0 lg:max-w-none min-w-0 px-10 w-full mt-6 lg:mt-0 lg:w-auto lg:min-w-[200] xl:min-w-[260]">
                                {form.submitLabel}
                            </Button>
                        </div>
                        {submitted && (
                            <p className="absolute bottom-3 mt-4 text-base text-primary">
                                Спасибо! Заявка отправлена, мы скоро свяжемся с Вами.
                            </p>
                        )}
                    </form>
                </ScrollReveal>
            </Container>
        </section>
    );
}