import { mockPage } from '@/lib/mock-data';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Services/Services';
import Statistic from "@/components/sections/Statistic/Statistic";

const SECTION_MAP = {
    hero: Hero,
    about: About,
    statistic: Statistic,
    services: Services,
};

export default function Home() {
    return (
        <main>
            {mockPage.sections.map((section, i) => {
                const Component = SECTION_MAP[section.type];
                if (!Component) return null;
                return <Component key={i} {...section} data={section} />;
            })}
        </main>
    );
}
