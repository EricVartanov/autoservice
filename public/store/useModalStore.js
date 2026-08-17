import { create } from 'zustand';

export const useModalStore = create((set) => ({
    activeModal: null, // 'call' | 'service' | null
    modalPayload: null,
    legalSlug: null,
    openModal: (name, payload = null) => set({ activeModal: name, modalPayload: payload }),
    closeModal: () => set({ activeModal: null, modalPayload: null }),
    openLegal: (slug) => set({ legalSlug: slug }),
    closeLegal: () => set({ legalSlug: null }),
}));
