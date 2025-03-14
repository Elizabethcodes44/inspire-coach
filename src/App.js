import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { ROUTES, THEME_OPTIONS } from './global';
import useLocalStorage from 'use-local-storage';

import Home from './pages/Home';
import ManageTasks from './pages/ManageTasks';

function App() {
  const defaultDark = window.matchMedia(`(prefers-color-scheme: ${THEME_OPTIONS.DARK})`).matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <NavBar defaultTheme={theme} onThemeChange={(newTheme) => setTheme(newTheme)} />
        <Routes>
          <Route path={ROUTES.HOME_PAGE.route} element={<Home />} />
          <Route path={ROUTES.MANAGE_TASKS.route} element={<ManageTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;