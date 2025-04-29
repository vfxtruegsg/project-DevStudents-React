import css from "./RegistrationPage.module.css";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.jsx";
import { useSelector } from "react-redux";
import { selectisAuthLoading } from "../../redux/auth/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";

const RegistrationPage = () => {
  const isLoading = useSelector(selectisAuthLoading);

  const grDollars1 = new URL(
    "../../images/bg_image/gr_dollars_1.png",
    import.meta.url
  );
  const grDollars2 = new URL(
    "../../images/bg_image/gr_dollars_2.png",
    import.meta.url
  );
  const grDollars3 = new URL(
    "../../images/bg_image/gr_dollars_3.png",
    import.meta.url
  );
  return (
    <>
      {isLoading && <Loader />}
      <div className={`${css["registration-page"]}`}>
        <img
          className={`${css["dollar-tablet"]} `}
          src={grDollars2}
          alt="Dollars background image"
        />

        <img
          className={`${css["dollar-desk-1"]} ${css["dollar-desc-hidden"]}`}
          src={grDollars3}
          alt="Dollars background image"
        />

        <img
          className={`${css["dollar-desk-2"]} ${css["dollar-desc-hidden"]}`}
          src={grDollars1}
          alt="Dollars background image"
        />
        <div className={`container ${css["registration-page-container"]}`}>
          <div className={css.backdrop}>
            <div className={css["company-logo"]}>
              <img
                className={css.logo}
                src="/icons.svg"
                alt="Money Guard logo"
              />
              <h1>Money Guard</h1>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
