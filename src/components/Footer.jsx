import React from 'react';

function Footer() {
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
            <li><a href="#">Все букеты</a></li>
            <li><a href="#">Розы</a></li>
            <li><a href="#">Пионовидные</a></li>
            <li><a href="#">Premium</a></li>
            <li><a href="#">Новая коллекция</a></li>
          </ul>
        </div>
        <div>
          <h4>Компания</h4>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Флористы</a></li>
            <li><a href="#">Доставка и оплата</a></li>
            <li><a href="#">Отзывы</a></li>
            <li><a href="#">Блог</a></li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:88005501900">8 800 550 19 00</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">info@moonstore.ru</a></li>
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
