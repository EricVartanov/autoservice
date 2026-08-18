export function formatPrice(price) {
    if (price == null) return '';

    return String(price).replace(/\d+/g, (digits) =>
        digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    );
}
