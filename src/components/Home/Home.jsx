import React, { useState } from "react";
import css from "./Home.module.css";
import Balance from "./Balance/Balance.jsx";
import Currency from "../Currency/Currency.jsx";

const Home = () => {
  const [isHome, setIsHome] = useState(true);
  const [isStatistics, setIsStatistics] = useState(false);
  const [isCurrency, setIsCurrency] = useState(false);

  const handleClickHome = () => {
    setIsHome(true);
    setIsStatistics(false);
    setIsCurrency(false);
  };
  const handleClickStatistics = () => {
    setIsHome(true);
    setIsStatistics(true);
    setIsCurrency(false);
  };
  const handleClickCurrency = () => {
    setIsCurrency(true);
    setIsStatistics(false);
    setIsHome(false);
  };

  return (
    <section className={css.homeSection}>
      <div className={css.homeWrapper}>
        <div className={css.homeList}>
          <button
            onClick={handleClickHome}
            type="button"
            className={css.homeItemIcon}
          >
            <img className={css.homeIcon} src="/home.svg" alt="Home icon" />
            <span className={css.homeText}>Home</span>
          </button>
          <button
            onClick={handleClickStatistics}
            type="button"
            className={css.homeItemIcon}
          >
            <img
              className={css.statusIcon}
              src="/statistics.svg"
              alt="Statistics icon"
            />
            <span className={css.homeText}>Statistics</span>
          </button>
          <button
            onClick={handleClickCurrency}
            type="button"
            className={css.homeItemIcon}
          >
            <img
              className={css.currencyIcon}
              src="/currency.svg"
              alt="Currency icon"
            />
          </button>
        </div>
        {isHome && <Balance />}
        {isStatistics && "Statistics"}
        {isCurrency && <Currency />}
      </div>
    </section>
  );
};

export default Home;
