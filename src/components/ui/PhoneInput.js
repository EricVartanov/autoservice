// components/ui/PhoneInput.js
"use client";

import { useLayoutEffect, useRef, useState } from "react";

const MASK = "+7 (___) ___-__-__";
const SLOTS = [4, 5, 6, 9, 10, 11, 13, 14, 16, 17];
const PREFIX_END = SLOTS[0];
export function extractPhoneDigits(raw) {
    let digits = raw.replace(/\D/g, "");
    // код страны снимаем только если он реально в строке (+7/маска) или номер 11 цифр
    const hasCountryPrefix = /^\s*\+[78]/.test(raw) || digits.length >= 11;
    if (hasCountryPrefix && (digits[0] === "7" || digits[0] === "8")) {
        digits = digits.slice(1);
    }
    // вставка полного номера в уже показанную маску +7(...): вторая «лишняя» 7/8
    if (digits.length > 10 && (digits[0] === "7" || digits[0] === "8")) {
        digits = digits.slice(1);
    }
    return digits.slice(0, 10);
}

export function formatPhoneMask(digits) {
    const chars = MASK.split("");
    SLOTS.forEach((pos, i) => {
        if (digits[i]) chars[pos] = digits[i];
    });
    return chars.join("");
}

// для отправки на бэк: чистый номер с кодом страны, без символов
export function getCleanPhone(digits) {
    return digits ? "7" + digits : "";
}

const caretFor = (i) => (i < SLOTS.length ? SLOTS[i] : MASK.length);

/** Индекс цифры номера (0..9) сразу перед caret в отформатированной строке */
function digitIndexBeforeCaret(display, caret) {
    let count = 0;
    for (let i = 0; i < caret && i < display.length; i++) {
        if (display.startsWith("+7") && i === 1) continue;
        if (/\d/.test(display[i])) count++;
    }
    return count;
}

export default function PhoneInput({
    value,
    onChange,
    className = "",
    placeholder = "+7(999)999-99-99",
    onFocus,
    onBlur,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const pendingCaret = useRef(null);
    const showMask = focused || !!value;
    const display = showMask ? formatPhoneMask(value) : "";

    useLayoutEffect(() => {
        if (pendingCaret.current == null) return;
        const el = inputRef.current;
        if (el) {
            el.setSelectionRange(pendingCaret.current, pendingCaret.current);
        }
        pendingCaret.current = null;
    });

    const clampCaret = () => {
        const el = inputRef.current;
        if (!el || !showMask) return;

        const min = PREFIX_END;
        const max = caretFor(value.length);
        let start = el.selectionStart ?? min;
        let end = el.selectionEnd ?? min;
        let changed = false;

        if (start < min) {
            start = min;
            changed = true;
        }
        if (end < min) {
            end = min;
            changed = true;
        }
        if (start > max) {
            start = max;
            changed = true;
        }
        if (end > max) {
            end = max;
            changed = true;
        }

        if (changed) el.setSelectionRange(start, end);
    };

    const handleChange = (e) => {
        const raw = e.target.value;
        const caret = e.target.selectionStart ?? raw.length;
        const digitsBeforeCaret = digitIndexBeforeCaret(raw, caret);
        const newDigits = extractPhoneDigits(raw);
        onChange(newDigits);
        pendingCaret.current = caretFor(
            Math.min(digitsBeforeCaret, newDigits.length),
        );
    };

    const handleKeyDown = (e) => {
        if (e.key !== "Backspace" && e.key !== "Delete") return;

        e.preventDefault();

        const el = e.target;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;

        if (!value) return;

        if (start !== end) {
            const from = digitIndexBeforeCaret(display, start);
            const to = digitIndexBeforeCaret(display, end);
            onChange(value.slice(0, from) + value.slice(to));
            pendingCaret.current = caretFor(from);
            return;
        }

        if (e.key === "Backspace") {
            const idx = digitIndexBeforeCaret(display, start);
            if (idx > 0) {
                onChange(value.slice(0, idx - 1) + value.slice(idx));
                pendingCaret.current = caretFor(idx - 1);
            } else {
                pendingCaret.current = PREFIX_END;
            }
            return;
        }

        const idx = digitIndexBeforeCaret(display, start);
        if (idx < value.length) {
            onChange(value.slice(0, idx) + value.slice(idx + 1));
            pendingCaret.current = caretFor(idx);
        } else {
            pendingCaret.current = caretFor(value.length);
        }
    };

    return (
        <input
            ref={inputRef}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={display}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={clampCaret}
            onSelect={clampCaret}
            onFocus={(e) => {
                setFocused(true);
                pendingCaret.current = caretFor(value.length);
                onFocus?.(e);
            }}
            onBlur={(e) => {
                setFocused(false);
                onBlur?.(e);
            }}
            placeholder={placeholder}
            className={className}
            {...props}
        />
    );
}
