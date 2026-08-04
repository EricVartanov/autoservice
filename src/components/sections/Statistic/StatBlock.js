import Icon from "@/components/icons/Icon";
import Image from "next/image";

export default function StatBlock({data}) {

    return (
        <div className={'flex justify-center align-top gap-7'}>
            <div className={'w-[100] h-[100] shrink-0 flex items-center text-foreground-fixed justify-center rounded-full bg-white/20'}>
                <Image src={data.image} alt={data.alt} width={60} height={60}/>
            </div>
            <div className={'text-foreground-fixed'}>
                <h5 className={'font-heading font-bold text-[68px] leading-none'}>
                    {data.value}
                </h5>
                <p className={'text-lg leading-none font-helvetica'}>
                    {data.text}
                </p>
            </div>
        </div>
    );
}