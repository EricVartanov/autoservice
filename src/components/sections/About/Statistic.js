import {Container} from "@/components/Container";
import StatBlock from "@/components/sections/About/StatBlock";

export default function Statistic({data}) {
    return (
        <section className={'py-20 max-md:py-12 bg-primary'}>
            <Container>
                <div className={'flex justify-between gap-24 max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-10 max-md:gap-x-4 max-md:gap-y-8'}>
                    {data.map((stat) => (
                        <StatBlock key={stat.id} data={stat}/>
                    ))}
                </div>
            </Container>
        </section>
    );
}