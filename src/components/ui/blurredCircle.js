export default function BlurredCircle({
    size = 'size-[720]',
    className = '',
    color = 'bg-primary-light/50',
    blur = 'blur-[60px]',
}) {
    return (
        <div className={`pointer-events-none absolute -z-10 ${size || 'size-[720]'} ${className}`}>
            <div className={`absolute left-1/2 top-1/2 size-[72%] -translate-1/2 rounded-full ${color} ${blur}`}/>
        </div>
    );
}
