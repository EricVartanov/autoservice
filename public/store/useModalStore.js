import { create } from 'zustand';

export const useModalStore = create((set) => ({
    activeModal: null, // 'call' | 'service' | 'specialOffer' | 'commercial' | null
    modalPayload: null,
    legalSlug: null,
    panoramaUrl: null,
    openModal: (name, payload = null) => set({ activeModal: name, modalPayload: payload }),
    closeModal: () => set({ activeModal: null, modalPayload: null }),
    openLegal: (slug) => set({ legalSlug: slug }),
    closeLegal: () => set({ legalSlug: null }),
    openPanorama: (url) => set({ panoramaUrl: url }),
    closePanorama: () => set({ panoramaUrl: null }),
}));
