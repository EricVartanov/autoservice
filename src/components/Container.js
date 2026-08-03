export function Container({ children, ...props }) {
    return <div className={'max-w-container mx-auto px-5'} {...props}>{children}</div>;
}