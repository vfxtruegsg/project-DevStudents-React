import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import LogoutModal from "../LogoutModal/LogoutModal.jsx";
import { useState } from "react";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectUser);
  const userName = isLoggedIn ? getMailboxName(userEmail.email) : null;

  function getMailboxName(emailAddress) {
    const parts = emailAddress.split("@");
    if (parts.length === 2) {
      return parts[0];
    } else {
      return null;
    }
  }

  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);

  return (
    <>
      {logoutModalIsOpen && <LogoutModal modalIsOpen={setLogoutModalIsOpen} />}
      <header className={css.wrapper}>
        <nav className={css.nav}>
          <div className={css.companyLogo}>
            <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
            <p className={css.textLogo}>Money&nbsp;Guard</p>
          </div>
          <div className={css.loginWrapper}>
            <button
              // onClick={handleClickUserModal}
              className={css.linkName}
              type="button"
            >
              <div className={css.nameWrapper}>
                <p className={css.name}>{userName}</p>
              </div>
            </button>
            <hr className={css.customHr} />
            <button
              onClick={() => {
                setLogoutModalIsOpen(true);
              }}
              className={css.linkExit}
              type="button"
            >
              <div className={css.exitWrapper}>
                <img className={css.exitIcon} src="/exit.svg" alt="Exit-logo" />
                <span className={css.exitText}>Exit</span>
              </div>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
