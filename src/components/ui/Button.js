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
        icon: 'w-[54] h-[54] border border-white/20 text-foreground-fixed hover:bg-white/10',
        serviceCard: 'font-normal text-base font-helvetica px-5 py-2',
        transparent: 'font-bold text-base font-helvetica px-5 py-4 border border-neutral-700',

    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className} `}
            {...props}
        >
            {children}
        </button>
    );
}