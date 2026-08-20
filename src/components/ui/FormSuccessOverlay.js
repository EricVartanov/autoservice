"use client";

import {useEffect, useRef} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import Icon from "@/components/icons/Icon";

const DEFAULT_MESSAGE = "Данные успешно отправлены.\nНаш менеджер свяжется с вами\nв ближайшее время";
const DEFAULT_DURATION = 4500;

export default function FormSuccessOverlay({
    open,
    onClose,
    message = DEFAULT_MESSAGE,
    duration = DEFAULT_DURATION,
    cardClassName,
}) {
    const reduceMotion = useReducedMotion();
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return;

        const timeoutId = setTimeout(() => {
            onCloseRef.current?.();
        }, duration);

        return () => clearTimeout(timeoutId);
    }, [open, duration]);

    const fade = {duration: reduceMotion ? 0 : 0.25};

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={fade}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-[inherit] bg-black/60 px-5 py-4 backdrop-blur-sm md:px-8"
                >
                    <div className={`flex flex-col items-center gap-3 rounded-[20] bg-background px-8 text-center md:rounded-[30] md:px-12 ${cardClassName ?? "py-10 md:py-12"}`}>
                        <Icon name="double-tick" className="size-10 text-[#40B700]" />
                        <p className="font-helvetica text-sm font-bold whitespace-pre-line text-foreground md:text-base lg:text-lg">
                            {message}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
