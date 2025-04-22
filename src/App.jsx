import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage.jsx";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute.jsx";
import { refreshThunk } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
