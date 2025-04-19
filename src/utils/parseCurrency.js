const USD_ISO_4217 = 840;
const EUR_ISO_4217 = 978;
const UAH_ISO_4217 = 980;

export default function parseCurrency(data) {
  if (!data) return null;

  const usdToUah = data.find(
    (currency) =>
      currency.currencyCodeA === USD_ISO_4217 &&
      currency.currencyCodeB === UAH_ISO_4217
  );

  const eurToUah = data.find(
    (currency) =>
      currency.currencyCodeA === EUR_ISO_4217 &&
      currency.currencyCodeB === UAH_ISO_4217
  );

  return {
    usd: {
      purchase: usdToUah.rateBuy,
      sale: usdToUah.rateSell,
    },
    eur: {
      purchase: eurToUah.rateBuy,
      sale: eurToUah.rateSell,
    },
  };
}
