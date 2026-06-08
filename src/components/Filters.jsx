import React from 'react';
import { BsFire, BsStars, BsGem, BsLightningFill, BsPalette, BsGift } from 'react-icons/bs';
import { GiFlowerEmblem, GiPlantSeed } from 'react-icons/gi';
import { useFilterStore } from '../store/filterStore';

const filters = [
  { icon: <BsFire />, label: 'Скидки', tag: 'sale' },
  { icon: <BsLightningFill />, label: 'Экспресс', tag: 'express' },
  { icon: <BsStars />, label: 'Новинки', tag: 'new' },
  { icon: <BsGem />, label: 'Premium', tag: 'premium' },
  { icon: <GiFlowerEmblem />, label: 'Тренды', tag: 'trend' },
  { icon: <BsPalette />, label: 'Авторские', tag: 'author' },
  { icon: <GiPlantSeed />, label: 'Необычное', tag: 'unusual' },
  { icon: <BsGift />, label: 'На любой случай', tag: 'gift' },
];

function Filters() {
  const { tag, setTag } = useFilterStore();

  return (
    <div className="filters">
      {filters.map((item) => (
        <button
          key={item.tag}
          className={`filter-pill ${tag === item.tag ? 'active' : ''}`}
          onClick={() => setTag(tag === item.tag ? null : item.tag)}
        >
          <span className="pill-icon">{item.icon}</span> {item.label}
        </button>
      ))}
    </div>
  );
}

export default Filters;
