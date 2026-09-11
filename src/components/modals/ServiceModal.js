'use client';

import Modal from '@/components/modals/Modal';
import ServiceHero from '@/components/modals/service/ServiceHero';
import ServiceBenefits from '@/components/modals/service/ServiceBenefits';
import ServiceSymptoms from '@/components/modals/service/ServiceSymptoms';
import ServiceTrust from '@/components/modals/service/ServiceTrust';
import ServicePopular from '@/components/modals/service/ServicePopular';
import ServicePriceList from '@/components/modals/service/ServicePriceList';
import Contacts from '@/components/sections/Contacts/Contacts';
import ServiceContactForm from '@/components/modals/service/ServiceContactForm';
import { useSiteData } from '@/components/SiteDataProvider';
import { useModalStore } from '../../../public/store/useModalStore';

export default function ServiceModal() {
    const { servicesBySlug, sections } = useSiteData();
    const { activeModal, modalPayload, closeModal } = useModalStore();
    const isOpen = activeModal === 'service';
    const detail = servicesBySlug[modalPayload?.slug] ?? null;
    const contactsData = sections.find((section) => section.type === 'contacts');
    const contactFormData = sections.find((section) => section.type === 'contact_form');

    const relatedSlugs = detail?.branches?.filter(Boolean) ?? [];
    const filteredContacts = contactsData
        ? {
            ...contactsData,
            branches: relatedSlugs.length
                ? contactsData.branches.filter((branch) => relatedSlugs.includes(branch.slug))
                : contactsData.branches,
        }
        : contactsData;

    return (
        <Modal isOpen={isOpen && !!detail} onClose={closeModal} variant="sheet" showClose>
            {detail && (
                <div className="bg-background-secondary rounded-[30] text-foreground">
                    <ServiceHero data={detail} />
                    <ServiceBenefits title={detail.benefitsTitle} items={detail.benefits} />
                    <ServiceSymptoms title={detail.symptomsTitle} items={detail.symptoms} />
                    <ServiceTrust data={detail.trust} />
                    {detail.popular?.length > 0 && <ServicePopular title={detail.popularTitle} items={detail.popular} />}
                    <ServicePriceList title={detail.priceListTitle} items={detail.priceList} subtitle={detail.priceListSubTitle} />
                    {contactsData && <Contacts data={filteredContacts} embedded />}
                    {contactFormData && <ServiceContactForm data={contactFormData} />}
                </div>
            )}
        </Modal>
    );
}
