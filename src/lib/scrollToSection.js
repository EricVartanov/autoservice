/** @type {import('lenis').default | null} */
let lenisInstance = null;

/** Register the active Lenis instance (or clear with null). */
export function setLenis(instance) {
    lenisInstance = instance;
}

export function getLenis() {
    return lenisInstance;
}

/**
 * Smooth-scroll to a section by DOM id.
 * Uses Lenis when available; falls back to native scrollIntoView.
 * @param {string} id - Element id without '#'
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToSection(id, {behavior = 'smooth'} = {}) {
    if (typeof document === 'undefined' || !id) return false;
    const el = document.getElementById(id);
    if (!el) return false;

    if (lenisInstance && behavior !== 'auto') {
        const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        lenisInstance.scrollTo(el, {offset: -padding});
        return true;
    }

    el.scrollIntoView({behavior, block: 'start'});
    return true;
}

/** Extract section id from href like `/#about` or `#about`. */
export function getHashId(href) {
    if (!href || typeof href !== 'string') return null;
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return null;
    const id = href.slice(hashIndex + 1);
    return id || null;
}
