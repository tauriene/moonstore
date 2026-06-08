import React from 'react';
import { useFilterStore, SORT_OPTIONS } from '../store/filterStore';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { products as allProducts } from '../data/products';
import CustomSelect from './CustomSelect';

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
      <span className="toolbar-count">
        Показано {filtered.length} из {allProducts.length} <span className="hide-on-mobile">букетов</span>
      </span>
      <div className="toolbar-sort">
        <span className="hide-on-mobile">Сортировка:</span>
        <CustomSelect 
          options={sortLabels}
          value={sort}
          onChange={setSort}
        />
      </div>
    </div>
  );
}

export default Toolbar;
