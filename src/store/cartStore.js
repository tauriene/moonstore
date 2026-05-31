import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Мигрирует старые .png пути в .webp после конвертации изображений
const migrateImageUrls = (items) =>
  items.map(item => ({
    ...item,
    product: {
      ...item.product,
      imageUrl: item.product.imageUrl?.replace(/\.png$/, '.webp') ?? item.product.imageUrl,
    },
  }));

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const existing = get().items.find(i => i.product.id === product.id);
        if (existing) {
          set({ items: get().items.map(i =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          )});
        } else {
          set({ items: [...get().items, { product, quantity: qty }] });
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter(i => i.product.id !== productId) }),

      updateQty: (productId, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter(i => i.product.id !== productId) });
        } else {
          set({ items: get().items.map(i =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          )});
        }
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'moonstore-cart',
      // Запускается после загрузки данных из localStorage
      onRehydrateStorage: () => (state) => {
        if (state?.items?.length) {
          state.items = migrateImageUrls(state.items);
        }
      },
    }
  )
);

// Реактивные селекторы (используем вместо геттеров)
export const selectTotalCount = (s) => s.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (s) => s.items.reduce((sum, i) => sum + i.product.priceCurrent * i.quantity, 0);
