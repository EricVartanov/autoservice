export default function Button({
                                   children,
                                   variant = 'primary',
                                   className = '',
                                   onClick,
                                   type = 'button',
                                   disabled = false,
                                   ...props
                               }) {
    const base =
        'inline-flex cursor-pointer items-center justify-center rounded-full font-bold text-base transition disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary border border-primary hover:bg-transparent text-foreground-fixed px-10 py-3.5',
        outline: 'border border-white/30 text-white px-6 py-3 hover:bg-white/10',
        icon: 'w-[54] h-[54] border border-white/20 text-foreground-fixed hover:bg-white/10',
        ghost: 'text-white hover:text-white/70 px-2 py-1',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}