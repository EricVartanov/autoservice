import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";
import BlurredCircle from "@/components/ui/blurredCircle";
import BranchCard from "@/components/sections/Contacts/BranchCard";
import MapConnectors from "@/components/sections/Contacts/MapConnectors";
import Image from "next/image";

export default function Contacts({data, embedded = false}) {
    const {email, mapImage, mapAlt, branches = []} = data;
    const [left, right] = branches;

    return (
        <section className={`relative overflow-hidden ${embedded ? 'py-12 md:py-16 lg:pb-[150] lg:pt-20 px-0' : 'py-20 lg:py-[150]'}`}>
            <Container className={`relative ${embedded ? '!px-5 md:!px-10' : ''}`}>
                <div className="relative z-20 left-auto top-0 mb-10 md:mb-[50] flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:mb-0">
                    <a
                        href={`mailto:${email}`}
                        className="shadow-[0_0_20px_0_var(--color-btn-shadow)] cursor-pointer inline-flex items-center gap-2.5 rounded-full bg-background px-5 py-2.5 text-base text-foreground transition hover:opacity-80"
                    >
                        <Icon name="mail" className="size-6 shrink-0 text-foreground"/>
                        <span>{email}</span>
                    </a>
                </div>

                <div className="relative">
                    <div className="flex-col md:flex-row flex justify-between items-center md:items-start gap-10 md:gap-6 lg:gap-0">
                        <div className="flex-1 lg:flex-none">
                            {left && <BranchCard branch={left} embedded={embedded}/>}
                        </div>

                        <div className="flex-1 lg:flex-none">
                            {right && <BranchCard branch={right} embedded={embedded}/>}
                        </div>
                    </div>
                </div>
                <BlurredCircle
                    className={`left-1/2 bottom-0 -translate-x-1/2 opacity-30 ${embedded ? 'z-10' : ''}`}
                    size={embedded ? '' : 'size-[620]'}
                />
                <div
                    className={`z-[-1] lg:z-10 opacity-50 lg:opacity-100 absolute left-1/2 top-1/2 lg:top-unset lg:bottom-0 -translate-1/2 lg:-translate-x-1/2 w-full max-w-[380] lg:max-w-[600] h-auto dark:invert ${embedded ? 'h-full' : ''} `}
                >
                    <Image
                        src={mapImage}
                        alt={mapAlt}
                        width={602}
                        height={561}
                    />
                </div>
                <MapConnectors branches={branches}/>
            </Container>
        </section>
    );
}
