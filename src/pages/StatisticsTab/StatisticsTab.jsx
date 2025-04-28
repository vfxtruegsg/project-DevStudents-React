import s from "./StatisticsTab.module.css";
import Chart from "../../components/Chart/Chart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectSummary } from "../../redux/transactions/selectors.js";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard.jsx";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable.jsx";
import { getSummary } from "../../redux/transactions/operations.js";
import { useSearchParams } from "react-router-dom";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthNumber = (monthName) => {
  return monthsList.indexOf(monthName) + 1;
};

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );

  const currentUserData = useSelector(selectUser);
  const transactions = useSelector(selectSummary);

  // 1. При первом рендере берем данные из URL
  useEffect(() => {
    const urlMonth = searchParams.get("month");
    const urlYear = searchParams.get("year");

    if (urlMonth && urlYear) {
      setSelectedMonth(urlMonth);
      setSelectedYear(urlYear);
    }
  }, [searchParams]);

  // 2. Когда меняется месяц или год, делаем запрос
  useEffect(() => {
    if (!selectedMonth || !selectedYear) return;

    const monthNumber = getMonthNumber(selectedMonth); // из January -> 1
    const yearNumber = Number(selectedYear);

    if (monthNumber && yearNumber) {
      dispatch(getSummary({ month: monthNumber, year: yearNumber }));
      setSearchParams({ month: selectedMonth, year: selectedYear });
    }
  }, [dispatch, selectedMonth, selectedYear, setSearchParams]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className={`container`}>
      <h1 className={`${s.header}`}>Statistics</h1>
      <Chart transactions={transactions} balance={currentUserData.balance} />
      <StatisticsDashboard
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />
      <StatisticsTable />
    </div>
  );
};

export default StatisticsTab;
