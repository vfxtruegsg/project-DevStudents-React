import { LoginForm } from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={`${css["login-page"]}`}>
      <div className={`container ${css["login-page-container"]}`}>
        <div className={css["company-logo"]}>
          <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
          <h1>Money Guard</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
