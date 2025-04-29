import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import { setupAxiosInterceptors } from "./services/axiosInterceptors.js";
import { Loader } from "./components/Loader/Loader.jsx";
import { useMedia } from "./hooks/useMedia.js";

import UserModal from "./components/UserModal/UserModal.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage/DashboardPage.jsx")
);
const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab.jsx"));
const StatisticsTab = lazy(() =>
  import("./pages/StatisticsTab/StatisticsTab.jsx")
);
const CurrencyTab = lazy(() => import("./components/Currency/Currency.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  const { isMobile } = useMedia();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route
            path="currency"
            element={isMobile ? <CurrencyTab /> : <Navigate to="/" />}
          />
        </Route>

        <Route
          path="/login"
          element={
            // <PublicRoute>
            //   <LoginPage />
            // </PublicRoute>
            <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            // <PublicRoute>
            //   <RegistrationPage />
            // </PublicRoute>
            <RegistrationPage />
          }
        />

        <Route path="/usermodal" element={<UserModal />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
