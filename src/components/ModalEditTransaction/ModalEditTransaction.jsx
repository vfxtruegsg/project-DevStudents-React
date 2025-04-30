import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEditModalOpen } from "../../redux/modal/selectors.js";
import { selectLoading } from "../../redux/transactions/selectors.js";
import { Loader } from "../Loader/Loader.jsx";

const ModalEditTransaction = () => {
  const dispatch = useDispatch();

  const isEditTransactionModalOpen = useSelector(selectIsEditModalOpen);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      {isLoading && <Loader />}
      <ModalTemplate
        isOpenModal={isEditTransactionModalOpen}
        className={css.modalContainer}
        modalContent={css.modalContent}
      >
        <div className={css.contentContainer}>
          <EditTransactionForm />
        </div>
      </ModalTemplate>
    </>
  );
};

export default ModalEditTransaction;
