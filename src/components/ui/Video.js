export function Video({video, className}) {
    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            suppressHydrationWarning
            className={className}
        >
            <source src={video} type="video/mp4"/>
            Ваш браузер не поддерживает видео.
        </video>
    )
}