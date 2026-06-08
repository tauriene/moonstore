import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../store/filterStore';

function Footer() {
  const navigate = useNavigate();
  const { setCategory, setTag } = useFilterStore();

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setCategory(category);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    setTag(tag);
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <footer>
        <div className="footer-logo">
          <div className="logo">
            <span className="logo-name">MOONSTORE</span>
            <span className="logo-sub" style={{ marginTop: '4px' }}>Flower Studio</span>
          </div>
          <p>Авторская флористика. Доставка по Москве и области. Работаем ежедневно, круглосуточно.</p>
        </div>
        <div>
          <h4>Каталог</h4>
          <ul>
            <li><a href="/" onClick={(e) => handleCategoryClick(e, 'all')}>Все букеты</a></li>
            <li><a href="/" onClick={(e) => handleCategoryClick(e, 'roses')}>Розы</a></li>
            <li><a href="/" onClick={(e) => handleCategoryClick(e, 'peonies')}>Пионовидные</a></li>
            <li><a href="/" onClick={(e) => handleTagClick(e, 'premium')}>Premium</a></li>
            <li><a href="/" onClick={(e) => handleTagClick(e, 'new')}>Новая коллекция</a></li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:88005501900">+7 (800) 550-19-00</a></li>
            <li><a href="https://t.me/moonstoremoskwa_bot" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><a href="mailto:info@moonstore.ru">info@moonstore.ru</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2024 MOONSTORE Flower Studio. Все права защищены.</p>
        <p>Политика конфиденциальности · Оферта</p>
      </div>
    </>
  );
}

export default Footer;
