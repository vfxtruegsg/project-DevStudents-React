import { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./ModalAddTransaction.module.css";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddModalOpen } from "../../redux/modal/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { selectisAuthLoading } from "../../redux/auth/selectors.js";
import { closeModal } from "../../redux/modal/slice.js";

// const ModalAddTransaction = ({ onClose, children }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [onClose]);

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   return ReactDOM.createPortal(
//     <div className={css.modalBackdrop} onClick={handleBackdropClick}>
//       <div className={css.modal}>
//         <button className={css.closeButton} onClick={onClose}>
//           <img src="/close.svg" alt="Close" width="18" height="18" />
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

const ModalAddTransaction = () => {
  const dispatch = useDispatch();

  const isAddTransactionModalOpen = useSelector(selectIsAddModalOpen);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <ModalTemplate
        isOpenModal={isAddTransactionModalOpen}
        className={css.modalContainer}
        modalContent={css.modalContent}
      >
        <div className={css.contentContainer}>
          <AddTransactionForm onCancel={handleModalClose} />
        </div>
      </ModalTemplate>
    </>
  );
};

export default ModalAddTransaction;
