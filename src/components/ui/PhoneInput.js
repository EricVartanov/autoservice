// components/ui/PhoneInput.js
"use client";

import {useState} from "react";

export function extractPhoneDigits(raw) {
    let digits = raw.replace(/\D/g, "");
    // код страны снимаем только если он реально в строке (+7/маска) или номер 11 цифр
    const hasCountryPrefix = /^\s*\+[78]/.test(raw) || digits.length >= 11;
    if (hasCountryPrefix && (digits[0] === "7" || digits[0] === "8")) {
        digits = digits.slice(1);
    }
    return digits.slice(0, 10);
}

export function formatPhoneDisplay(digits, {showPrefix = false} = {}) {
    if (!digits) return showPrefix ? "+7" : "";
    let result = "+7 (" + digits.slice(0, 3);
    if (digits.length >= 3) result += ")";
    if (digits.length > 3) result += " " + digits.slice(3, 6);
    if (digits.length > 6) result += " " + digits.slice(6, 8);
    if (digits.length > 8) result += " " + digits.slice(8, 10);
    return result;
}

// для отправки на бэк: чистый номер с кодом страны, без символов
export function getCleanPhone(digits) {
    return digits ? "7" + digits : "";
}

/** Индекс цифры номера (0..9) сразу перед caret в отформатированной строке */
function digitIndexBeforeCaret(display, caret) {
    let count = 0;
    for (let i = 0; i < caret && i < display.length; i++) {
        // пропускаем «7» из префикса "+7"
        if (display.startsWith("+7") && i === 1) continue;
        if (/\d/.test(display[i])) count++;
    }
    return count;
}

export default function PhoneInput({
    value,
    onChange,
    className = "",
    placeholder = "+7 (098) 465 95 05",
    onFocus,
    onBlur,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const display = formatPhoneDisplay(value, {showPrefix: focused});

    const handleChange = (e) => {
        onChange(extractPhoneDigits(e.target.value));
    };

    const handleKeyDown = (e) => {
        if (e.key !== "Backspace" && e.key !== "Delete") return;

        const el = e.target;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;

        // пустое поле / только "+7" — префикс не стираем
        if (!value) {
            e.preventDefault();
            return;
        }

        // выделение — обычный onChange
        if (start !== end) return;

        if (e.key === "Backspace") {
            if (start <= 2 && display.startsWith("+7")) {
                e.preventDefault();
                return;
            }

            const charBefore = display[start - 1];
            // Backspace по ), пробелу и т.п. — удаляем цифру перед маской
            if (charBefore && /\D/.test(charBefore)) {
                e.preventDefault();
                const idx = digitIndexBeforeCaret(display, start);
                if (idx > 0) {
                    onChange(value.slice(0, idx - 1) + value.slice(idx));
                }
            }
            return;
        }

        if (e.key === "Delete") {
            const charAt = display[start];
            if (charAt && /\D/.test(charAt)) {
                e.preventDefault();
                const idx = digitIndexBeforeCaret(display, start);
                if (idx < value.length) {
                    onChange(value.slice(0, idx) + value.slice(idx + 1));
                }
            }
        }
    };

    return (
        <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={display}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
                setFocused(true);
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
