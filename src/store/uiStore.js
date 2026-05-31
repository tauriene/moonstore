import { create } from 'zustand';

export const useUIStore = create((set) => ({
  cartOpen: false,
  modalProduct: null,
  
  setCartOpen: (open) => set({ cartOpen: open }),
  openModal: (product) => set({ modalProduct: product }),
  closeModal: () => set({ modalProduct: null }),
}));
