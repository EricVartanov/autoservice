import { muller, helveticaNeue, helvetica, roboto, sfPro, neueHaas } from './fonts';
import './globals.css';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import LenisProvider from '@/components/LenisProvider';
import CallModal from "@/components/modals/CallModal";
import ServiceModal from "@/components/modals/ServiceModal";
import SpecialOfferModal from "@/components/modals/SpecialOfferModal";
import LegalModal from "@/components/modals/LegalModal";
import PanoramaModal from "@/components/modals/PanoramaModal";
import AboutVideoModal from "@/components/modals/AboutVideoModal";
import { SiteDataProvider } from '@/components/SiteDataProvider';
import { loadSiteData } from '@/lib/wp/load';

const fontVariables = [
    muller.variable,
    helveticaNeue.variable,
    helvetica.variable,
    roboto.variable,
    sfPro.variable,
    neueHaas.variable,
].join(' ');

export async function generateMetadata() {
    const data = await loadSiteData();
    return {
        title: data.site.seo.title,
        description: data.site.seo.description,
    };
}

export default async function RootLayout({ children }) {
    const data = await loadSiteData();

    return (
        <html lang="ru" className={fontVariables} suppressHydrationWarning>
            <body className={'overflow-x-hidden'}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <SiteDataProvider value={data}>
                        <LenisProvider>
                            <Header />
                            {children}
                            <Footer />
                            <CallModal />
                            <ServiceModal />
                            <SpecialOfferModal />
                            <LegalModal />
                            <PanoramaModal />
                            <AboutVideoModal />
                        </LenisProvider>
                    </SiteDataProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
