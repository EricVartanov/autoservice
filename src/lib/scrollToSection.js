/**
 * Smooth-scroll to a section by DOM id.
 * @param {string} id - Element id without '#'
 * @param {{ behavior?: ScrollBehavior }} [options]
 * @returns {boolean}
 */
export function scrollToSection(id, { behavior = 'smooth' } = {}) {
    if (typeof document === 'undefined' || !id) return false;
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior, block: 'start' });
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
