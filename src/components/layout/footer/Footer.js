import Image from "next/image";
import Link from "next/link";
import {Container} from "@/components/Container";
import {mockFooter} from "@/lib/mock-data";

export default function Footer({data = mockFooter}) {
    const {logo, logoDark, copyright, legal, branches, socials} = data;

    return (
        <footer className="relative z-10 bg-background-secondary pb-20">
            <Container>
                <div className="flex justify-center">
                    {logo && (
                        <>
                            <Image
                                src={logo.path}
                                alt={logo.alt}
                                width={420}
                                height={160}
                                className="h-auto dark:hidden lg:w-[410]"
                            />
                            {logoDark && (
                                <Image
                                    src={logoDark.path}
                                    alt={logoDark.alt}
                                    width={420}
                                    height={160}
                                    className="hidden h-auto dark:block lg:w-[410]"
                                />
                            )}
                        </>
                    )}
                </div>

                <hr className="mt-10 border-0 border-t border-foreground/20 md:mt-12" />

                <div className="mt-6 flex text-lg font-helvetica text-foreground justify-between max-lg:flex-col max-lg:items-center max-lg:gap-6 max-lg:text-center">
                    <p className="shrink-0 text-foreground-light max-lg:order-3">{copyright} {new Date().getFullYear()}</p>

                    <div className="flex justify-between gap-8 max-lg:flex-col max-lg:gap-3 max-lg:order-1 xl:gap-[97]">
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

                    <div className="flex flex-wrap items-center justify-between gap-8 max-lg:justify-center max-lg:gap-6 max-lg:order-2 xl:gap-[130]">
                        <div className={'flex items-center gap-2.5 max-lg:flex-wrap max-lg:justify-center'}>
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
                                    <span className="max-lg:underline max-lg:underline-offset-2">{branch.label}</span>
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
