import React, { useState } from "react";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useMedia } from "../../hooks/useMedia.js";

const imgObject = {
  img1: "/home.svg",
  img1_active: "/home-active.svg",
  img2: "/statistics.svg",
  img2_active: "/statistics-active.svg",
  img3: "/currency.svg",
  img3_active: "/currency-active.svg",
};

const Navigation = () => {
  const { isMobile } = useMedia();

  const [isClicked, setIsClicked] = useState(1);

  const imgSource1 = isClicked == 1 ? imgObject.img1_active : imgObject.img1;
  const altSource1 = isClicked === 1 ? "Home icon" : "Home icon Active";
  const imgSource2 = isClicked == 2 ? imgObject.img2_active : imgObject.img2;
  const altSource2 =
    isClicked === 2 ? "Statistics icon" : "Statistics icon Active";
  const imgSource3 = isClicked == 3 ? imgObject.img3_active : imgObject.img3;
  const altSource3 = isClicked === 3 ? "Currency icon" : "Currency icon Active";

  return (
    <section className={css.navSection}>
      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/"
          onClick={() => setIsClicked(1)}
        >
          <div>
            <img
              src={imgSource1}
              alt={altSource1}
              className={css.swappedImage}
            />
          </div>

          <span className={css.homeText}>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/statistics"
          onClick={() => setIsClicked(2)}
        >
          <div>
            <img
              src={imgSource2}
              alt={altSource2}
              className={css.swappedImage}
            />
          </div>

          <span className={css.homeText}>Statistics</span>
        </NavLink>
        {isMobile && (
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/currency"
            onClick={() => setIsClicked(3)}
          >
            <div>
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
