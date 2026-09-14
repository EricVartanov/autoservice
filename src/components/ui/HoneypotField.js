export default function HoneypotField() {
    return (
        <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            className="absolute h-0 w-0 opacity-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
