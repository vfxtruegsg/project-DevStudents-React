import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.wrapper}>
      <nav className={css.nav}>
        <NavLink to="/" className={css.linkLogo}>
          <div className={css.companyLogo}>
            <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
            <p className={css.textLogo}>Money&nbsp;Guard</p>
          </div>
        </NavLink>
        <div className={css.loginWrapper}>
          <NavLink to="/" className={css.linkName}>
            <div className={css.nameWrapper}>
              <p className={css.name}>Name</p>
            </div>
          </NavLink>
          <hr className={css.customHr} />
          <NavLink to="/logout" className={css.linkExit}>
            <div className={css.exitWrapper}>
              <img className={css.exitIcon} src="/exit.svg" alt="Exit-logo" />
              <span className={css.exitText}>Exit</span>
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
export default Header;
