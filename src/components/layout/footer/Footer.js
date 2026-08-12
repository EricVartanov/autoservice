'use client';

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Container} from "@/components/Container";
import {mockFooter} from "@/lib/mock-data";

export default function Footer({data = mockFooter}) {
    const {logo, logoDark, copyright, legal, branches, socials} = data;
    const pathname = usePathname();
    const isNews = pathname === '/news' || pathname.startsWith('/news/');

    return (
        <footer
            className={`relative z-10 pb-20 ${
                isNews ? 'bg-background' : 'bg-background-secondary'
            }`}
        >
            <Container>
                <div className="flex justify-center">
                    {logo && (
                        <>
                            <Image
                                src={logo.path}
                                alt={logo.alt}
                                width={420}
                                height={160}
                                loading="eager"
                                className="h-auto dark:hidden w-[172] lg:w-[410] z-50"
                            />
                            {logoDark && (
                                <Image
                                    src={logoDark.path}
                                    alt={logoDark.alt}
                                    width={420}
                                    height={160}
                                    loading="eager"
                                    className="hidden h-auto dark:block w-[172] lg:w-[410] z-50"
                                />
                            )}
                        </>
                    )}
                </div>

                <hr className="mt-[30] border-0 border-t border-foreground/20 lg:mt-12" />

                <div className="mt-5 lg:mt-6 flex flex-col items-center gap-6 text-center text-lg font-helvetica text-foreground lg:flex-row lg:items-stretch lg:justify-between lg:gap-0 lg:text-left">
                    <p className="order-2 shrink-0 text-foreground-light lg:order-none">{copyright} {new Date().getFullYear()}</p>

                    <div className="order-1 flex flex-col gap-3 lg:order-none md:flex-row lg:justify-between lg:gap-8 xl:gap-[97]">
                        {legal?.map((item) => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className="underline underline-offset-2 transition hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="order-3 flex flex-wrap items-center justify-center gap-6 lg:order-none lg:justify-between lg:gap-8 xl:gap-[130]">
                        <div className={'flex flex-wrap items-center justify-center gap-2.5 lg:flex-nowrap lg:justify-start'}>
                            {branches?.map((branch) => (
                                <Link
                                    key={branch.label}
                                    href={branch.link}
                                    className="flex items-center gap-2 transition hover:text-foreground"
                                >
                                    {branch.logo && (
                                        <>
                                            <Image
                                                src={branch.logo}
                                                alt=""
                                                width={30}
                                                height={30}
                                                className="size-7 shrink-0 dark:hidden"
                                            />
                                            {branch.logoDark && (
                                                <Image
                                                    src={branch.logoDark}
                                                    alt=""
                                                    width={30}
                                                    height={30}
                                                    className="hidden size-7 shrink-0 dark:block"
                                                />
                                            )}
                                        </>
                                    )}
                                    <span className="underline underline-offset-2 lg:no-underline">{branch.label}</span>
                                </Link>
                            ))}
                        </div>

                        {socials?.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition hover:opacity-80"
                                aria-label={social.alt || social.name}
                            >
                                <Image
                                    src={social.logo}
                                    alt={social.alt || social.name}
                                    width={24}
                                    height={24}
                                    className="size-6 dark:hidden"
                                />
                                {social.logoDark && (
                                    <Image
                                        src={social.logoDark}
                                        alt={social.alt || social.name}
                                        width={24}
                                        height={24}
                                        className="hidden size-6 dark:block"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
