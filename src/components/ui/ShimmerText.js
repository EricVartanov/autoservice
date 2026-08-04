export default function ShimmerText(
    {
        children,
        className = "",
        as: Tag = "span",
    }
) {
    return (
        <Tag
            aria-hidden
            className={`pointer-events-none select-none shimmer-text ${className}`}
        >
            {children}
        </Tag>
    );
}