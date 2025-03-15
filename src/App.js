import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { ROUTES, THEME_OPTIONS } from "./global";
import useLocalStorage from "use-local-storage";

import LoadTop from "./components/ScrollTop/LoadTop";
import Preloader from "./components/Preloader";

import Home from "./pages/Home";
import ManageTasks from "./pages/ManageTasks";
import ViewTask from "./pages/ViewTask";

import AdminProtectedRoute from "./app/AdminProctectedRoute";
import ProtectedRoute from "./app/ProtectedRoute";
import AdminLogin from "./pages/authentication/adminLogin";
import CoachLogin from "./pages/authentication/coachLogin";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import ForgotPassword from "./pages/authentication/forgotPassword";
import OTP from "./pages/authentication/otp";

import Error from "./pages/404";

function AppContent() {
  const defaultDark = window.matchMedia(
    `(prefers-color-scheme: ${THEME_OPTIONS.DARK})`
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT
  );
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const noNavBarRoutes = ["/login", "/forgot-password", "/otp", "/adminlogin", "/signup", "/coachlogin"];

  const normalizePath = (path) => path.toLowerCase().replace(/\/$/, "");

  return (
    <div className="App" data-theme={theme}>
      {isLoading ? <Preloader /> : ""}
      <LoadTop />
      {!noNavBarRoutes.includes(normalizePath(location.pathname)) && (
        <NavBar
          defaultTheme={theme}
          onThemeChange={(newTheme) => setTheme(newTheme)}
        />
      )}
      <Routes>
        <Route path={ROUTES.HOME_PAGE.route} element={<Home />} />
        <Route path={ROUTES.MANAGE_TASKS.route} element={<ManageTasks />} />
        <Route path={ROUTES.VIEW_TASK.route} element={<ViewTask />} />

        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/coachlogin" element={<CoachLogin />} />

        <Route
          path="/admindashboard/*"
          element={
            <AdminProtectedRoute>
              {/* <AdminDashboard /> */}
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/userdashboard/*"
          element={<ProtectedRoute>{/* <UserDashboard /> */}</ProtectedRoute>}
        />
        <Route path="/" exact element={<Home />} />
        <Route path="/userHome" exact element={<Home />} />
        <Route path="/otp" element={<OTP />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* <Route path="/application/:id" element={  <AdminProtectedRoute> <AdminApplicationDetail/> </AdminProtectedRoute>}  /> */}

        {/* <Route path="/userhome" element={<UserHome />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;