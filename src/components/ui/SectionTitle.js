// components/ui/SectionTitle.jsx
import ShimmerText from "@/components/ui/ShimmerText";
import Icon from "@/components/icons/Icon";

export default function SectionTitle({
                                         title = '',
                                         subtitle = '',
                                         titleBack = '',
                                         highlightHtml = null,
                                         mark,
                                         variant = 'center',
                                         titleColor='text-foreground'
                                     }) {
    const variants = {
        center: 'text-center',
        left: 'text-left',

    };

    return (
        <div className={`mx-auto ${variants[variant]}`}>
            {mark && (
                <p className={`flex items-center gap-1.5 text-lg ${titleColor} font-sans  mb-4 ${variant === 'center' ? 'justify-center' : ''}`}>
                    <Icon name={'star'} className={'text-primary-light size-3'}/>
                    {mark}
                </p>
            )}

            <div className={'relative'}>
                <h2 className={`font-heading tracking-tight text-[54px] ${titleColor} leading-none whitespace-pre-line`}>
                    {title}
                </h2>

                <ShimmerText
                    as="h3"
                    className="absolute left-1/2 -translate-x-1/2 z-[-1] bottom-0 whitespace-nowrap text-[120px] leading-none font-bold font-heading tracking-tight"
                >
                    {titleBack}
                </ShimmerText>
            </div>

            {highlightHtml ? (
                <div className="mt-9 text-left flex flex-col lg:justify-between gap-2.5">
                    <p className="max-w-md text-[34px] font-bold font-heading leading-none [&_span]:text-primary"
                       dangerouslySetInnerHTML={{__html: highlightHtml}}>
                    </p>
                    {subtitle && (
                        <p className="ml-auto mt-2.5 max-w-xl text-lg text-foreground leading-6 whitespace-pre-line">
                            {subtitle}
                        </p>
                    )}
                </div>
            ) : (
                subtitle && (
                    <p className="mt-7 max-w-2xl mx-auto text-lg text-foreground-light leading-6 whitespace-pre-line">
                        {subtitle}
                    </p>
                )
            )}
        </div>
    )
}
