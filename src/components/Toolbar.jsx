import React from 'react';
import { useFilterStore, SORT_OPTIONS } from '../store/filterStore';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { products as allProducts } from '../data/products';

const sortLabels = [
  { value: SORT_OPTIONS.POPULAR, label: 'Популярные' },
  { value: SORT_OPTIONS.CHEAP, label: 'Сначала дешевле' },
  { value: SORT_OPTIONS.EXPENSIVE, label: 'Сначала дороже' },
  { value: SORT_OPTIONS.NEW, label: 'Новинки' },
  { value: SORT_OPTIONS.SALE, label: 'По скидке' },
];

function Toolbar() {
  const filtered = useFilteredProducts();
  const { sort, setSort } = useFilterStore();

  return (
    <div className="toolbar" style={{ marginTop: '32px' }}>
      <span className="toolbar-count">Показано {filtered.length} из {allProducts.length} букетов</span>
      <div className="toolbar-sort">
        <span>Сортировка:</span>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          {sortLabels.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
