import React from "react";
import css from "./Balance.module.css";

const Balance = () => {
  const number = 24000;

  const numberFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
  const formattedNumberIntl = numberFormat.format(number).replace(/,/g, " ");

  return (
    <div className={css.balanceWrapper}>
      <p className={css.balanceText}>your balance</p>
      <div className={css.balanceResult}>
        <img
          className={css.hryvniaIcon}
          src="/hryvnia.svg"
          alt="Hryvnia icon"
        />
        <span className="number">{formattedNumberIntl}</span>
      </div>
    </div>
  );
};

export default Balance;
