import { lazy, Suspense, useState } from "react";
import css from "./DashboardPage.module.css";
import { useMedia } from "../../hooks/useMedia.js";
import Layout from "../../components/Layout/Layout.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";

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

  return (
    <>
      <Header />
      <main className={css.dashboardPage}>
        <div className={css.dashboard}>
          <div className={css.dashboardInf}>
            <div>
              <div className={css.navigation}>{/* <Navigation /> */}</div>
              {/* <div className={css.balance}>{!isMobile && <Balance />}</div> */}
            </div>
            {/* <div className={css.currency}>{!isMobile && <Currency />}</div> */}
          </div>
          <div className={css.divider}></div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
          <LogoutModal />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
