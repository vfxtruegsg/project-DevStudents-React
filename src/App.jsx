import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage.jsx";
import { refreshThunk } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { PublicRoute } from "./components/PublicRoute/PublicRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import LogoutModule from "./components/LogoutModule/LogoutModule.jsx";

function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);
  // useEffect(() => {
  //   dispatch(refreshThunk());
  // }, [dispatch]);

  return (
    <LogoutModule></LogoutModule>
    // <Routes>
    //   {/* <Route path="/" element={<Header />}>
    //     <Route
    //       index
    //       path={
    //         <PrivateRoute>
    //           <Dashboard />
    //         </PrivateRoute>
    //       }
    //     />
    //   </Route> */}

    //   <Route
    //     path="/login"
    //     element={
    //       // <PublicRoute>
    //       //   <LoginPage />
    //       // </PublicRoute>
    //       <LoginPage />
    //     }
    //   />
    //   <Route
    //     path="/register"
    //     element={
    //       // <PublicRoute>
    //       //   <RegistrationPage />
    //       // </PublicRoute>
    //       <RegistrationPage />
    //     }
    //   />

    //   {/* <Route path="*" element={<NotFound/>}/> */}
    // </Routes>
  );
}

export default App;
