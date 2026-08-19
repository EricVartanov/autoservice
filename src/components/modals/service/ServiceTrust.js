import Image from 'next/image';
import {mediaAlt, mediaUrl} from '@/lib/media';

export default function ServiceTrust({data}) {
    const {image, imageAlt, title, text} = data;

    return (
        <section className="relative overflow-hidden px-5 py-10 md:px-[30] lg:py-[80] min-h-[240]">
            <Image src={mediaUrl(image)} alt={mediaAlt(image, imageAlt)} fill className="object-cover" />
            <div className="relative z-10 flex flex-col lg:flex-row justify-between h-full gap-4">
                <h3 className="font-heading text-center md:text-left font-medium text-[25px] md:text-[28px] lg:text-[34px] max-w-[470] md:font-bold leading-none text-foreground-fixed">
                    {title}
                </h3>
                <p className="font-helvetica font-medium text-center md:text-left text-sm md:text-lg leading-5 text-foreground-fixed/90 w-full lg:w-[580]">
                    {text}
                </p>
            </div>
        </section>
    );
}
