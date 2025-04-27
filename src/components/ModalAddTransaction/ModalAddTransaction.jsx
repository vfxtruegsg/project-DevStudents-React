import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalAddTransaction.css';

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
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <button className="close-button" onClick={onClose}><img src="/close.svg" alt="Plus" width="18" height="18" /></button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalAddTransaction;


