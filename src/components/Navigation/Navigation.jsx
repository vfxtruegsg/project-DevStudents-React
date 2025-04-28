import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { isMobile } from "../../utils/mediaQuery.js";
import clsx from "clsx";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.navigation}>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
        to="/home"
      >
        HomeTab
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/statistics"
        >
          StatisticsTab
        </NavLink>
      )}
      {isMobile && (
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/currency"
        >
          CurrencyTab
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
