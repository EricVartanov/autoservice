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
import {getMockSection, getServiceDetail} from '@/lib/mock-data';
import {useModalStore} from '../../../public/store/useModalStore';

export default function ServiceModal() {
    const {activeModal, modalPayload, closeModal} = useModalStore();
    const isOpen = activeModal === 'service';
    const detail = getServiceDetail(modalPayload?.slug);
    const contactsData = getMockSection('contacts');
    const contactFormData = getMockSection('contact_form');

    return (
        <Modal isOpen={isOpen && !!detail} onClose={closeModal} variant="sheet" showClose>
            {detail && (
                <div className="bg-background-secondary rounded-[30] text-foreground">
                    <ServiceHero data={detail} />
                    <ServiceBenefits title={detail.benefitsTitle} items={detail.benefits} />
                    <ServiceSymptoms title={detail.symptomsTitle} items={detail.symptoms} />
                    <ServiceTrust data={detail.trust} />
                    <ServicePopular title={detail.popularTitle} items={detail.popular} />
                    <ServicePriceList title={detail.priceListTitle} items={detail.priceList} subtitle={detail.priceListSubTitle} />
                    {contactsData && <Contacts data={contactsData} embedded />}
                    {contactFormData && <ServiceContactForm data={contactFormData} />}
                </div>
            )}
        </Modal>
    );
}
