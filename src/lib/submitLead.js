export const SUBMIT_ERROR_MESSAGE = 'Не удалось отправить заявку. Попробуйте ещё раз.';

export function formOptionLabel(options, value) {
    if (!value) return '';
    const match = (options || []).find((opt) => opt.value === value);
    return match?.label || value;
}

/**
 * Resolve branch fields for lead payload.
 * Concrete branch → Russian label + Max URL; `any` / empty → no Max.
 */
export function resolveBranchLeadFields(branchSlug, {options = [], branches = []} = {}) {
    if (!branchSlug || branchSlug === 'any') {
        return {
            branch: branchSlug === 'any' ? formOptionLabel(options, 'any') || 'Не имеет значения' : '',
            branchSlug: '',
            branchMaxUrl: '',
        };
    }

    const fromOptions = formOptionLabel(options, branchSlug);
    const branch = (branches || []).find((b) => b.slug === branchSlug);

    return {
        branch: fromOptions || branch?.formLabel || branch?.title || branch?.name || branchSlug,
        branchSlug,
        branchMaxUrl: branch?.messenger?.url || '',
    };
}

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
