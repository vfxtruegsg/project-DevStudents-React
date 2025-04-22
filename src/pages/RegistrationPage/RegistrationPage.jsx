import css from "./RegistrationPage.module.css";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.jsx";

export const RegistrationPage = () => {
  return (
    <div className={`${css["registration-page"]}`}>
      <img
        className={`${css["dollar-tablet"]} `}
        src="/src/images/bg_image/gr_dollars_2.png"
        alt="Dollars background image"
      />

      <img
        className={`${css["dollar-desk-1"]} ${css["dollar-desc-hidden"]}`}
        src="/src/images/bg_image/gr_dollars_3.png"
        alt="Dollars background image"
      />

      <img
        className={`${css["dollar-desk-2"]} ${css["dollar-desc-hidden"]}`}
        src="/src/images/bg_image/gr_dollars_1.png"
        alt="Dollars background image"
      />
      <div className={`container ${css["registration-page-container"]}`}>
        <div className={css.backdrop}>
          <div className={css["company-logo"]}>
            <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
            <h1>Money Guard</h1>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};
