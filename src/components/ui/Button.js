export default function Button({
                                   children,
                                   variant = 'primary',
                                   className = '',
                                   onClick,
                                   type = 'button',
                                   disabled = false,
                                   href,
                                   target,
                                   rel,
                                   ...props
                               }) {
    const base =
        'inline-flex leading-none cursor-pointer items-center justify-center rounded-full font-bold text-xs md:text-base transition disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary border border-primary hover:bg-transparent text-foreground-fixed min-w-[160] md:min-h-[54] md:min-w-[213] px-3 py-2.5 md:py-3.5',
        icon: 'w-10 h-10 md:w-[54] md:h-[54] border border-white/20 text-foreground-fixed hover:bg-white/10',
        serviceCard: 'font-normal font-helvetica px-8 py-4 md:px-5 md:py-2',
        transparent: 'font-bold font-helvetica px-3 md:px-5 py-2.5 md:py-3.5 border border-btn-border md:min-h-[54] min-w-[160] md:min-w-[213]',

    };

    const classes = `${base} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
                className={classes}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
