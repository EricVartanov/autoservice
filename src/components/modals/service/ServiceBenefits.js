import ServiceGlyph from '@/components/modals/service/ServiceGlyph';

export default function ServiceBenefits({title, items}) {
    return (
        <section className="px-2.5 py-20 md:px-10 md:py-12 lg:py-[80]">
            <h3 className="text-center md:text-left font-heading font-medium text-[25px] md:text-[28px] lg:text-[34px] leading-none text-foreground lg:max-w-[500]">
                {title}
            </h3>
            <div className="mt-[30] md:mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-2">
                {items.map((item) => (
                    <div key={item.text} className="flex flex-col items-start text-left gap-2.5 md:gap-3.5 lg:gap-5 bg-foreground-fixed p-[15] md:p-5 rounded-[20] md:rounded-[30]">
                        <ServiceGlyph src={item.icon} alt={item.text} />
                        <p className="font-helvetica font-medium text-sm md:text-lg leading-tight text-black max-w-[160]">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
