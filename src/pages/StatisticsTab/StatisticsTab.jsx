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

const getMonthNumber = (monthName) => monthsList.indexOf(monthName);
const getMonthName = (monthIndex) => monthsList[monthIndex];

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDate = new Date();
  const defaultMonth = getMonthName(currentDate.getMonth());
  const defaultYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(
    searchParams.get("month") || defaultMonth
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || defaultYear
  );

  const transactions = useSelector(selectSummary);
  const currentUserData = useSelector(selectUser);

  useEffect(() => {
    const monthNumber = getMonthNumber(selectedMonth);
    const yearNumber = Number(selectedYear);

    if (monthNumber !== -1 && yearNumber) {
      dispatch(getSummary({ month: monthNumber, year: yearNumber }));
      setSearchParams({ month: selectedMonth, year: selectedYear });
    }
  }, [dispatch, selectedMonth, selectedYear, setSearchParams]);

  const handleMonthChange = (month) => setSelectedMonth(month);
  const handleYearChange = (year) => setSelectedYear(year);

  return (
    <div className={`container ${s.statisticTabWrapper}`}>
      <div>
        <h1 className={s.header}>Statistics</h1>
        <Chart data={transactions} />
      </div>
      <div>
        <StatisticsDashboard
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;
