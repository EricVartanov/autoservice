import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";

export default function BranchCard({branch, embedded = false}) {
    const phoneHref = `tel:${branch.phone.replace(/\D/g, '')}`;

    return (
        <div
            className={`flex flex-col lg:gap-7 items-center text-center`}
        >
            <div className="text-center max-w-[250]">
                <p className={`flex justify-center items-center gap-1.5 font-helvetica text-sm md:text-lg text-foreground`}>
                    <Icon name="star" className="text-primary-light size-3 shrink-0"/>
                    {branch.name}
                </p>
                <p className="mt-2.5 md:mt-5 md:mt-7 text-sm md:text-base lg:text-[22px] font-heading leading-none text-foreground whitespace-break-spaces">{branch.address}</p>
            </div>

            <div className={`mt-2.5 md:mt-5 ${embedded ? 'lg:mt-[60]' : 'lg:mt-[140]'}`}>
                <p className="text-sm md:text-lg text-foreground-light">{branch.workHours}</p>
                <h3 className="mt-6 md:mt-10 lg:mt-7 font-heading text-[24px] md:text-[40px] lg:text-[54px] font-medium leading-none tracking-tight text-foreground">
                    {branch.title}
                </h3>
                <a
                    href={phoneHref}
                    className={`mt-2.5 md:mt-10 lg:mt-8  ${embedded ? 'lg:mt-20' : 'lg:mt-[130]'} block font-heading text-lg md:text-[22px] lg:text-[34px] font-medium leading-none tracking-tight text-foreground hover:text-primary-light transition`}
                >
                    {branch.phone}
                </a>
            </div>

            <div className={`mt-5 md:mt-[60] lg:mt-0 flex items-center flex-col gap-2.5 w-full max-w-[200] md:max-w-0 lg:max-w-70`}>
                <Button
                    href={branch.panoramaUrl}
                    variant="transparent"
                    className="w-full min-h-10 px-3 text-transparent-btn-text min-w-[200]! md:min-w-[276]! hover:bg-primary hover:text-foreground-fixed lg:px-5 lg:text-base"
                >
                    Смотреть панораму
                </Button>
                <Button
                    href={branch.mapUrl}
                    variant="primary"
                    className="w-full px-3 min-h-[40]! min-w-[200]! md:min-w-[276]! hover:text-primary-light lg:text-base"
                    target={branch.mapUrl?.startsWith('http') ? '_blank' : undefined}
                >
                    Открыть на Яндекс карте
                </Button>
            </div>
        </div>
    );
}
