import Image from "next/image";

export default function StatBlock({data}) {

    return (
        <div className={'flex justify-center align-top gap-7 max-lg:gap-4 max-lg:justify-start max-md:flex-col max-md:items-center max-md:text-center max-md:gap-3'}>
            <div className={'w-[100] h-[100] max-lg:w-[64] max-lg:h-[64] max-md:w-[52] max-md:h-[52] shrink-0 flex items-center text-foreground-fixed justify-center rounded-full bg-white/20'}>
                <Image src={data.image} alt={data.alt} width={60} height={60} className="max-lg:size-9 max-md:size-7"/>
            </div>
            <div className={'text-foreground-fixed'}>
                <h5 className={'font-heading font-bold text-[68px] max-lg:text-[42px] max-md:text-[32px] leading-none'}>
                    {data.value}
                </h5>
                <p className={'text-lg max-lg:text-sm max-md:text-xs leading-none font-helvetica'}>
                    {data.text}
                </p>
            </div>
        </div>
    );
}