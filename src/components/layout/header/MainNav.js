'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {mockBranches} from '@/lib/mock-data';

export default function MainNav({data, isHome, collapsed}) {
    const [branchesOpen, setBranchesOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const branchesRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!branchesOpen) return;

        const onPointerDown = (e) => {
            if (!branchesRef.current?.contains(e.target)) {
                setBranchesOpen(false);
            }
        };

        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [branchesOpen]);

    useEffect(() => {
        if (!menuOpen) return;

        const onPointerDown = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="relative flex flex-col gap-4 pt-5 pb-4 text-lg text-foreground-fixed lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            {/* Logo + actions (< lg) */}
            <div className="flex items-center justify-between lg:hidden">
                <Link href="/">
                    <Image
                        src={data.logo.path}
                        alt={data.logo.alt}
                        width={343}
                        height={122}
                        className="h-auto w-28 max-md:w-24"
                    />
                </Link>

                <div className="flex items-center gap-3">
                    {data.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            className="transition hover:opacity-60"
                            aria-label={social.alt || social.name}
                        >
                            <Image
                                src={social.logo}
                                alt={social.alt}
                                width={60}
                                height={60}
                                className="size-[30px]"
                            />
                        </a>
                    ))}

                    {/* Tablet: Филиалы */}
                    <div className="relative hidden md:block" ref={branchesRef}>
                        <button
                            type="button"
                            onClick={() => setBranchesOpen((v) => !v)}
                            aria-expanded={branchesOpen}
                            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/40 px-4 py-2 text-base text-foreground-fixed transition hover:bg-white/5"
                        >
                            Филиалы
                            <span className="flex flex-col gap-1" aria-hidden>
                                <span className="block h-px w-4 bg-foreground-fixed"/>
                                <span className="block h-px w-4 bg-foreground-fixed"/>
                                <span className="block h-px w-4 bg-foreground-fixed"/>
                            </span>
                        </button>

                        {branchesOpen && (
                            <div className="absolute right-0 z-50 mt-2 min-w-[260px] rounded-[20px] border border-white/15 bg-black/95 p-3 shadow-lg backdrop-blur-sm">
                                <div className="flex flex-col gap-2">
                                    {mockBranches.map((branch) => (
                                        <a
                                            key={branch.id}
                                            href={`tel:${branch.phone.replace(/\D/g, '')}`}
                                            className="rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                            onClick={() => setBranchesOpen(false)}
                                        >
                                            <span className="block text-sm font-medium text-foreground-fixed">
                                                {branch.shortName}
                                            </span>
                                            <span className="mt-0.5 block text-xs text-white/60">
                                                {branch.phone}
                                            </span>
                                        </a>
                                    ))}
                                    {data.messengers.map((messenger) => (
                                        <a
                                            key={messenger.name}
                                            href={messenger.url}
                                            className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                            onClick={() => setBranchesOpen(false)}
                                        >
                                            <Image
                                                src={messenger.logo}
                                                alt={messenger.alt}
                                                width={60}
                                                height={60}
                                                className="size-[24px]"
                                            />
                                            <span className="text-sm text-foreground-fixed">
                                                {messenger.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile: burger */}
                    <div className="relative md:hidden" ref={menuRef}>
                        <button
                            type="button"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                            className="flex cursor-pointer flex-col gap-1.5 p-1"
                        >
                            <span className="block h-px w-5 bg-foreground-fixed"/>
                            <span className="block h-px w-5 bg-foreground-fixed"/>
                            <span className="block h-px w-5 bg-foreground-fixed"/>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 z-50 mt-3 w-[min(280px,calc(100vw-2.5rem))] rounded-[20px] border border-white/15 bg-black/95 p-4 shadow-lg backdrop-blur-sm">
                                <ul className="flex flex-col gap-3 text-base">
                                    {data.menu.map((item) => (
                                        <li key={item.link}>
                                            <Link
                                                href={item.link}
                                                className="block transition-colors hover:text-white/70"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 border-t border-white/15 pt-4">
                                    <p className="mb-2 text-xs uppercase tracking-wide text-white/50">
                                        Филиалы
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {mockBranches.map((branch) => (
                                            <a
                                                key={branch.id}
                                                href={`tel:${branch.phone.replace(/\D/g, '')}`}
                                                className="rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                                onClick={closeMenu}
                                            >
                                                <span className="block text-sm font-medium text-foreground-fixed">
                                                    {branch.shortName}
                                                </span>
                                                <span className="mt-0.5 block text-xs text-white/60">
                                                    {branch.phone}
                                                </span>
                                            </a>
                                        ))}
                                        {data.messengers.map((messenger) => (
                                            <a
                                                key={messenger.name}
                                                href={messenger.url}
                                                className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                                onClick={closeMenu}
                                            >
                                                <Image
                                                    src={messenger.logo}
                                                    alt={messenger.alt}
                                                    width={60}
                                                    height={60}
                                                    className="size-[24px]"
                                                />
                                                <span className="text-sm text-foreground-fixed">
                                                    {messenger.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop collapsed logo */}
            {(collapsed || !isHome) && (
                <Link href="/" className="hidden lg:block">
                    <Image
                        src={data.logo.path}
                        alt={data.logo.alt}
                        width={343}
                        height={122}
                        className="h-auto w-32"
                    />
                </Link>
            )}

            {/* Menu row: tablet + desktop (hidden on mobile) */}
            <ul className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white md:flex max-lg:justify-start sm:gap-x-5 lg:gap-7 lg:text-lg">
                {data.menu.map((item) => (
                    <li key={item.link}>
                        <Link href={item.link} className="transition-colors hover:text-white/70">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop messengers + socials */}
            <div className="hidden items-center justify-center gap-10 lg:flex">
                <div className="flex items-center gap-4">
                    {data.messengers.map((messenger) => (
                        <a
                            key={messenger.name}
                            href={messenger.url}
                            className="flex items-center gap-2.5 transition hover:opacity-60"
                        >
                            <Image
                                src={messenger.logo}
                                alt={messenger.alt}
                                width={60}
                                height={60}
                                className="size-[30px]"
                            />
                            <span className="relative before:absolute before:bottom-[3] before:h-[1] before:w-full before:bg-foreground-fixed">
                                {messenger.name}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {data.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            className="transition hover:opacity-60"
                        >
                            <Image
                                src={social.logo}
                                alt={social.alt}
                                width={60}
                                height={60}
                                className="size-[30px]"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
