'use client';

import { motion } from 'framer-motion';

export default function HeroStats({ stats, compact = false, layout = 'col' }) {
    if (layout === 'row') {
        return (
            <div className="flex shrink-0 items-stretch gap-5 border-l border-l-foreground-fixed pl-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className={i > 0 ? 'border-l border-l-foreground-fixed/40 pl-5' : ''}
                    >
                        <div className="font-heading text-[36px] leading-none font-bold text-primary-light">
                            {stat.value}
                        </div>
                        <div className="mt-1 text-sm text-foreground-fixed font-sans">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={`flex shrink-0 flex-col border-l border-l-foreground-fixed ${
                compact ? 'gap-6 pl-5' : 'gap-12 pl-10'
            }`}
        >
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                    <div
                        className={`font-heading leading-none font-bold text-primary-light ${
                            compact ? 'text-[42px]' : 'text-[68px]'
                        }`}
                    >
                        {stat.value}
                    </div>
                    <div
                        className={`text-foreground-fixed font-sans ${
                            compact ? 'text-sm' : 'text-lg'
                        }`}
                    >
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
