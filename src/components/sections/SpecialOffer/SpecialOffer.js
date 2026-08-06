import Image from "next/image";
import {Container} from "@/components/Container";
import Button from "@/components/ui/Button";

export default function SpecialOffer({data}) {
    const {image, highlightHtml, highlightMark, title, subtitle} = data

    return (
        <section className={'relative py-[185]'}>
            <Container>
                {/* фон */}
                <div className="absolute inset-0">
                    <Image src={image.path} alt={image.alt} width={1920} height={640}
                           className={"inset-0 w-full h-full object-cover"}/>
                </div>

                <div className={'flex justify-between items-center z-10'}>
                    <div className={'max-w-2xl'}>
                        {highlightHtml && (
                            <div className="text-left font-heading relative">
                                <h5 className="text-[68px] text-foreground-fixed uppercase font-[900] leading-[0.8] [&_span]:text-primary"
                                    dangerouslySetInnerHTML={{__html: highlightHtml}}>
                                </h5>
                                {highlightMark && (
                                    <div
                                        className={'absolute transform font-extrabold leading-none -rotate-12 px-9 py-3 text-sm uppercase -bottom-[5%] right-0 rounded-full bg-primary text-foreground-fixed'}>
                                        {highlightMark}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={'max-w-lg w-full z-10 text-foreground-fixed font-heading leading-none'}>
                        <h5 className="text-[40px] max-w-1/2 font-bold">
                            {title[0]}
                        </h5>
                        <h5 className="ml-auto text-[40px] font-bold max-w-2/3">
                            {title[1]}
                        </h5>
                        <p className={'mt-5 text-base leading-5 max-w-2/3 ml-auto'}>
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