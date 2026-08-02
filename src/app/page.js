import { mockPage } from '@/lib/mock-data';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesSlider from '@/components/sections/ServicesSlider';
import Gallery from '@/components/sections/Gallery';
import News from '@/components/sections/News';
import ContactForm from '@/components/sections/ContactForm';

const SECTION_MAP = {
    hero: Hero,
    about: About,
    services_slider: ServicesSlider,
    gallery: Gallery,
    news: News,
    contact_form: ContactForm,
};

export default function Home() {
    return (
        <main>
            {mockPage.sections.map((section, i) => {
                const Component = SECTION_MAP[section.type];
                if (!Component) return null;
                return <Component key={i} {...section} />;
            })}
        </main>
    );
}
