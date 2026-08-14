'use client';

import { motion } from 'framer-motion';

export default function HeroStats({ stats,}) {
    return (
        <div
            className={`flex shrink-0 md:flex-col border-l-2 border-l-foreground-fixed gap-[18] lg:gap-[clamp(20px,4.4vh,48px)] pl-[18] lg:pl-10`}
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
                        className={`font-heading leading-none font-bold text-primary-light text-[28px] md:text-[clamp(32px,4.6vh,48px)] lg:text-[clamp(40px,6.3vh,68px)]`}
                    >
                        {stat.value}
                    </div>
                    <div
                        className={`text-foreground-fixed font-sans text-sm lg:text-lg md:mt-2.5`}
                    >
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
