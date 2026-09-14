export const SUBMIT_ERROR_MESSAGE = 'Не удалось отправить заявку. Попробуйте ещё раз.';

export async function submitLead(payload) {
    const base = (process.env.NEXT_PUBLIC_WORDPRESS_URL || '').replace(/\/$/, '');

    if (!base) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('[submitLead] NEXT_PUBLIC_WORDPRESS_URL is not set; skipping request');
            return;
        }
        throw new Error(SUBMIT_ERROR_MESSAGE);
    }

    let response;
    try {
        response = await fetch(`${base}/wp-json/autoservice/v1/lead`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error(SUBMIT_ERROR_MESSAGE);
    }

    if (!response.ok) {
        throw new Error(SUBMIT_ERROR_MESSAGE);
    }
}

export function honeypotValue(form) {
    return form?.elements?.website?.value ?? '';
}
