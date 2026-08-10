import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";
import BlurredCircle from "@/components/ui/blurredCircle";
import BranchCard from "@/components/sections/Contacts/BranchCard";
import MapConnectors from "@/components/sections/Contacts/MapConnectors";
import Image from "next/image";

export default function Contacts({data}) {
    const {email, mapImage, mapAlt, branches = []} = data;
    const [left, right] = branches;

    return (
        <section className="relative overflow-hidden py-20 lg:py-[150]">
            <Container className={'relative'}>
                <div className="absolute z-20 left-1/2 transform -translate-x-1/2 top-0 flex justify-center max-lg:relative max-lg:left-auto max-lg:translate-x-0 max-lg:mb-10">
                    <a
                        href={`mailto:${email}`}
                        className="shadow-[0_0_20px_0_var(--color-btn-shadow)] cursor-pointer inline-flex items-center gap-2.5 rounded-full bg-background px-5 py-2.5 text-base text-foreground transition hover:opacity-80"
                    >
                        <Icon name="mail" className="size-6 shrink-0 text-foreground"/>
                        <span>{email}</span>
                    </a>
                </div>

                <div className="relative">
                    <div className="flex justify-between items-start max-lg:gap-6">
                        <div className="max-lg:flex-1">
                            {left && <BranchCard branch={left}/>}
                        </div>

                        <div className="max-lg:flex-1">
                            {right && <BranchCard branch={right}/>}
                        </div>
                    </div>
                </div>
                <BlurredCircle
                    className="left-1/2 bottom-0 -translate-x-1/2 opacity-30"
                    size={'size-[620]'}
                />
                <Image
                    src={mapImage}
                    alt={mapAlt}
                    width={602}
                    height={561}
                    className="absolute left-1/2 bottom-0 -translate-x-1/2  z-10 w-full max-w-[600] max-lg:max-w-[380] h-auto dark:invert"
                />
                <MapConnectors branches={branches}/>
            </Container>
        </section>
    );
}
