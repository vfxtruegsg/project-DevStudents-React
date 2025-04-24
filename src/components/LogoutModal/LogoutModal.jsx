import css from "./LogoutModal.module.css";
import { Link } from "react-router-dom";

function LogoutModal() {
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

        <button className={`btn-gradient ${css.logoutBtn}`} type="submit">
          logout
        </button>

        <Link to="/" className={`btn-classic`} style={{ display: "block" }}>
          cancel
        </Link>
      </div>
    </div>
  );
}

export default LogoutModal;
