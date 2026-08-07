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
        'inline-flex cursor-pointer items-center justify-center rounded-full font-bold text-base transition disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary border border-primary hover:bg-transparent text-foreground-fixed min-w-[213] px-10 py-3.5',
        icon: 'w-[54] h-[54] border border-white/20 text-foreground-fixed hover:bg-white/10',
        serviceCard: 'font-normal text-base font-helvetica px-5 py-2',
        transparent: 'font-bold text-base font-helvetica px-5 py-3.5 border border-btn-border min-w-[213]',

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
