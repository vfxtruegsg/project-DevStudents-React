import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import { setupAxiosInterceptors } from "./services/axiosInterceptors.js";
import { Loader } from "./components/Loader/Loader.jsx";

const Layout = lazy(() => import("./components/Layout/Layout.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);

function App() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* <Route
        index
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      /> */}
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />

        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </Suspense>
  );
}

export default App;
