import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Icon from "@/components/icons/Icon";
import QualityCard from "@/components/sections/About/QualityCard";
import Statistic from "@/components/sections/About/Statistic";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About({data}) {

    const {titleBack, cards, title, subtitle, stats} = data
    return (
        <section className="overflow-hidden">
            <div className={'relative lg:py-[150] pt-10 pb-20 md:py-20'}>
                <Container>
                    <SectionTitle titleBack={titleBack} title={title} subtitle={subtitle} />

                    <div className="relative mx-auto mt-[45] md:mt-[50] lg:mt-20">
                        <ScrollReveal
                            stagger
                            className="flex flex-col items-stretch gap-4 lg:gap-7 lg:flex-row lg:justify-center lg:items-center"
                        >
                            {cards.map((card) => (
                                <QualityCard key={card.title} card={card}/>
                            ))}
                        </ScrollReveal>

                        {/* декоративные точки */}
                        <div className="absolute z-[-1] left-[-2%] top-[-7%] md:top-[10%] md:left-[-6%] h-[72] lg:top-[-12%] lg:left-[-2%]">
                            <Icon name={'dots'} className={'text-primary-light w-[72] md:w-[134]'} />
                        </div>
                    </div>
                </Container>
            </div>
            <div>
                <Statistic data={stats} />
            </div>
        </section>
    );
}
