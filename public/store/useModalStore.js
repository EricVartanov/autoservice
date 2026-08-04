import { create } from 'zustand';

export const useModalStore = create((set) => ({
    activeModal: null, // 'call' | 'review' | null
    openModal: (name) => set({ activeModal: name }),
    closeModal: () => set({ activeModal: null }),
}));