import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../store/filterStore';

function EditorialBanner() {
  const navigate = useNavigate();
  const setCategory = useFilterStore(s => s.setCategory);

  const handleClick = () => {
    useFilterStore.getState().setCategory('all');
    useFilterStore.getState().setTag('author');
    
    // Плавный скролл к каталогу (к тулбару или сетке товаров)
    setTimeout(() => {
      const toolbar = document.querySelector('.toolbar');
      if (toolbar) {
        window.scrollTo({
          top: toolbar.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className="editorial-banner">
      <div className="banner-text">
        <h2>Новая коллекция<br/><em>«Лунный свет»</em></h2>
        <p>Пастельные оттенки, нежная флористика и авторские решения нашего главного флориста. Каждый букет — маленькое произведение.</p>
      </div>
      <button className="banner-btn" onClick={handleClick}>Смотреть коллекцию</button>
    </div>
  );
}

export default EditorialBanner;
