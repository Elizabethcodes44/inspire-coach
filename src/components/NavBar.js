import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from '../assets/inspire-coach-logo.png';
import './NavBar.css';
import { APP_NAME, ROUTES, THEME_OPTIONS } from '../global';
import Switch from "react-switch";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button, Typography } from '@mui/material';

const EXCLUDE_ROUTES = ['home-page', 'view-task'];

const NavBar = ({ defaultTheme, onThemeChange }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(defaultTheme === THEME_OPTIONS.DARK);
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    return (
        <nav id='nav-bar'>
            <div id='nav-bar-app-logo-name-container'>
                <img id='nav-bar-app-logo' src={AppLogo} alt={`${APP_NAME} logo: pink ribbon with green checkmark`} />
                <a href={ROUTES.HOME_PAGE.route} id='nav-bar-app-name-link'><h1 id='nav-bar-app-name'>{APP_NAME}</h1></a>
            </div>
            <div id='nav-bar-links-container'>
                { Object.entries(ROUTES).map(([_, value]) => {
                    if (EXCLUDE_ROUTES.includes(value.id)) return null;
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
            </div>
            <div id='nav-bar-profile-container'>
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
        </nav>
    );
};

export default NavBar;