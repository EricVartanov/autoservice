'use client';

import Modal from '@/components/modals/Modal';
import {getLegalDoc} from '@/lib/mock-legal';
import {useModalStore} from '../../../public/store/useModalStore';
import {site} from '@/lib/mock-data';

function formatRuDate(iso) {
    const [year, month, day] = iso.split('-');
    return `${day}.${month}.${year}`;
}

export default function LegalModal() {
    const {legalSlug, closeLegal} = useModalStore();
    const doc = getLegalDoc(legalSlug);

    return (
        <Modal isOpen={!!doc} onClose={closeLegal} variant="legal" showClose>
            {doc && (
                <div
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-10"
                    data-lenis-prevent
                >
                    <h1 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-black md:text-[32px]">
                        {doc.title}
                    </h1>
                    {doc.updatedAt && (
                        <p className="mt-2 font-helvetica text-sm text-neutral-500 md:text-base">
                            {site.labels.legalUpdated}: {formatRuDate(doc.updatedAt)}
                        </p>
                    )}
                    <div
                        className="legal-content mt-6 font-helvetica text-sm leading-relaxed text-black md:text-base
                            [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:leading-snug md:[&_h2]:text-lg
                            [&_p]:mb-3 [&_p]:leading-relaxed
                            [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                            [&_li]:leading-relaxed
                            [&_strong]:font-bold
                            [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-70"
                        dangerouslySetInnerHTML={{__html: doc.html}}
                    />
                </div>
            )}
        </Modal>
    );
}
