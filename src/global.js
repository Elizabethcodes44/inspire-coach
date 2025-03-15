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
    VIEW_TASK: { 
        id: 'view-task',
        label: 'View Task',
        route: '/view-task/:id'
    },
};

export const THEME_OPTIONS = {
    DARK: 'dark',
    LIGHT: 'light'
}

export const ICONS = {
    faCircleCheck: <FontAwesomeIcon icon={faCircleCheck} />,
    faCircleExclamation: <FontAwesomeIcon icon={faCircleExclamation} />,
    faClock: <FontAwesomeIcon icon={faClock} />
}

export const STATUSES = {
    ON_TRACK: {
        id: 'on-track',
        label: 'On Track',
        icon: 'faCircleCheck',
        color: 'var(--status-on-track)'
    },
    BEHIND: {
        id: 'behind',
        label: 'Behind',
        icon: 'faCircleExclamation',
        color: 'var(--status-behind)'
    },
    DUE_SOON: {
        id: 'due-soon',
        label: 'Due Soon',
        icon: 'faClock',
        color: 'var(--status-due-soon)'
    },
    OVERDUE: {
        id: 'overdue',
        label: 'Overdue',
        icon: 'faCircleExclamation',
        color: 'var(--status-overdue)'
    }
}
