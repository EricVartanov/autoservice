import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";
import BlurredCircle from "@/components/ui/blurredCircle";
import BranchCard from "@/components/sections/Contacts/BranchCard";
import MapConnectors from "@/components/sections/Contacts/MapConnectors";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {mediaAlt, mediaUrl} from "@/lib/media";

export default function Contacts({data, embedded = false}) {
    const {email, mapImage, mapImageDark, mapAlt, branches = []} = data;
    const [left, right] = branches;

    return (
        <section className={`relative overflow-hidden ${embedded ? 'py-20 md:py-16 lg:pb-[150] lg:pt-20 px-0' : 'py-10 md:py-20 lg:py-[150]'}`}>
            <Container className={`relative ${embedded ? '!px-2.5 md:!px-[30] lg:!px-10 z-0' : ''}`}>
                <ScrollReveal className="relative z-20 left-auto top-0 mb-10 md:mb-[50] items-center flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:mb-0">
                    <a
                        href={`mailto:${email}`}
                        className={`shadow-[0_0_20px_0_var(--color-btn-shadow)] cursor-pointer inline-flex items-center gap-2.5 rounded-full bg-background px-5 py-2.5 font-bold text-sm   ${embedded ? 'items-end' : ''} text-foreground transition hover:opacity-80`}
                    >
                        <Icon name="mail" className="size-6 shrink-0 text-foreground"/>
                        <span>{email}</span>
                    </a>
                </ScrollReveal>

                <ScrollReveal
                    stagger
                    className="relative flex-col md:flex-row flex justify-between items-center md:items-start gap-[30] md:gap-6 lg:gap-0"
                >
                    <div className="flex-1 lg:flex-none">
                        {left && <BranchCard branch={left} embedded={embedded}/>}
                    </div>

                    <div className="flex-1 lg:flex-none">
                        {right && <BranchCard branch={right} embedded={embedded}/>}
                    </div>
                </ScrollReveal>
                <ScrollReveal
                    delay={0.15}
                    className={`z-[-1] hidden lg:block opacity-50 lg:opacity-100 absolute left-1/2 top-1/2 lg:top-unset lg:top-[calc(50%+100px)] -translate-1/2 lg:-translate-x-1/2 w-full lg:max-w-[941] h-auto ${embedded ? 'h-full' : ''} `}
                >
                    <Image
                        src={mediaUrl(mapImage)}
                        alt={mediaAlt(mapImage, mapAlt)}
                        width={941}
                        height={627}
                        className="dark:hidden"
                    />
                    {mapImageDark && (
                        <Image
                            src={mediaUrl(mapImageDark)}
                            alt={mediaAlt(mapImageDark, mapAlt)}
                            width={941}
                            height={627}
                            className="hidden dark:block"
                        />
                    )}
                </ScrollReveal>
                <MapConnectors branches={branches} embedded={embedded}/>
            </Container>
        </section>
    );
}
