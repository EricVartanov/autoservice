'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useActiveSection } from '@/hooks/useActiveSection';

const THEME_COLOR = {
    light: '#000000',
    dark: '#ffffff',
};

const numberVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

/**
 * Fixed vertical section indicator (desktop only).
 * @param {{ sections: { id: string; theme: 'light' | 'dark' }[] }} props
 */
export default function SectionIndicator({ sections }) {
    const { resolvedTheme } = useTheme();
    const { index, theme } = useActiveSection(sections);
    const label = String(index + 1).padStart(2, '0');
    // In site dark mode theme-aware sections become black — always use light indicator
    const effectiveTheme = resolvedTheme === 'dark' ? 'dark' : theme;
    const color = THEME_COLOR[effectiveTheme] ?? THEME_COLOR.dark;
    console.log(sections)
    return (
        <motion.div
            className="pointer-events-none fixed top-[30%] right-[9%] z-40 hidden flex-col items-center gap-2.5 lg:flex"
            animate={{ color }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-hidden
        >
            <div className="h-5 w-px bg-current opacity-50" />
            <div className="relative flex h-5 w-5 items-center justify-center overflow-visible">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={index}
                        variants={numberVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute text-lg font-helvetica leading-none tracking-widest -rotate-90 whitespace-nowrap"
                    >
                        {label}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="h-18 w-px bg-current" />
        </motion.div>
    );
}
