import { lazy, Suspense } from "react";
import css from "./DashboardPage.module.css";
import { useMedia } from "../../hooks/useMedia.js";
import Layout from "../../components/Layout/Layout.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

const CurrencyTab = lazy(() =>
  import("../../pages/CurrencyTab/CurrencyTab.jsx")
);
const Balance = lazy(() => import("../../components/Balance/Balance.jsx"));
const LogoutModal = lazy(() =>
  import("../../components/LogoutModal/LogoutModal.jsx")
);

const DashboardPage = () => {
  const { isMobile } = useMedia();

  const currentUserData = useSelector(selectUser);
  return (
    <>
      <Layout />
      <section className={`${css.dashboardPage}`}>
        <main className={css.main}>
          <div className={css.dashboard}>
            <div className={css.dashboardInf}>
              <div>
                <div className={css.navigation}>{/* <Navigation /> */}</div>
                <div className={css.balance}>
                  {!isMobile && <Balance number={currentUserData.balance} />}
                </div>
              </div>
              <div className={css.currency}>{!isMobile && <CurrencyTab />}</div>
            </div>
            <div className={css.line}></div>
            <Suspense fallback={<Loader />}>
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
