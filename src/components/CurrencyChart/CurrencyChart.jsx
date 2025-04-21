import React from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

const CurrencyChart = ({ currencyData }) => {
  const visualCurrencyData = [
    {
      name: "shadow1",
      value: currencyData.usd.purchase - 5,
      show: false,
    },
    {
      name: "USD",
      value: currencyData.usd.purchase,
      show: true,
    },
    {
      name: "shadow2",
      value: currencyData.usd.purchase - 10,
      show: false,
    },
    {
      name: "EUR",
      value: currencyData.eur.purchase,
      show: true,
    },
    {
      name: "shadow3",
      value: currencyData.eur.purchase - 5,
      show: false,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="50%">
        <LineChart width={300} height={100} data={visualCurrencyData}>
          <Line
            type="natural"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={1}
            dot={(props) =>
              props.payload.show ? <circle {...props} r={6} /> : null
            }
            label={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer
        width="100%"
        height="50%"
        style={{ position: "absolute", top: 80 }}
      >
        <AreaChart width={300} height={100} data={visualCurrencyData}>
          <Area type="natural" dataKey="value" stroke="none" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default CurrencyChart;
