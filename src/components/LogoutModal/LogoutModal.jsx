import { useState } from "react";
import css from "./LogoutModal.module.css";
import { Link } from "react-router-dom";

function LogoutModal() {
  const handleClickLogout = () => {
    alert("You are logged out!");
  };
  const handleClickClosed = () => {
    alert("I closed myself!");
  };
  return (
    <div className={`container ${css.logoutContainer}`}>
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
          className={`btn-gradient ${css.logoutBtn}`}
          type="button"
        >
          cancel
        </button>
        <button
          onClick={handleClickClosed}
          className={`btn-classic`}
          type="button"
        >
          cancel
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
