// components/ui/Select.js
"use client";

import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";

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
            ? `w-full flex items-center justify-between rounded-full border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors cursor-pointer ${
                  error ? "border-red-500" : "border-white/20 focus:border-primary"
              }`
            : `w-full flex items-center justify-between bg-transparent border-b text-sm pb-2 outline-none transition-colors cursor-pointer ${
                  error ? "border-red-500" : "border-white/20 focus:border-primary"
              }`;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={triggerClass}
            >
                <span className={selectedLabel ? "text-foreground" : "text-foreground-light/50"}>
                    {selectedLabel ?? placeholder}
                </span>
                <motion.svg
                    animate={{rotate: open ? 180 : 0}}
                    transition={{duration: 0.2}}
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 text-foreground-light"
                >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{opacity: 0, y: -8, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -8, scale: 0.98}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                        className="absolute left-0 right-0 top-full mt-2 z-30 rounded-xl border border-white/10 bg-[#161616] shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden py-1 max-h-60 overflow-y-auto"
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
                                                : "text-foreground-light hover:bg-white/5 hover:text-foreground"
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
