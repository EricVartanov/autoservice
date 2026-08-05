import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ServiceCard({service}) {
    return (

        <div
            className={`cursor-pointer group overflow-hidden relative rounded-[30] w-full max-w-[356] min-h-[330] flex flex-col justify-end p-7`}
        >
            <Image
                src={service.image}
                alt={service.title}
                width={356}
                height={330}
                className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
            />
            <div
                className={`absolute transition inset-0 bg-[radial-gradient(76.76%_77.83%_at_70.8%_26.11%,rgba(0,0,0,0)_0%,#000_100%)] group-hover:bg-[radial-gradient(76.76%_77.83%_at_70.8%_26.11%,rgba(0,0,0,0)_0%,#be0000_100%)]`}
            />

            <div className={'flex h-full z-10 flex-col justify-end items-center'}>
                <h3 className="text-foreground-fixed font-bold font-heading text-[22px] leading-none max-w-4/5 text-center">
                    {service.title}
                </h3>
                <p className="mt-5 text-foreground-fixed text-lg">{service.price}</p>
                <Button variant={'serviceCard'} className={'mt-12 bg-primary transition text-foreground-fixed group-hover:bg-foreground-fixed group-hover:text-primary'}>
                    Подробнее
                </Button>
            </div>
        </div>
    );
}