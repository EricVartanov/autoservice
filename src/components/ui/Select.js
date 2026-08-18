// components/ui/Select.js
"use client";

import {useState, useRef, useEffect, useCallback} from "react";
import {createPortal} from "react-dom";
import {motion, AnimatePresence} from "framer-motion";
import Icon from "@/components/icons/Icon";

export default function Select({
    options,
    value,
    onChange,
    placeholder = "Выберите",
    className = "",
    error = false,
    errorClass = "border-primary",
    variant = "underline",
}) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState(null);
    const triggerRef = useRef(null);
    const listRef = useRef(null);

    const updatePosition = useCallback(() => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCoords({
            top: rect.bottom + 8,
            left: rect.left,
            width: rect.width,
        });
    }, []);

    useEffect(() => {
        if (!open) return undefined;

        updatePosition();

        const onScrollOrResize = () => updatePosition();
        window.addEventListener("resize", onScrollOrResize);
        // capture: catch scroll inside modal overflow containers
        window.addEventListener("scroll", onScrollOrResize, true);

        return () => {
            window.removeEventListener("resize", onScrollOrResize);
            window.removeEventListener("scroll", onScrollOrResize, true);
        };
    }, [open, updatePosition]);

    useEffect(() => {
        if (!open) return undefined;

        const handleClickOutside = (e) => {
            const inTrigger = triggerRef.current?.contains(e.target);
            const inList = listRef.current?.contains(e.target);
            if (!inTrigger && !inList) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const selected = options.find((o) => (o.value ?? o) === value);
    const selectedLabel = selected ? (selected.label ?? selected) : null;

    const triggerClass =
        variant === "pill"
            ? `w-full flex items-center text-foreground-fixed justify-between rounded-full border bg-transparent px-5 h-[44] md:h-[54] py-2.5 md:py-3.5 text-sm md:text-base outline-none transition-colors cursor-pointer ${
                  error ? errorClass : "border-white/20 focus:border-foreground-fixed"
              }`
            : `w-full flex items-center text-foreground-fixed justify-between rounded-full border bg-white/20 px-5 h-[44] md:h-[54] py-2.5 md:py-3.5 text-sm md:text-base outline-none transition-colors cursor-pointer ${
                error ? errorClass : "border-transparent focus:border-white/20 focus:border-foreground-fixed"
            }`

    const dropdown =
        typeof window !== "undefined" &&
        createPortal(
            <AnimatePresence>
                {open && coords && (
                    <motion.ul
                        ref={listRef}
                        initial={{opacity: 0, y: -8, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -8, scale: 0.98}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                        style={{
                            position: "fixed",
                            top: coords.top,
                            left: coords.left,
                            width: coords.width,
                        }}
                        className={`z-[120] rounded-xl border border-white/10 ${variant === "pill" ? 'bg-black/90 ' : 'bg-white/90'} shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden py-1 max-h-60 overflow-y-auto`}
                    >
                        {options.map((opt) => {
                            const val = opt.value ?? opt;
                            const label = opt.label ?? opt;
                            const isActive = val === value;
                            return (
                                <li key={val}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(val);
                                            setOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                                            isActive
                                                ? variant === "pill" ? "text-primary bg-primary/10" : 'text-black'
                                                : variant === "pill" ? "text-foreground-fixed hover:bg-white/50 hover:text-foreground-light-fixed" : 'text-black hover:bg-black/50 hover:text-foreground-light-fixed'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>,
            document.body
        );

    return (
        <div className={`relative ${className}`}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={triggerClass}
            >
                <span className="text-foreground-fixed">
                    {selectedLabel ?? placeholder}
                </span>
                <motion.div
                    animate={{rotate: open ? 180 : 0}}
                    transition={{duration: 0.2}}
                    className="shrink-0 text-foreground-fixed"
                >
                    <Icon name={"arrow-down"} className={"size-6 text-foreground-fixed"}/>
                </motion.div>
            </button>
            {dropdown}
        </div>
    );
}
