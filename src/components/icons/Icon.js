export default function Icon({ name, className, ...props }) {
    return (
        <svg className={className} {...props}>
            <use href={`/icons/sprite.svg#${name}`} />
        </svg>
    );
}