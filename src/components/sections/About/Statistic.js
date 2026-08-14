import {Container} from "@/components/Container";
import StatBlock from "@/components/sections/About/StatBlock";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Statistic({data}) {
    return (
        <section className={'py-[60] md:py-20 bg-primary'}>
            <Container>
                <ScrollReveal
                    stagger
                    className={'flex lg:justify-between justify-center flex-wrap lg:flex-nowrap gap-x-1 gap-y-5 md:gap-x-10 md:gap-y-[30]'}
                >
                    {data.map((stat) => (
                        <div key={stat.id}  className={'w-[calc(50%-2px)] md:w-[calc(50%-20px)] lg:w-1/4'}>
                            <StatBlock data={stat}/>
                        </div>
                    ))}
                </ScrollReveal>
            </Container>
        </section>
    );
}
