export function Container({ children, ...props }) {
    return <div className={'max-w-container w-full mx-auto px-5'} {...props}>{children}</div>;
}