import { lazy, Suspense, useState } from "react";
import css from "./DashboardPage.module.css";
import { useMedia } from "../../hooks/useMedia.js";
import Layout from "../../components/Layout/Layout.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";

import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";

// import Sidebar from "./components/Sidebar";
// import Stats from "./components/Stats";
// import Chart from "./components/Chart";
// import Transactions from "./components/Transactions";

const Currency = lazy(() => import("../../components/Currency/Currency.jsx"));
const Balance = lazy(() => import("../../components/Balance/Balance.jsx"));
const LogoutModal = lazy(() =>
  import("../../components/LogoutModal/LogoutModal.jsx")
);

const DashboardPage = () => {
  const { isMobile } = useMedia();

  // Состояния для выбранного месяца и года
  const [selectedMonth, setSelectedMonth] = useState("All month");
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );

  // Функции для изменения месяца и года
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    console.log("Выбран месяц:", month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    console.log("Выбран год:", year);
  };

  return (
    <>
      <Layout />
      <section className={css.dashboardPage}>
        <main>
          <div className={css.dashboard}>
            <div className={css.dashboardInf}>
              <div>
                <div className={css.navigation}>{/* <Navigation /> */}</div>
                <div className={css.balance}>{!isMobile && <Balance />}</div>
              </div>
              <div className={css.currency}>{!isMobile && <Currency />}</div>
            </div>
            <div className={css.divider}></div>
            <Suspense fallback={<Loader />}>
              <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <StatisticsDashboard
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                />
              </div>
              <Outlet />
            </Suspense>
            <LogoutModal />
          </div>
        </main>
      </section>
    </>
  );
};

export default DashboardPage;
