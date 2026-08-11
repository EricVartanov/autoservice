// components/ui/Select.js
"use client";

import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Icon from "@/components/icons/Icon";

export default function Select({
    options,
    value,
    onChange,
    placeholder = "Выберите",
    className = "",
    error = false,
    variant = "underline",
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((o) => (o.value ?? o) === value);
    const selectedLabel = selected ? (selected.label ?? selected) : null;

    const triggerClass =
        variant === "pill"
            ? `w-full flex items-center text-foreground-fixed justify-between rounded-full border bg-transparent px-5 py-3.5 text-sm md:text-base outline-none transition-colors cursor-pointer ${
                  error ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
              }`
            : `w-full flex items-center text-foreground-fixed justify-between bg-transparent border-b text-sm pb-2 outline-none transition-colors cursor-pointer ${
                  error ? "border-primary" : "border-white/20 focus:border-foreground-fixed"
              }`;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={triggerClass}
            >
                <span className='text-foreground-fixed'>
                    {selectedLabel ?? placeholder}
                </span>
                <motion.div
                    animate={{rotate: open ? 180 : 0}}
                    transition={{duration: 0.2}}
                    className="shrink-0 text-foreground-fixed"
                >
                    <Icon name={'arrow-down'} className={'size-6 text-foreground-fixed'}/>
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{opacity: 0, y: -8, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -8, scale: 0.98}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                        className="absolute left-0 right-0 top-full mt-2 z-30 rounded-xl border border-white/10 bg-black/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden py-1 max-h-60 overflow-y-auto"
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
                                                ? "text-primary bg-primary/10"
                                                : "text-foreground-fixed hover:bg-white/50 hover:text-foreground-light-fixed"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
