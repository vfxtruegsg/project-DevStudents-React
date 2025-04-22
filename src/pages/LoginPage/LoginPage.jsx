import { LoginForm } from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={`${css["login-page"]}`}>
      <img
        className={css["first-gold"]}
        src="/src/images/bg_image/golden_coins_1.png"
        alt="Coins background image"
      />

      <img
        className={css["second-gold"]}
        src="/src/images/bg_image/golden_coins_2.png"
        alt="Coins background image"
      />
      <div className={`container ${css["login-page-container"]}`}>
        <div className={css.backdrop}>
          <div className={css["company-logo"]}>
            <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
            <h1>Money Guard</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
