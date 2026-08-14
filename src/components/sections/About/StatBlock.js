import Image from "next/image";
import CountUp from "@/components/ui/CountUp";

export default function StatBlock({data}) {

    return (
        <div className={'flex flex-col items-center text-center gap-5 md:flex-row md:items-stretch md:text-left md:justify-start md:gap-4 lg:justify-center lg:gap-7 align-top'}>
            <div className={'w-10 h-10 md:w-[60] md:h-[60] lg:w-[100] lg:h-[100] shrink-0 flex items-center text-foreground-fixed justify-center rounded-full bg-white/20'}>
                <Image src={data.image} alt={data.alt} width={60} height={60} className="size-6 md:size-10 lg:size-[60]"/>
            </div>
            <div className={'text-foreground-fixed'}>
                <h5 className={'font-heading font-bold text-[22px] md:text-[40px] lg:text-[68px] leading-none'}>
                    <CountUp value={data.value} />
                </h5>
                <p className={'mt-2.5 leading-tight text-sm md:text-lg md:leading-none font-helvetica'}>
                    {data.text}
                </p>
            </div>
        </div>
    );
}
