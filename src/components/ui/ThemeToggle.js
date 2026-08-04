'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Icon from '@/components/icons/Icon';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Переключить тему"
            className={`w-full h-full flex justify-center items-center cursor-pointer rounded-full border border-border p-2 transition-colors ${
                isDark ? 'bg-black/20' : 'bg-white/20'
            }`}
        >
            <span className={`w-[54] h-[54] flex justify-center items-center rounded-full transition-colors ${
                isDark
                    ? 'bg-primary text-foreground-fixed'
                    : 'bg-foreground-fixed text-primary'
            }`}>
                <Icon
                    name={isDark ? 'moon' : 'sun'}
                    className={`w-10 h-10 transition-colors`}
                />
            </span>
        </button>
    );
}