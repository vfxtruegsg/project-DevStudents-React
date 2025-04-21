import { LoginForm } from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={`${css["login-page"]}`}>
      <div className={`container`}>
        <LoginForm />
      </div>
    </div>
  );
};
