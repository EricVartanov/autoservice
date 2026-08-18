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
 * Smooth-scroll to a DOM element.
 * Uses Lenis when available; falls back to native scrollIntoView.
 * @param {Element | null | undefined} el
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToElement(el, {behavior = 'smooth'} = {}) {
    if (typeof document === 'undefined' || !el) return false;

    if (lenisInstance && behavior !== 'auto') {
        const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        lenisInstance.scrollTo(el, {offset: -padding});
        return true;
    }

    el.scrollIntoView({behavior, block: 'start'});
    return true;
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
    return scrollToElement(document.getElementById(id), {behavior});
}

/**
 * Smooth-scroll to the top of the page.
 * Uses Lenis when available; falls back to native window.scrollTo.
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToTop({behavior = 'smooth'} = {}) {
    if (typeof window === 'undefined') return false;
    if (lenisInstance && behavior !== 'auto') {
        lenisInstance.scrollTo(0);
        return true;
    }
    window.scrollTo({top: 0, behavior});
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
