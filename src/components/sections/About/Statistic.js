import {Container} from "@/components/Container";
import StatBlock from "@/components/sections/About/StatBlock";

export default function Statistic({data}) {
    return (
        <section className={'py-20 bg-primary'}>
            <Container>
                <div className={'flex justify-between gap-24'}>
                    {data.map((stat) => (
                        <StatBlock key={stat.id} data={stat}/>
                    ))}
                </div>
            </Container>
        </section>
    );
}