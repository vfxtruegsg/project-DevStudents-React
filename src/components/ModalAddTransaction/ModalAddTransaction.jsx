import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './ModalAddTransaction.module.css';

const ModalAddTransaction = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          <img src="/close.svg" alt="Close" width="18" height="18" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalAddTransaction;


