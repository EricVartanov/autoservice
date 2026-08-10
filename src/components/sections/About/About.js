import {Container} from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Icon from "@/components/icons/Icon";
import QualityCard from "@/components/sections/About/QualityCard";
import Statistic from "@/components/sections/About/Statistic";

export default function About({data}) {

    const {titleBack, cards, title, subtitle, stats} = data
    return (
        <section className="overflow-hidden">
            <div className={'relative py-[150] max-lg:py-20 max-md:py-14'}>
                <Container>
                    <SectionTitle titleBack={titleBack} title={title} subtitle={subtitle} />

                    <div className="relative mx-auto mt-20 flex justify-center items-center gap-7 max-lg:flex-col max-lg:items-stretch max-lg:gap-5 max-md:mt-12 max-md:gap-4">
                        {cards.map((card) => (
                            <QualityCard key={card.title} card={card}/>
                        ))}

                        {/* декоративные точки */}
                        <div className="absolute z-[-1] w-[134] top-[-12%] left-[-2%] hidden md:block">
                            <Icon name={'dots'} className={'text-primary-light w-[134]'} />
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

