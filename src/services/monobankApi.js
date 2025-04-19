import axios from "axios";

const CURRENCY_API_URL = "https://api.monobank.ua/bank/currency";

export default async function fetchCurrency() {
  try {
    const { data } = await axios.get(CURRENCY_API_URL);
    return data;
  } catch (error) {
    console.warn(error.message);
    return null;
  }
}
