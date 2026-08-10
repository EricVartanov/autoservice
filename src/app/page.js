import { mockPage } from '@/lib/mock-data';
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

const SECTION_MAP = {
    hero: Hero,
    about: About,
    services: Services,
    steps: Steps,
    // team: Team,
    // specialOffer: SpecialOffer,
    // reviews: Reviews,
    // faq: Faq,
    // commercial: Commercial,
    // contact_form: ContactForm,
    // contacts: Contacts,
    // feedback: Feedback,
};

/** Ordered section meta for scroll indicator (must match mockPage.sections order). */
const LANDING_SECTIONS = [
    { id: 'hero', theme: 'dark' },
    { id: 'about', theme: 'light' },
    { id: 'services', theme: 'light' },
    { id: 'steps', theme: 'dark' },
    { id: 'team', theme: 'light' },
    { id: 'specialOffer', theme: 'dark' },
    { id: 'reviews', theme: 'light' },
    { id: 'commercial', theme: 'dark' },
    { id: 'faq', theme: 'light' },
    { id: 'contact-form', theme: 'dark' },
    { id: 'contacts', theme: 'light' },
    { id: 'feedback', theme: 'light' },
];

export default function Home() {
    return (
        <main>
            <SectionIndicator sections={LANDING_SECTIONS} />
            {mockPage.sections.map((section, i) => {
                const Component = SECTION_MAP[section.type];
                if (!Component) return null;
                const meta = LANDING_SECTIONS[i];
                return (
                    <div key={meta?.id ?? i} id={meta?.id}>
                        <Component {...section} data={section} />
                    </div>
                );
            })}
        </main>
    );
}
