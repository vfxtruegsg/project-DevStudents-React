import { useEffect, useState } from "react";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "../EditTransactionForm/EditTransactionForm.module.css";

export default function ModalEditTransaction({ tx, onClose, onSuccess }) {
  const [hide, setHide] = useState(false);

  const close = () => {
    setHide(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.code === "Escape") {
        console.log("Escape pressed");
        close();
      }
    };

    document.addEventListener("keydown", escHandler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`${css["edittransactionform-overlay"]} ${
        hide ? css["edittransactionform-overlay-hide"] : ""
      }`}
      onClick={close}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <EditTransactionForm tx={tx} onClose={close} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
