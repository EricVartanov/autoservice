export default function HeroSlideContent({ slide }) {
    return (
        <div className="min-h-[140px] w-full">
            <h3 className="font-heading font-bold text-white text-xl mb-3 whitespace-pre-line">
                {slide.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">{slide.text}</p>
        </div>
    );
}