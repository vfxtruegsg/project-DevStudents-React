import Modal from "react-modal";
import { useDispatch } from "react-redux";
import s from "./ModalTemplate.module.css";
import { closeModal } from "../../redux/modal/slice.js";
import { useEffect } from "react";

Modal.setAppElement("#root");

export const ModalTemplate = ({
  children,
  isOpenModal,
  className = "",
  modalContent,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenModal) {
      document.documentElement.classList.add(s.noScroll);
    } else {
      document.documentElement.classList.remove(s.noScroll);
    }

    return () => {
      document.documentElement.classList.remove(s.noScroll);
    };
  }, [isOpenModal]);

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={() => dispatch(closeModal())}
      bodyOpenClassName={s.html}
      className={`${className}`}
      overlayClassName={`${s.overlay}`}
      preventScroll={false}
    >
      <div className={modalContent}>{children}</div>
    </Modal>
  );
};
