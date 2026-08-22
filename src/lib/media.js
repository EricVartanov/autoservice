/** Canonical image: `{ url, alt }`. Also accepts legacy `{ path }`, `{ src }` and plain strings. */

export function img(url, alt = '') {
    return {url, path: url, alt};
}

export function mediaUrl(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value.url ?? value.path ?? value.src ?? '';
}

export function mediaAlt(value, fallback = '') {
    if (!value || typeof value === 'string') return fallback;
    return value.alt || fallback;
}
