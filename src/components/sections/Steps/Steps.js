// components/ProcessSection.jsx
import BackgroundSlider from "./BackgroundSlider";
import SectionTitle from "@/components/ui/SectionTitle";
import {Container} from "@/components/Container";
import Icon from "@/components/icons/Icon";

export default function Steps({data}) {
    const {title, mark, steps, images} = data

    return (
        <section className={'relative'}>
            <BackgroundSlider
                images={images}
                interval={4000}
                showArrows={true}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 transform bg-[linear-gradient(127deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(190,0,0,1)_100%)]"/>

                <Container className="relative py-[150] ">
                    <div className={'flex flex-col justify-start w-[47%] ml-auto'}>
                        <SectionTitle title={title} mark={mark} variant={'left'}/>
                        <div className={'flex flex-wrap mt-[50] gap-x-[50] gap-y-[30]'}>
                            {steps.map((step) => (
                                <div className={'max-w-[calc(50%-30px)]'} key={step.number}>
                                    <div className={'relative inline-block'}>
                                        <span className={'text-sm font-helvetica text-foreground-fixed'}>
                                            {step.number}
                                        </span>
                                        <Icon name={'number-bg'} className={'z-[-1] absolute top-1/2 left-1/2 transform -translate-1/2 text-primary w-9 h-5'} />
                                    </div>
                                    <h4 className={'font-sans text-lg text-foreground-fixed mt-4'}>
                                        {step.title}
                                    </h4>
                                    <p className={'font-sans text-sm text-foreground-light-fixed mt-2.5'}>
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </BackgroundSlider>
        </section>
    );
}