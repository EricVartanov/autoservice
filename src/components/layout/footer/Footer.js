'use client';

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Container} from "@/components/Container";
import LegalLink from "@/components/ui/LegalLink";
import {mockFooter, mockBranches, site} from "@/lib/mock-data";
import Icon from "@/components/icons/Icon";
import {scrollToTop} from "@/lib/scrollToSection";
import {mediaAlt, mediaUrl} from "@/lib/media";

export default function Footer({data = mockFooter}) {
    const {logo, logoDark, copyright, legal, socials} = data;
    const pathname = usePathname();
    const isNews = pathname === '/news' || pathname.startsWith('/news/');

    return (
        <footer
            className={`relative z-10 pb-[30] md:pb-20 ${
                isNews ? 'bg-background' : 'bg-background-secondary'
            }`}
        >
            <Container className={'relative'}>
                <div className="absolute right-5 md:right-20 lg:right-10 bottom-0 lg:top-1/2 lg:-translate-y-1/2 z-50">
                    <button
                        type="button"
                        aria-label={site.labels.backToTop}
                        onClick={() => scrollToTop()}
                        className="flex size-10 md:size-[40] lg:size-[54] cursor-pointer items-center justify-center rounded-full bg-primary text-foreground-fixed dark:bg-white dark:text-black"
                    >
                        <Icon name="arrow-down" className="size-6 md:size-8 rotate-180" />
                    </button>
                </div>
                <div className="flex justify-center">
                    {logo && (
                        <>
                            <Image
                                src={mediaUrl(logo)}
                                alt={mediaAlt(logo)}
                                width={420}
                                height={160}
                                loading="eager"
                                className="h-auto dark:hidden w-[172] lg:w-[410] z-50"
                            />
                            {logoDark && (
                                <Image
                                    src={mediaUrl(logoDark)}
                                    alt={mediaAlt(logoDark)}
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

                <div className="mt-5 lg:mt-6 flex flex-col items-center gap-6 text-center text-sm md:text-lg font-helvetica text-foreground lg:flex-row lg:items-stretch lg:justify-between lg:gap-0 lg:text-left">
                    <p className="order-2 shrink-0 text-foreground-light lg:order-none">{copyright} {new Date().getFullYear()}</p>

                    <div className="order-1 flex flex-col gap-3 lg:order-none md:flex-row lg:justify-between lg:gap-8 xl:gap-[97]">
                        {legal?.map((item) => (
                            <LegalLink
                                key={item.label}
                                slug={item.slug}
                                className="underline underline-offset-2 transition hover:text-foreground"
                            >
                                {item.label}
                            </LegalLink>
                        ))}
                    </div>

                    <div className="order-3 flex flex-wrap items-center justify-center gap-6 lg:order-none lg:justify-between lg:gap-8 xl:gap-[130]">
                        <div className={'flex flex-wrap items-center justify-center gap-2.5 lg:flex-nowrap lg:justify-start'}>
                            {mockBranches.map((branch) => (
                                <Link
                                    key={branch.id}
                                    href={branch.messenger.url}
                                    className="flex items-center gap-2 transition hover:text-foreground"
                                >
                                    {branch.footerLogo && (
                                        <>
                                            <Image
                                                src={mediaUrl(branch.footerLogo)}
                                                alt=""
                                                width={30}
                                                height={30}
                                                className="size-5 md:size-7 shrink-0 dark:hidden"
                                            />
                                            {branch.footerLogoDark && (
                                                <Image
                                                    src={mediaUrl(branch.footerLogoDark)}
                                                    alt=""
                                                    width={30}
                                                    height={30}
                                                    className="hidden size-5 md:size-7 shrink-0 dark:block"
                                                />
                                            )}
                                        </>
                                    )}
                                    <span className="underline underline-offset-2 lg:no-underline">{branch.shortName}</span>
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
                                    src={mediaUrl(social.logo)}
                                    alt={mediaAlt(social.logo, social.alt || social.name)}
                                    width={24}
                                    height={24}
                                    className="size-[30] md:size-6 dark:hidden"
                                />
                                {social.logoDark && (
                                    <Image
                                        src={mediaUrl(social.logoDark)}
                                        alt={mediaAlt(social.logoDark, social.alt || social.name)}
                                        width={24}
                                        height={24}
                                        className="hidden size-[30] md:size-6 dark:block"
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
