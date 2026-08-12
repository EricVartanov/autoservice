"use client";

import {AnimatePresence, motion} from "framer-motion";
import Icon from "@/components/icons/Icon";

export default function FaqItem({index, question, answer, isOpen, onToggle}) {
    const number = String(index + 1).padStart(2, "0");

    return (
        <div className="border-b border-foreground/15">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-helvetica text-foreground leading-snug">
                    {number}. {question}
                </span>
                <Icon
                    name="arrow-down"
                    className={`size-7 shrink-0 text-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{
                            height: {duration: 0.3, ease: "easeInOut"},
                            opacity: {duration: 0.2, ease: "easeOut"},
                        }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 pr-10 text-lg font-helvetica leading-6 text-foreground-light">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
