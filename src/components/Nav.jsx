import React from 'react';
import { useFilterStore } from '../store/filterStore';

const navItems = [
  { label: 'Все букеты', category: 'all' },
  { label: 'Розы', category: 'roses' },
  { label: 'Тюльпаны', category: 'tulips' },
  { label: 'Пионовидные', category: 'peonies' },
  { label: 'Хризантемы', category: 'chrysanthemums' },
  { label: 'Полевые', category: 'field' },
  { label: 'Монобукеты', category: 'mono' },
  { label: 'Букет невесты', category: 'bridal' },
  { label: 'Корпоративные', category: 'corporate' },
];

function Nav() {
  const { category, setCategory } = useFilterStore();

  return (
    <nav>
      {navItems.map((item) => (
        <button
          key={item.category}
          className={`nav-link ${category === item.category ? 'active' : ''}`}
          onClick={() => setCategory(item.category)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Nav;
