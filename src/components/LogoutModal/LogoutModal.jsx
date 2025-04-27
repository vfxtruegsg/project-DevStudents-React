import { useState } from "react";
import css from "./LogoutModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations.js";
import { ModalTemplate } from "../ModalTemplate/ModalTemplate.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsLogOutModalOpen } from "../../redux/modal/selectors.js";

function LogoutModal() {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => dispatch(closeModal()));
  };

  const isLogoutModalOpen = useSelector(selectIsLogOutModalOpen);

  return (
    <ModalTemplate isOpenModal={isLogoutModalOpen}>
      <div className={`${css.logoutContainer} container`}>
        <div className={css.backdrop}>
          <div className={css.companyLogo}>
            <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
            <p className={css.textLogo}>Money&nbsp;Guard</p>
          </div>
          <div className={css.textWrapper}>
            <p className={css.text}>Are you sure you want to log out?</p>
          </div>

          <button
            onClick={handleClickLogout}
            className={`btn-gradient ${css.btn}`}
            type="button"
            style={{ marginBottom: 20 }}
          >
            logout
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className={`btn-classic ${css.btn}`}
            type="button"
          >
            cancel
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}

export default LogoutModal;
