export function Container({children, className = '', ...props}) {
    return <div className={`max-w-container w-full mx-auto px-5 ${className}`} {...props}>{children}</div>;
}