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
import {site} from '@/lib/mock-data';

const fontVariables = [
    muller.variable,
    helveticaNeue.variable,
    helvetica.variable,
    roboto.variable,
    sfPro.variable,
    neueHaas.variable,
].join(' ');

export const metadata = {
    title: site.seo.title,
    description: site.seo.description,
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru" className={fontVariables} suppressHydrationWarning>
            <body className={'overflow-x-hidden'}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <LenisProvider>
                        <Header />
                        {children}
                        <Footer />
                        <CallModal />
                        <ServiceModal />
                        <SpecialOfferModal />
                        <LegalModal />
                        <PanoramaModal />
                    </LenisProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
