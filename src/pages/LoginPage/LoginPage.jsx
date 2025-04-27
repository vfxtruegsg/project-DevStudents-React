import { LoginForm } from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  const grCoins1 = new URL(
    "../../images/bg_image/golden_coins_1.png",
    import.meta.url
  );
  const grCoins2 = new URL(
    "../../images/bg_image/golden_coins_2.png",
    import.meta.url
  );
  return (
    <div className={`${css["login-page"]}`}>
      <img
        className={css["first-gold"]}
        src={grCoins1}
        alt="Coins background image"
      />

      <img
        className={css["second-gold"]}
        src={grCoins2}
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

export default LoginPage;
