'use client';

import Modal from '@/components/modals/Modal';
import {useModalStore} from '../../../public/store/useModalStore';

export default function SpecialOfferModal() {
    const {activeModal, modalPayload, closeModal} = useModalStore();
    const isOpen = (activeModal === 'specialOffer' || activeModal === 'commercial') && !!modalPayload;
    const {detailsHtml} = modalPayload ?? {};

    return (
        <Modal isOpen={isOpen} onClose={closeModal} variant="sheet" centered showClose>
            {modalPayload && (
                <div className="rounded-[20] bg-background text-foreground md:rounded-[30]">
                    {detailsHtml && (
                        <div
                            className="px-2.5 py-10 font-helvetica text-sm leading-relaxed md:px-[30] md:py-12 md:text-lg md:leading-7 lg:px-20 lg:py-20
                                [&_p]:mb-4 [&_p]:last:mb-0"
                            dangerouslySetInnerHTML={{__html: detailsHtml}}
                        />
                    )}
                </div>
            )}
        </Modal>
    );
}
