"use client";

import {useEffect, useRef} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

const DEFAULT_MESSAGE = "Спасибо! Заявка отправлена, мы скоро свяжемся с Вами.";
const DEFAULT_DURATION = 4500;

export default function FormSuccessOverlay({
    open,
    onClose,
    message = DEFAULT_MESSAGE,
    duration = DEFAULT_DURATION,
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
                    className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-[inherit] bg-black/60 px-5 py-4 text-center backdrop-blur-sm md:px-8"
                >
                    <p className="font-helvetica text-sm font-bold text-foreground-fixed md:text-base lg:text-lg">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
