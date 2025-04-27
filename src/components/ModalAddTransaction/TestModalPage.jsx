import { useState } from 'react';
import ModalAddTransaction from './ModalAddTransaction';
import AddTransactionForm from './AddTransactionForm';

const TestModalPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (data) => {
    if (!data) return setIsOpen(false); 
    console.log('Данные с формы:', data);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ModalAddTransaction onClose={() => setIsOpen(false)}>
          <AddTransactionForm
            onSubmit={handleSubmit}
            onCancel={() => setIsOpen(false)}
          />
        </ModalAddTransaction>
      )}
    </>
  );
};

export default TestModalPage;
