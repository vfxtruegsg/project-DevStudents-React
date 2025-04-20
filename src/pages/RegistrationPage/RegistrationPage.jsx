import css from "./RegistrationPage.module.css";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.jsx";

export const RegistrationPage = () => {
  return (
    <div className={`${css["registration-page"]}`}>
      <div className={`container`}>
        <RegistrationForm />
      </div>
    </div>
  );
};
