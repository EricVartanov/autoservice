import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";

export default function BranchCard({branch}) {
    const phoneHref = `tel:${branch.phone.replace(/\D/g, '')}`;

    return (
        <div
            className={`flex flex-col gap-7 items-center text-center`}
        >
            <div className="text-center max-w-[250]">
                <p className={`flex justify-center items-center gap-1.5 font-helvetica text-lg text-foreground`}>
                    <Icon name="star" className="text-primary-light size-3 shrink-0"/>
                    {branch.name}
                </p>
                <p className="mt-7 text-base lg:text-[22px] font-heading leading-none text-foreground whitespace-break-spaces">{branch.address}</p>
            </div>

            <div className="mt-10 lg:mt-[140]">
                <p className="text-lg text-foreground-light">{branch.workHours}</p>
                <h3 className="mt-7 font-heading text-[32px] lg:text-[54px] font-medium leading-none tracking-tight text-foreground">
                    {branch.title}
                </h3>
                <a
                    href={phoneHref}
                    className="mt-8 lg:mt-[130] block font-heading text-[20px] lg:text-[34px] font-medium leading-none tracking-tight text-foreground hover:text-primary-light transition"
                >
                    {branch.phone}
                </a>
            </div>

            <div className={`flex flex-col gap-2.5 w-full max-w-none lg:max-w-70`}>
                <Button
                    href={branch.panoramaUrl}
                    variant="transparent"
                    className="w-full min-w-0 px-3 text-sm text-transparent-btn-text hover:bg-primary hover:text-foreground-fixed lg:px-5 lg:text-base"
                >
                    Смотреть панораму
                </Button>
                <Button
                    href={branch.mapUrl}
                    variant="primary"
                    className="w-full min-w-0 px-3 text-sm hover:text-primary-light lg:px-4! lg:text-base"
                    target={branch.mapUrl?.startsWith('http') ? '_blank' : undefined}
                >
                    Открыть на Яндекс карте
                </Button>
            </div>
        </div>
    );
}
