import Image from "next/image";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";

export default function SpecialOffer({data}) {
    const {image, highlightHtml, highlightMark, title, subtitle} = data

    return (
        <section className={'relative py-[185] max-lg:py-24'}>
            <Container>
                {/* фон */}
                <div className="absolute inset-0">
                    <Image src={image.path} alt={image.alt} width={1920} height={640}
                           className={"inset-0 w-full h-full object-cover"}/>
                </div>

                <div className={'relative z-10 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-10'}>
                    <div className={'max-w-2xl max-lg:max-w-full'}>
                        {highlightHtml && (
                            <div className="text-left font-heading relative">
                                <h5 className="text-[68px] max-lg:text-[42px] text-foreground-fixed uppercase font-[900] leading-[0.8] [&_span]:text-primary"
                                    dangerouslySetInnerHTML={{__html: highlightHtml}}>
                                </h5>
                                {highlightMark && (
                                    <div
                                        className={'absolute transform font-extrabold leading-none -rotate-12 px-9 py-3 text-sm uppercase -bottom-[5%] right-0 max-lg:right-auto max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-bottom-8 rounded-full bg-primary text-foreground-fixed'}>
                                        {highlightMark}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={'max-w-lg w-full z-10 text-foreground-fixed font-heading leading-none max-lg:max-w-full'}>
                        <h5 className="text-[40px] max-lg:text-[28px] max-w-1/2 max-lg:max-w-none font-bold">
                            {title[0]}
                        </h5>
                        <h5 className="ml-auto text-[40px] max-lg:text-[28px] font-bold max-w-2/3 max-lg:ml-0 max-lg:max-w-none">
                            {title[1]}
                        </h5>
                        <p className={'mt-5 text-base leading-5 max-w-2/3 ml-auto max-lg:ml-0 max-lg:max-w-none'}>
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