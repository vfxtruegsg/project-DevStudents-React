import css from "./RegistrationPage.module.css";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.jsx";

export const RegistrationPage = () => {
  return (
    <div className={`${css["registration-page"]}`}>
      <div className={`container ${css["registration-page-container"]}`}>
        <div className={css["company-logo"]}>
          <img className={css.logo} src="/icons.svg" alt="Money Guard logo" />
          <h1>Money Guard</h1>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};
