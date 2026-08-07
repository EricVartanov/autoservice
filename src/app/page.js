import { mockPage } from '@/lib/mock-data';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Services/Services';
import Statistic from "@/components/sections/Statistic/Statistic";
import Steps from "@/components/sections/Steps/Steps";
import Team from "@/components/sections/Team/Team";
import SpecialOffer from "@/components/sections/SpecialOffer/SpecialOffer";
import Reviews from "@/components/sections/Reviews/Reviews";
import Commercial from "@/components/sections/Commercial/Commercial";
import Faq from "@/components/sections/Faq/Faq";

const SECTION_MAP = {
    hero: Hero,
    about: About,
    statistic: Statistic,
    services: Services,
    steps: Steps,
    team: Team,
    specialOffer: SpecialOffer,
    reviews: Reviews,
    faq: Faq,
    commercial: Commercial,
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
