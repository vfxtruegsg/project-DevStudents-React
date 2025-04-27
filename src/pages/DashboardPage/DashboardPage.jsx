import { lazy, Suspense } from "react";
import css from "./DashboardPage.module.css";
import { useMedia } from "../../hooks/useMedia.js";
import Layout from "../../components/Layout/Layout.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import Stats from "./components/Stats";
// import Chart from "./components/Chart";
// import Transactions from "./components/Transactions";

const Currency = lazy(() => import("../../components/Currency/Currency.jsx"));
const Balance = lazy(() => import("../../components/Balance/Balance.jsx"));

const DashboardPage = () => {
  const { isMobile } = useMedia();

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
              <Outlet />
            </Suspense>
          </div>
        </main>
      </section>
    </>
  );
};

export default DashboardPage;
