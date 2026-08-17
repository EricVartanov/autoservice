import ServiceGlyph from '@/components/modals/service/ServiceGlyph';

export default function ServiceSymptoms({title, items}) {
    return (
        <section className="px-5 pb-[70] md:px-10 md:pb-12 lg:pb-[80]">
            <h3 className="font-heading text-center font-medium md:text-left text-[25px] md:text-[22px] lg:text-[34px] leading-none text-foreground">
                {title}
            </h3>
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-x-10 md:gap-y-5 lg:gap-[70]">
                {items.map((item) => (
                    <div key={item.text} className="flex gap-1.5 justify-start items-center">
                        <ServiceGlyph src={item.icon} alt={item.text} variant="outline" />
                        <p className="font-helvetica text-sm font-medium md:text-lg leading-tight text-foreground max-w-[224]">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
