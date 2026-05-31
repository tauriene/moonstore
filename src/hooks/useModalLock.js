import { useEffect } from 'react';

/**
 * Блокирует скролл body и закрывает по Escape.
 * Использовать вместо дублирующегося кода в CartDrawer и ProductModal.
 */
export function useModalLock(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
}
