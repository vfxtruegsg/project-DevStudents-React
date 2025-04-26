import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage.jsx";
import { PublicRoute } from "./components/PublicRoute/PublicRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { setupAxiosInterceptors } from "./services/axiosInterceptors.js";
import UserModal from "./components/UserModal/UserModal.jsx";

function App() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
      <Route
        path="/editprofile"
        element={
          // <PublicRoute>
          //   <LoginPage />
          // </PublicRoute>
          <UserModal />
        }
      />

      {/* <Route path="*" element={<NotFound/>}/> */}
    </Routes>
  );
}

export default App;
