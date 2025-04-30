import React, { useEffect, useState } from "react";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useMedia } from "../../hooks/useMedia.js";
import useMediaQuery2 from "../../hooks/useMediaQuery2.jsx";

const imgObject = {
  img1: "/home.svg",
  img1_active: "/home-active.svg",
  img2: "/statistics.svg",
  img2_active: "/statistics-active.svg",
  img3: "/currency.svg",
  img3_active: "/currency-active.svg",
};

const Navigation = () => {
  const isMobile2 = useMediaQuery2("(max-width: 767px)");
  const isTablet2 = useMediaQuery2(
    "(min-width: 768px) and (max-width: 1199px)"
  );
  const isDesktop2 = useMediaQuery2("(min-width: 1280px)");

  const { isMobile } = useMedia();

  const [isClicked, setIsClicked] = useState(1);

  const imgSource1 = isClicked == 1 ? imgObject.img1_active : imgObject.img1;
  const altSource1 = isClicked === 1 ? "Home icon" : "Home icon Active";
  const imgSource2 = isClicked == 2 ? imgObject.img2_active : imgObject.img2;
  const altSource2 =
    isClicked === 2 ? "Statistics icon" : "Statistics icon Active";
  const imgSource3 = isClicked == 3 ? imgObject.img3_active : imgObject.img3;
  const altSource3 = isClicked === 3 ? "Currency icon" : "Currency icon Active";
  useEffect(() => {
    if (isMobile2) {
      setIsClicked(1);
    } else if (isTablet2) {
      setIsClicked(1);
    } else if (isDesktop2) {
      setIsClicked(1);
    }
  }, [isMobile2, isTablet2, isDesktop2]);
  return (
    <section className={css.navSection}>
      <nav className={css.nav}>
        <NavLink className={css.link} to="/" onClick={() => setIsClicked(1)}>
          <div className={clsx(css.navImg, isClicked === 1 && css.active)}>
            <img
              src={imgSource1}
              alt={altSource1}
              className={css.swappedImage}
            />
            <span className={css.homeText}>Home</span>
          </div>
        </NavLink>
        <NavLink
          className={css.link}
          to="/statistics"
          onClick={() => setIsClicked(2)}
        >
          <div className={clsx(css.navImg, isClicked === 2 && css.active)}>
            <img
              src={imgSource2}
              alt={altSource2}
              className={css.swappedImage}
            />
            <span className={css.homeText}>Statistics</span>
          </div>
        </NavLink>
        {isMobile && (
          <NavLink
            className={css.link}
            to="/currency"
            onClick={() => setIsClicked(3)}
          >
            <div className={clsx(css.navImg, isClicked === 3 && css.active)}>
              <img
                src={imgSource3}
                alt={altSource3}
                className={css.swappedImage}
              />
            </div>
          </NavLink>
        )}
      </nav>
    </section>
  );
};

export default Navigation;
