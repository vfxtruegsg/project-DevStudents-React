import ReactDOM from "react-dom";
import css from "./ModalAddTransaction.module.css";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddModalOpen } from "../../redux/modal/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectLoading } from "../../redux/transactions/selectors.js";

const ModalAddTransaction = () => {
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const isAddTransactionModalOpen = useSelector(selectIsAddModalOpen);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      {isLoading && <Loader />}
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
