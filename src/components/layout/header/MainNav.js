'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {mockBranches, site} from '@/lib/mock-data';
import {getHashId, scrollToSection} from '@/lib/scrollToSection';
import {mediaAlt, mediaUrl} from '@/lib/media';

function MenuToggleIcon({open}) {
    return (
        <span className="relative block size-5" aria-hidden>
            <span
                className={`absolute left-0 top-1 block h-px w-5 origin-center bg-current transition-transform duration-300 ${
                    open ? 'translate-y-1.5 rotate-45' : ''
                }`}
            />
            <span
                className={`absolute left-0 top-2.5 block h-px w-5 bg-current transition-opacity duration-300 ${
                    open ? 'opacity-0' : ''
                }`}
            />
            <span
                className={`absolute left-0 top-4 block h-px w-5 origin-center bg-current transition-transform duration-300 ${
                    open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
            />
        </span>
    );
}

export default function MainNav({data, isHome, collapsed}) {
    const pathname = usePathname();
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

    const handleNavClick = (e, href) => {
        const id = getHashId(href);
        if (!id) {
            closeMenu();
            return;
        }

        // On home: smooth-scroll in place instead of full navigation
        if (pathname === '/') {
            e.preventDefault();
            scrollToSection(id);
            window.history.pushState(null, '', `/#${id}`);
        }

        closeMenu();
    };

    return (
        <nav className="relative flex flex-col gap-5 xl:gap-4 pt-5 md:pt-2 pb-4 md:pb-2 xl:pt-2 xl:pb-2 text-lg text-foreground-fixed lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            {/* Logo + actions (< lg) */}
            <div className="flex items-center justify-between lg:hidden">
                <Link href="/">
                    <Image
                        src={mediaUrl(data.logo)}
                        alt={mediaAlt(data.logo)}
                        width={343}
                        height={122}
                        loading="eager"
                        className="h-auto w-24 md:w-36"
                    />
                </Link>

                <div className="flex items-center gap-5 md:gap-7">
                    {data.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            className="transition hover:opacity-60"
                            aria-label={social.alt || social.name}
                        >
                            <Image
                                src={mediaUrl(social.logo)}
                                alt={mediaAlt(social.logo, social.alt)}
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
                            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-foreground-fixed px-8 py-1.5 text-base text-foreground-fixed transition hover:bg-white/5"
                        >
                            {site.labels.branches}
                            <MenuToggleIcon open={branchesOpen} />
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
                                    {mockBranches.map((branch) => (
                                        <a
                                            key={`msg-${branch.id}`}
                                            href={branch.messenger.url}
                                            className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                            onClick={() => setBranchesOpen(false)}
                                        >
                                            <Image
                                                src={mediaUrl(branch.messenger.logo)}
                                                alt={mediaAlt(branch.messenger.logo, branch.messenger.alt)}
                                                width={60}
                                                height={60}
                                                className="size-[24px]"
                                            />
                                            <span className="text-sm text-foreground-fixed">
                                                {branch.shortName}
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
                            aria-label={menuOpen ? site.labels.closeMenu : site.labels.openMenu}
                            className="flex cursor-pointer items-center justify-center p-1"
                        >
                            <MenuToggleIcon open={menuOpen} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 z-50 mt-3 w-[min(280px,calc(100vw-2.5rem))] rounded-[20px] border border-white/15 bg-black/95 p-4 shadow-lg backdrop-blur-sm">
                                <ul className="flex flex-col gap-3 text-base">
                                    {data.menu.map((item) => (
                                        <li key={item.link}>
                                            <Link
                                                href={item.link}
                                                className="block transition-colors hover:text-white/70"
                                                onClick={(e) => handleNavClick(e, item.link)}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 border-t border-white/15 pt-4">
                                    <p className="mb-2 text-xs uppercase tracking-wide text-white/50">
                                        {site.labels.branches}
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
                                        {mockBranches.map((branch) => (
                                            <a
                                                key={`msg-${branch.id}`}
                                                href={branch.messenger.url}
                                                className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 transition hover:bg-white/5"
                                                onClick={closeMenu}
                                            >
                                                <Image
                                                    src={mediaUrl(branch.messenger.logo)}
                                                    alt={mediaAlt(branch.messenger.logo, branch.messenger.alt)}
                                                    width={60}
                                                    height={60}
                                                    className="size-[24px]"
                                                />
                                                <span className="text-sm text-foreground-fixed">
                                                    {branch.shortName}
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

            {/* Logo + menu: tablet + desktop (hidden on mobile) */}
            <div className={`hidden items-center md:flex ${collapsed || !isHome ? 'lg:gap-6 xl:gap-7 ' : ''}`}>
                {/* Desktop collapsed logo */}
                <Link
                    href="/"
                    className={`hidden overflow-hidden transition-all duration-500 ease-out lg:block ${
                        collapsed || !isHome
                            ? 'max-w-32 opacity-100 scale-100'
                            : 'pointer-events-none max-w-0 opacity-0 scale-95'
                    }`}
                    tabIndex={collapsed || !isHome ? undefined : -1}
                    aria-hidden={!(collapsed || !isHome)}
                >
                    <Image
                        src={mediaUrl(data.logo)}
                        alt={mediaAlt(data.logo)}
                        width={343}
                        height={122}
                        loading="eager"
                        className="h-auto w-32 max-w-none"
                    />
                </Link>

                <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-fixed sm:gap-x-5 lg:gap-6 xl:gap-7 lg:text-base xl:text-lg">
                    {data.menu.map((item) => (
                        <li key={item.link}>
                            <Link
                                href={item.link}
                                className="transition-colors hover:text-white/70"
                                onClick={(e) => handleNavClick(e, item.link)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Desktop messengers + socials */}
            <div className="hidden items-center justify-center lg:gap-[90] lg:flex">
                <div className="flex items-center gap-4">
                    {mockBranches.map((branch) => (
                        <a
                            key={branch.id}
                            href={branch.messenger.url}
                            className="flex items-center gap-2.5 transition hover:opacity-60"
                        >
                            <Image
                                src={mediaUrl(branch.messenger.logo)}
                                alt={mediaAlt(branch.messenger.logo, branch.messenger.alt)}
                                width={60}
                                height={60}
                                className="size-[30px]"
                            />
                            <span className="relative before:absolute before:bottom-[3] before:h-[1] before:w-full before:bg-foreground-fixed lg:text-base xl:text-lg">
                                {branch.shortName}
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
                                src={mediaUrl(social.logo)}
                                alt={mediaAlt(social.logo, social.alt)}
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
