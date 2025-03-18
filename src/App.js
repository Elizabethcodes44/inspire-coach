import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { ROUTES, THEME_OPTIONS } from "./global";
import useLocalStorage from "use-local-storage";
import LoadTop from "./components/ScrollTop/LoadTop";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import ManageTasks from "./pages/ManageTasks";
import ViewTask from "./pages/ViewTask";
import ManageUsers from "./pages/coach/ManageUsers";
import ViewUserTasks from "./pages/coach/ViewUserTasks";

//Coach Routes
// import Coach from "./pages/coach/Coach";

// //auth routes
// import AdminProtectedRoute from "./app/AdminProctectedRoute";
// import ProtectedRoute from "./app/ProtectedRoute";
// import AdminLogin from "./pages/authentication/adminLogin";
// import CoachLogin from "./pages/authentication/coachLogin";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
// import ForgotPassword from "./pages/authentication/forgotPassword";
// import OTP from "./pages/authentication/otp";

import Error from "./pages/404";

function AppContent() {
  const [user, setUser] = useState(null);

  const defaultDark = window.matchMedia(
    `(prefers-color-scheme: ${THEME_OPTIONS.DARK})`
  ).matches;

  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT
  );
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <UserContext.Provider value={user}>
        {isLoading ? <Preloader /> : ""}
        <LoadTop />

        <NavBar defaultTheme={theme} onThemeChange={(newTheme) => setTheme(newTheme)} />

        <Routes>
          <Route path={ROUTES.HOME_PAGE.route} element={<Home />} />
          <Route path={ROUTES.SIGN_UP.route} element={<Signup />} />
          <Route path={ROUTES.LOGIN.route} element={<Login />} />
          
          {/* Trainee Pages */}
          <Route path={ROUTES.MANAGE_TASKS.route} element={<ManageTasks />} />
          <Route path={ROUTES.VIEW_TASK.route} element={<ViewTask />} />
      
          {/* Coach Pages */}
          <Route path={ROUTES.MANAGE_TRAINEES.route} element={<ManageUsers />} />
          <Route path={ROUTES.VIEW_TRAINEE_TASKS.route} element={<ViewUserTasks />} />
      
              {/* <Route path="/login" element={<Login />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/coachlogin" element={<CoachLogin />} /> */}
      
              {/* <Route
                path="/admindashboard/*"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/userdashboard/*"
                element={<ProtectedRoute>{<UserDashboard />}</ProtectedRoute>}
              /> */}
              {/* <Route path={ROUTES.MANAGE_USERS.route} element={<ManageUsers />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/userHome" exact element={<Home />} />
              <Route path="/coach" element={<Coach />} />
              <Route path={ROUTES.VIEW_USER_TASKS.route} element={<ViewUserTasks />} />
              <Route path="/otp" element={<OTP />} /> */}
      
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      
              {/* <Route path="/application/:id" element={  <AdminProtectedRoute> <AdminApplicationDetail/> </AdminProtectedRoute>}  /> */}
      
              {/* <Route path="/userhome" element={<UserHome />} /> */}
              
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
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