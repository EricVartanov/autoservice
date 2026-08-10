import Image from "next/image";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";

export default function SpecialOffer({data}) {
    const {image, highlightHtml, highlightMark, title, subtitle} = data

    return (
        <section className={'relative py-24 lg:py-[185]'}>
            <Container>
                {/* фон */}
                <div className="absolute inset-0">
                    <Image src={image.path} alt={image.alt} width={1920} height={640}
                           className={"inset-0 w-full h-full object-cover"}/>
                </div>

                <div className={'relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0'}>
                    <div className={'max-w-full lg:max-w-2xl'}>
                        {highlightHtml && (
                            <div className="text-left font-heading relative">
                                <h5 className="text-[42px] lg:text-[68px] text-foreground-fixed uppercase font-[900] leading-[0.8] [&_span]:text-primary"
                                    dangerouslySetInnerHTML={{__html: highlightHtml}}>
                                </h5>
                                {highlightMark && (
                                    <div
                                        className={'absolute transform font-extrabold leading-none -rotate-12 px-9 py-3 text-sm uppercase -bottom-8 right-auto left-1/2 -translate-x-1/2 lg:right-0 lg:left-auto lg:translate-x-0 lg:-bottom-[5%] rounded-full bg-primary text-foreground-fixed'}>
                                        {highlightMark}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={'max-w-full w-full z-10 text-foreground-fixed font-heading leading-none lg:max-w-lg'}>
                        <h5 className="text-[28px] lg:text-[40px] max-w-none lg:max-w-1/2 font-bold">
                            {title[0]}
                        </h5>
                        <h5 className="ml-0 text-[28px] lg:text-[40px] font-bold max-w-none lg:ml-auto lg:max-w-2/3">
                            {title[1]}
                        </h5>
                        <p className={'mt-5 text-base leading-5 max-w-none ml-0 lg:max-w-2/3 lg:ml-auto'}>
                            {subtitle}
                        </p>
                        <Button variant={'primary'} className={'mt-10'}>
                            Подробнее
                        </Button>
                    </div>

                </div>
            </Container>
        </section>
    );
}
