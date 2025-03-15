import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import LoginMain from './LoginMain';
import ScrollToTop from '../../components/ScrollTop';
import { ROUTES, THEME_OPTIONS } from "../../global";
import useLocalStorage from "use-local-storage";

import Logo from '../../assets/images/logos/inspire-coach-logo.png';


const Login = () => {
    const defaultDark = window.matchMedia(
        `(prefers-color-scheme: ${THEME_OPTIONS.DARK})`
      ).matches;
      const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT
      );
    return (
        <>
            <Header
                parentMenu='page'
                menuCategoryEnable='enable'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                onThemeChange={(newTheme) => setTheme(newTheme)}

            />

            <div class="react-wrapper">
                <div class="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Login"
                    />

                    <LoginMain />

                    {/* scrolltop-start */}
                    <ScrollToTop />
                    {/* scrolltop-end */}
                </div>
            </div>

            <Footer />

        </>
    );
}


export default Login;

