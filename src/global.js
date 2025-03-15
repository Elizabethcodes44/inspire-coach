import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';

export const APP_NAME = 'InspireCoach';

export const ROUTES = {
    HOME_PAGE: { 
        id: 'home-page',
        label: 'Home', 
        route: '/'
    },
    MANAGE_TASKS: { 
        id: 'manage-tasks',
        label: 'Manage Tasks', 
        route: '/manage-tasks'
    },
};

export const THEME_OPTIONS = {
    DARK: 'dark',
    LIGHT: 'light'
}

export const STATUSES = {
    ON_TRACK: {
        id: 'on-track',
        label: 'On Track',
        icon: <FontAwesomeIcon icon={faCircleCheck} />,
        color: 'var(--status-on-track)'
    },
    BEHIND: {
        id: 'behind',
        label: 'Behind',
        icon: <FontAwesomeIcon icon={faCircleExclamation} />,
        color: 'var(--status-behind)'
    },
    DUE_SOON: {
        id: 'due-soon',
        label: 'Due Soon',
        icon: <FontAwesomeIcon icon={faClock} />,
        color: 'var(--status-due-soon)'
    },
    OVERDUE: {
        id: 'overdue',
        label: 'Overdue',
        icon: <FontAwesomeIcon icon={faCircleExclamation} />,
        color: 'var(--status-overdue)'
    }
}
