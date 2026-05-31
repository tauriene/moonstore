import React from 'react';
import { BsLightningFill } from 'react-icons/bs';
import { useFilterStore, SORT_OPTIONS } from '../store/filterStore';

const navItems = [
  { label: 'Все букеты', category: 'all' },
  { label: 'Розы', category: 'roses' },
  { label: 'Тюльпаны', category: 'tulips' },
  { label: 'Пионовидные', category: 'peonies' },
  { label: 'Хризантемы', category: 'chrysanthemums' },
  { label: 'Полевые', category: 'field' },
  { label: 'Экспресс', category: 'express', special: true, icon: <BsLightningFill /> },
  { label: 'Букет невесты', category: 'bridal' },
  { label: 'Новая коллекция', category: 'new' },
  { label: 'Корпоративные', category: 'corporate' },
];

function Nav() {
  const { category, setCategory } = useFilterStore();

  return (
    <nav>
      {navItems.map((item) => (
        <button
          key={item.category}
          className={`nav-link ${category === item.category ? 'active' : ''} ${item.special ? 'special' : ''}`}
          onClick={() => setCategory(item.category)}
        >
          {item.icon && <span style={{ marginRight: '4px', display: 'inline-flex', alignItems: 'center' }}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Nav;
