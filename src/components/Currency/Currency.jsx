import { useEffect, useState } from "react";
import fetchCurrency from "../../services/monobankApi.js";
import CurrencyTable from "../CurrencyTable/CurrencyTable.jsx";
import parseCurrency from "../../utils/parseCurrency.js";
import CurrencyChart from "../CurrencyChart/CurrencyChart.jsx";

const ONE_HOUR_MS = 60 * 60 * 1000;

const Currency = () => {
  const [currencyUpdated, setCurrencyUpdated] = useState(() =>
    localStorage.getItem("currencyUpdatedAt")
  );
  const [usdEurCurrency, setUsdEurCurrency] = useState(() =>
    JSON.parse(localStorage.getItem("usdEurCurrency"))
  );

  useEffect(() => {
    if (!currencyUpdated || currencyUpdated < Date.now() - ONE_HOUR_MS) {
      (async () => {
        const currency = await fetchCurrency();

        if (!currency) return;

        const parsedCurrency = parseCurrency(currency);

        setUsdEurCurrency(parsedCurrency);
        localStorage.setItem("usdEurCurrency", JSON.stringify(parsedCurrency));

        const currencyUpdatedAt = Date.now();
        setCurrencyUpdated(currencyUpdatedAt);
        localStorage.setItem("currencyUpdatedAt", currencyUpdatedAt);
      })();
    }
  }, [currencyUpdated, usdEurCurrency]);

  if (!usdEurCurrency) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CurrencyTable currencyData={usdEurCurrency} />
      <CurrencyChart currencyData={usdEurCurrency} />
    </>
  );
};

export default Currency;
