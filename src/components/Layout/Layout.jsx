import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
// import DashboardPage from "../../pages/DashboardPage/DashboardPage.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        {/* <DashboardPage /> */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
