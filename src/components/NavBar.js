import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from '../assets/inspire-coach-logo.png';
import './NavBar.css';
import '../assets/scss/_menu.scss';
import { APP_NAME, ROUTES, THEME_OPTIONS } from '../global';
import Switch from "react-switch";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faCircleUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button, Typography } from '@mui/material';

const EXCLUDE_ROUTES = {
    'student': ['home-page', 'view-task', 'coach-page', 'manage-users', 'view-user-tasks'],
    'coach': ['home-page', 'view-task', 'coach-page', 'manage-tasks', 'view-user-tasks'],
}

const NavBar = ({ defaultTheme, onThemeChange, userType }) => {
    const [isDarkMode, setIsDarkMode] = useState(defaultTheme === THEME_OPTIONS.DARK);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        onThemeChange(!isDarkMode ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const alertPopoverId = open ? 'alert-popover' : undefined;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav id='nav-bar'>
            <div id='nav-bar-app-logo-name-container'>
                <img id='nav-bar-app-logo' src={AppLogo} alt={`${APP_NAME} logo: pink ribbon with green checkmark`} />
                <a href={ROUTES.HOME_PAGE.route} id='nav-bar-app-name-link'><h3 id='nav-bar-app-name'>{APP_NAME}</h3></a>
            </div>
            <Switch
                        id="dark-mode-switch"
                        onChange={toggleDarkMode}
                        checked={isDarkMode}
                        offColor='#D4D4D4'  /* switch off background */
                        offHandleColor='#121212'  /* switch off icon background (left) */
                        onColor='#121212' /* switch on background */
                        onHandleColor='#F5F5F5' /* switch on icon background (right) */
                        uncheckedIcon={false}  /* switch off (right) */
                        uncheckedHandleIcon={<FontAwesomeIcon icon={faSun} style={{ color: 'var(--white)' }} />}  /* switch off icon (left) */
                        checkedIcon={false}  /* switch on (left) */
                        checkedHandleIcon={<FontAwesomeIcon icon={faMoon} style={{ color: 'var(--black)' }} />}  /* switch on icon (right) */
                        aria-label={`toggle theme to ${isDarkMode ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT} mode`}
                    />
            {isMobile && (
                <button
                    className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>
            )}
            
            <div id='nav-bar-links-container' className={menuOpen ? 'open' : ''}>
                
                <div id='nav-bar-profile-container'>
                    
                    { Object.entries(ROUTES).map(([_, value]) => {
                    if (EXCLUDE_ROUTES[userType].includes(value.id)) return null;
                    return (
                        <NavLink 
                            key={`nav-link-${value.id}`}  
                            to={value.route} 
                            exact='true'
                            className={({ isActive }) => `nav-bar-link ${isActive ? 'nav-link-active' : ''}`}>
                            {value.label}
                        </NavLink>
                    );
                })}
                    <Button id='alerts-btn' aria-describedby={alertPopoverId} variant="text" onClick={handleClick}>
                        <FontAwesomeIcon id='alerts-icon' icon={faBell} />
                    </Button>
                    <Popover
                        id={alertPopoverId}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>insert alerts here</Typography>
                    </Popover>
                    <div id='user-profile-container'>
                        <FontAwesomeIcon id='user-profile-icon' icon={faCircleUser} />
                        <h3 id='user-profile-name'>User Name</h3>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;