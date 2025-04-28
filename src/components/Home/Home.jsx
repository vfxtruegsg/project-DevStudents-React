import React, { useState } from "react";
import css from "./Home.module.css";
import Balance from "../Balance/Balance.jsx";
import Currency from "../Currency/Currency.jsx";
import HomeIcon from "../HomeIcon/HomeIcon.jsx";
import { useMedia } from "../../hooks/useMedia.js";

const Home = () => {
  const { isMobile } = useMedia();

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
            {/* <div className={css.imageContainer}>
              <img className={css.imgIcon} src="/home.svg" alt="Home icon" />
              <img
                className={css.imgIconActive}
                src="/home-active.svg"
                alt="Home icon Active"
              />
            </div> */}

            <HomeIcon
              image1="/home.svg"
              image2="/home-active.svg"
              alt1="Home icon"
              alt2="Home icon Active"
            />
            <span className={css.homeText}>Home</span>
          </button>
          <button
            onClick={handleClickStatistics}
            type="button"
            className={css.homeItemIcon}
          >
            {/* <img
              className={css.imgIcon}
              src="/statistics.svg"
              alt="Statistics icon"
            /> */}
            <HomeIcon
              image1="/statistics.svg"
              image2="/statistics-active.svg"
              alt1="Statistics icon"
              alt2="Statistics icon Active"
            />
            <span className={css.statisticsText}>Statistics</span>
          </button>
          <button
            onClick={handleClickCurrency}
            type="button"
            className={css.homeItemIcon}
          >
            {/* <img
              className={css.imgIcon}
              src="/currency.svg"
              alt="Currency icon"
            /> */}
            {isMobile && (
              <HomeIcon
                image1="/currency.svg"
                image2="/currency-active.svg"
                alt1="Currency icon"
                alt2="Currency icon Active"
              />
            )}
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
