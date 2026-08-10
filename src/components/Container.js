export function Container({children, className = '', ...props}) {
    return <div className={`px-[15] md:px-20 xl:max-w-container w-full mx-auto xl:px-5 ${className}`} {...props}>{children}</div>;
}