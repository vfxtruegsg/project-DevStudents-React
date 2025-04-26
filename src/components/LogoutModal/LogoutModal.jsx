import { useDispatch } from "react-redux";
import css from "./LogoutModal.module.css";
import { logoutThunk } from "../../redux/auth/operations.js";

function LogoutModal({ modalIsOpen }) {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className={css.logoutContainer}>
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
          logout
        </button>
        <button
          onClick={() => {
            modalIsOpen(false);
          }}
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
