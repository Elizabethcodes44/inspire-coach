import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBell,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { APP_NAME, ROUTES, THEME_OPTIONS } from "../../global";

import MenuItems from "./MenuItems";

import normalLogo from '../../assets/images/logos/inspire-coach-logo.png';
import stickyLogo from '../../assets/images/logos/inspire-coach-logo.png';

const Header = (props) => {
  const {
    topbarEnable,
    menuCategoryEnable,
    headerClass,
    parentMenu,
    headerNormalLogo,
    headerStickyLogo,
    defaultTheme,
    onThemeChange,
  } = props;
  const [isDarkMode, setIsDarkMode] = React.useState(
    defaultTheme === THEME_OPTIONS.DARK
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    onThemeChange(!isDarkMode ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT);
  };

  useEffect(() => {
    // Sticky is displayed after scrolling for 100 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <header
        id="react-header"
        className={
          headerClass ? headerClass : "react-header react-header-three"
        }
      >
        <div className={isVisible ? "header-area react-sticky" : "header-area"}>
          <div className="menu-part">
            <div className="container">
              <div className="react-main-menu">
                <nav>
                  <div className="menu-toggle">
                    <div className="logo">
                      {isVisible ? (
                        <Link to="/" className="logo-text">
                          <img
                            src={
                              headerStickyLogo ? headerStickyLogo : stickyLogo
                            }
                            alt=""
                            width="100px"
                          />
                        </Link>
                      ) : (
                        <Link to="/" className="logo-text">
                          <img
                            src={
                              headerNormalLogo ? headerNormalLogo : normalLogo
                            }
                            alt=""
                            width="100px"
                          />
                        </Link>
                      )}
                    </div>
                  
                    <button
                      type="button"
                      id="menu-btn"
                      className={
                        menuOpen ? "mobile-menu-btn open" : "mobile-menu-btn"
                      }
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
				    <Switch
                      id="dark-mode-switch"
                      onChange={toggleDarkMode}
                      checked={isDarkMode}
                      offColor="#D4D4D4" /* switch off background */
                      offHandleColor="#121212" /* switch off icon background (left) */
                      onColor="#121212" /* switch on background */
                      onHandleColor="#F5F5F5" /* switch on icon background (right) */
                      uncheckedIcon={false} /* switch off (right) */
                      uncheckedHandleIcon={
                        <FontAwesomeIcon
                          icon={faSun}
                          style={{ color: "var(--white)" }}
                        />
                      } /* switch off icon (left) */
                      checkedIcon={false} /* switch on (left) */
                      checkedHandleIcon={
                        <FontAwesomeIcon
                          icon={faMoon}
                          style={{ color: "var(--black)" }}
                        />
                      } /* switch on icon (right) */
                      aria-label={`toggle theme to ${
                        isDarkMode ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT
                      } mode`}
                    />
                  <div
                    className={
                      menuOpen
                        ? "react-inner-menus menu-open"
                        : "react-inner-menus"
                    }
                  >
					
                    <ul id="backmenu" className="react-menus react-sub-shadow">

                      <MenuItems parentMenu={parentMenu} />
					
                    </ul>
                    <div className="searchbar-part">
                      {/* <form className="search-form">
												<input type="text" className="form-input" placeholder="Search recipient" />
												<Link to="/recipient" className="form-button">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
												</Link>
											</form> */}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
