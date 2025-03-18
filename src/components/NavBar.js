import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppLogo from '../assets/inspire-coach-logo.png';
import './NavBar.css';
import { APP_NAME, ROUTES, THEME_OPTIONS, USER_ROLES, getUserFullName } from '../global';
import Switch from "react-switch";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button, Typography } from '@mui/material';
import { UserContext } from '../UserContext.js';

// const EXCLUDE_ROUTES = {
//     'student': ['home-page', 'view-task', 'coach-page', 'manage-users', 'view-user-tasks'],
//     'coach': ['home-page', 'view-task', 'coach-page', 'manage-tasks', 'view-user-tasks'],
// }

const NAVBAR_ROUTES = {
    [USER_ROLES.trainee]: [ROUTES.MANAGE_TASKS],
    [USER_ROLES.coach]: [ROUTES.MANAGE_TRAINEES]
}

const NavBar = ({ defaultTheme, onThemeChange }) => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

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

    const goToSignUp = () => {
        navigate(ROUTES.SIGN_UP.route);
    }

    const goToLogin = () => {
        navigate(ROUTES.LOGIN.route);
    }

    return (
        <nav id='nav-bar'>
            <div id='nav-bar-app-logo-name-container'>
                <img id='nav-bar-app-logo' src={AppLogo} alt={`${APP_NAME} logo: pink ribbon with green checkmark`} />
                <a href={ROUTES.HOME_PAGE.route} id='nav-bar-app-name-link'><h1 id='nav-bar-app-name'>{APP_NAME}</h1></a>
            </div>
            { user &&
                <div id='nav-bar-links-container'>
                    { Object.entries(ROUTES).map(([_, value]) => {
                        if (NAVBAR_ROUTES[user.role].includes(value.id)) {
                            return (
                                <NavLink 
                                    key={`nav-link-${value.id}`}  
                                    to={value.route} 
                                    exact='true'
                                    className={({ isActive }) => `nav-bar-link ${isActive ? 'nav-link-active' : ''}`}>
                                    {value.label}
                                </NavLink>
                            );
                        }
                        else {
                            return null;
                        }
                    })}
                </div>
            }
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
                { user &&
                    <>
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
                            <h3 id='user-profile-name'>{getUserFullName(user)}</h3>
                        </div>
                    </>
                }
                { !user && 
                    <>
                        <Button id='sign-up-btn' className='auth-btn' onClick={goToSignUp}>Sign Up</Button>
                        <Button id='login-btn' className='auth-btn' onClick={goToLogin}>Login</Button>
                    </>
                }
            </div>
        </nav>
    );
};

export default NavBar;