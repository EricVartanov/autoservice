import ShimmerText from "@/components/ui/ShimmerText";

export default function SectionTitle({title = '', subtitle = '', titleBack = '',}) {
    return (
        <>
            <ShimmerText
                as="h3"
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(2.5rem,8vw,6rem)] font-bold font-heading tracking-tight"
            >
                {titleBack}
            </ShimmerText>

            <div className="relative mx-auto text-center">
                <h2 className="font-heading text-[54px] text-foreground leading-none whitespace-pre-line">
                    {title}
                </h2>
                <p className="mt-7 max-w-2xl mx-auto text-lg text-foreground-light leading-6 whitespace-pre-line">
                    {subtitle}
                </p>
            </div>
        </>
    )
}