import { useMemo } from 'react';
import { products } from '../data/products';
import { useFilterStore, SORT_OPTIONS } from '../store/filterStore';

export function useFilteredProducts() {
  const { category, tag, sort, search } = useFilterStore();

  return useMemo(() => {
    let result = [...products];

    // Поиск по названию, составу и описанию
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Категория (nav) — 'all' показывает всё
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Тег (filter pill)
    if (tag) {
      result = result.filter(p => p.tags.includes(tag));
    }

    // Сортировка
    switch (sort) {
      case SORT_OPTIONS.CHEAP:
        result = [...result].sort((a, b) => a.priceCurrent - b.priceCurrent);
        break;
      case SORT_OPTIONS.EXPENSIVE:
        result = [...result].sort((a, b) => b.priceCurrent - a.priceCurrent);
        break;
      case SORT_OPTIONS.NEW:
        result = [...result].sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0));
        break;
      case SORT_OPTIONS.SALE:
        result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // POPULAR — исходный порядок
        break;
    }

    return result;
  }, [category, tag, sort, search]);
}
