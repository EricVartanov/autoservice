// components/modals/CallModal.jsx
'use client';
import Modal from './Modal';
import {mockBranches, site} from "@/lib/mock-data";
import {useModalStore} from "../../../public/store/useModalStore";

export default function CallModal() {
    const {activeModal, closeModal} = useModalStore();

    return (
        <Modal isOpen={activeModal === 'call'} onClose={closeModal}>
            <h3 className="text-white text-lg font-semibold mb-4">{site.callModal.title}</h3>
            <div className="flex flex-col gap-3">
                {mockBranches.map((b) => (

                    <a key={b.id}
                       href={`tel:${b.phone.replace(/\D/g, '')}`}
                       className="flex flex-col p-4 rounded-xl border border-white/10 hover:bg-white/5 transition"
                    >
                        <span className="text-white font-medium">{b.name}</span>
                        <span className="text-white/60 text-sm">{b.address}</span>
                        <span className="text-red-500 mt-1">{b.phone}</span>
                    </a>
                ))}
            </div>
        </Modal>
    );
}