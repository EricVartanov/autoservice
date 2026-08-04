'use client';

import { motion } from 'framer-motion';

export default function HeroStats({ stats }) {
    return (
        <div className="flex pl-10 flex-col gap-12 shrink-0 border-l border-l-foreground-fixed">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                    <div className="font-heading leading-none font-bold text-primary-light text-[68px]">
                        {stat.value}
                    </div>
                    <div className="text-foreground-fixed font-sans text-lg">{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
}