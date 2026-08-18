import Icon from "@/components/icons/Icon";

export default function FieldError({children, className = "", colorClass = "text-foreground-fixed"}) {
    if (!children) return null;

    return (
        <p className={`flex items-center gap-1 text-xs ${colorClass} ${className}`}>
            <Icon name="warning" className="size-4 shrink-0" aria-hidden />
            <span>{children}</span>
        </p>
    );
}
