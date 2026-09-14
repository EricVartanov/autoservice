import { loadSiteData } from '@/lib/wp/load';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Services/Services';
import Steps from "@/components/sections/Steps/Steps";
import Team from "@/components/sections/Team/Team";
import SpecialOffer from "@/components/sections/SpecialOffer/SpecialOffer";
import Reviews from "@/components/sections/Reviews/Reviews";
import Commercial from "@/components/sections/Commercial/Commercial";
import Faq from "@/components/sections/Faq/Faq";
import ContactForm from "@/components/sections/ContactForm/ContactForm";
import Contacts from "@/components/sections/Contacts/Contacts";
import Feedback from "@/components/sections/Feedback/Feedback";
import SectionIndicator from '@/components/ui/SectionIndicator';
import HashScroll from '@/components/HashScroll';
import { LANDING_SECTIONS } from '@/lib/landingSections';

const SECTION_MAP = {
    hero: Hero,
    about: About,
    services: Services,
    steps: Steps,
    team: Team,
    specialOffer: SpecialOffer,
    reviews: Reviews,
    commercial: Commercial,
    faq: Faq,
    contact_form: ContactForm,
    contacts: Contacts,
    feedback: Feedback,
};

export default async function Home() {
    const {sections} = await loadSiteData();

    return (
        <main>
            <HashScroll />
            <SectionIndicator sections={LANDING_SECTIONS} />
            {sections.map((section, i) => {
                const Component = SECTION_MAP[section.type];
                if (!Component) return null;
                const meta = LANDING_SECTIONS[i];
                return (
                    <div key={meta?.id ?? i} id={meta?.id} className={meta?.className}>
                        <Component {...section} data={section} />
                    </div>
                );
            })}
        </main>
    );
}
