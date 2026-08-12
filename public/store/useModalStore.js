import { create } from 'zustand';

export const useModalStore = create((set) => ({
    activeModal: null, // 'call' | 'service' | null
    modalPayload: null,
    openModal: (name, payload = null) => set({ activeModal: name, modalPayload: payload }),
    closeModal: () => set({ activeModal: null, modalPayload: null }),
}));
