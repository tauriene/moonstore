import { create } from 'zustand';

export const SORT_OPTIONS = {
  POPULAR: 'popular',
  CHEAP: 'cheap',
  EXPENSIVE: 'expensive',
  NEW: 'new',
  SALE: 'sale',
};

export const useFilterStore = create((set) => ({
  category: 'all',
  tag: null,
  sort: SORT_OPTIONS.POPULAR,
  search: '',

  setCategory: (category) => set({ category, tag: null }),
  setTag: (tag) => set({ tag }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  reset: () => set({ category: 'all', tag: null, sort: SORT_OPTIONS.POPULAR, search: '' }),
}));
