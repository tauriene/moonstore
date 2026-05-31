import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/format';

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const totalPrice = items.reduce((sum, item) => sum + (item.product.priceCurrent * item.quantity), 0);
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    delivery: 'courier', address: '', time: '',
    payment: 'card'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Обязательное поле';
    if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Некорректный номер телефона';
    if (formData.delivery === 'courier' && !formData.address.trim()) newErrors.address = 'Укажите адрес доставки';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div style={{ padding: '120px 48px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0e0e0e" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', marginBottom: '16px' }}>Заказ принят!</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
            Наш менеджер свяжется с вами в течение 5 минут для подтверждения деталей.
          </p>
          <button className="banner-btn" onClick={() => navigate('/')}>Вернуться в каталог</button>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div style={{ padding: '80px 48px', textAlign: 'center' }}>
          <h2>Ваша корзина пуста</h2>
          <button className="banner-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>В каталог</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="checkout-page">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', marginBottom: '32px' }}>Оформление заказа</h1>
        
        <div className="checkout-grid">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <section className="checkout-section">
                <h3>1. Ваши данные</h3>
                <div className="form-group">
                  <label>Имя *</label>
                  <input type="text" className={errors.name ? 'error' : ''} value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); setErrors(prev => ({...prev, name: undefined})); }} placeholder="Иван Иванов" />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input type="tel" className={errors.phone ? 'error' : ''} value={formData.phone} onChange={e => { setFormData({...formData, phone: e.target.value}); setErrors(prev => ({...prev, phone: undefined})); }} placeholder="+7 (999) 000-00-00" />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="ivan@example.com" />
                </div>
              </section>

              <section className="checkout-section">
                <h3>2. Доставка</h3>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="delivery" value="courier" checked={formData.delivery === 'courier'} onChange={e => setFormData({...formData, delivery: e.target.value})} />
                    <span className="radio-custom"></span> Курьером (от 60 мин)
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="delivery" value="pickup" checked={formData.delivery === 'pickup'} onChange={e => setFormData({...formData, delivery: e.target.value})} />
                    <span className="radio-custom"></span> Самовывоз (скидка 5%)
                  </label>
                </div>
                
                {formData.delivery === 'courier' && (
                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Адрес доставки *</label>
                    <input type="text" className={errors.address ? 'error' : ''} value={formData.address} onChange={e => { setFormData({...formData, address: e.target.value}); setErrors(prev => ({...prev, address: undefined})); }} placeholder="г. Москва, ул. Ленина, д. 1, кв. 1" />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>
                )}
                
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>Дата и время</label>
                  <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="Как можно скорее" />
                </div>
              </section>

              <section className="checkout-section">
                <h3>3. Оплата</h3>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={e => setFormData({...formData, payment: e.target.value})} />
                    <span className="radio-custom"></span> Онлайн картой
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="payment" value="cash" checked={formData.payment === 'cash'} onChange={e => setFormData({...formData, payment: e.target.value})} />
                    <span className="radio-custom"></span> Наличными курьеру
                  </label>
                </div>
              </section>

              <button type="submit" className="banner-btn submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
              </button>
            </form>
          </div>

          <div className="checkout-sidebar">
            <div className="summary-box">
              <h3>Ваш заказ</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.product.id} className="summary-item">
                    <div className="summary-item-name">{item.product.name} × {item.quantity}</div>
                    <div className="summary-item-price">{formatPrice(item.product.priceCurrent * item.quantity)}</div>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Итого к оплате:</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;
