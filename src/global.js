import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookie from 'universal-cookie';

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
    COACH_PAGE: { 
        id: 'coach-page',
        label: 'Coach', 
        route: '/coach'
    },
    MANAGE_USERS: { 
        id: 'manage-users',
        label: 'Manage Mentees',
        route: '/manage-user/'
    },
    VIEW_USER_TASKS: {
        id: 'view-user-tasks',
        label: 'View User Tasks',
        route: '/coach/view-user-tasks/:userid'
    }
};

export const USER_TYPES = {
    student: 'student',
    coach: 'coach'
}

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

export const getNumSteps = (task) => {
    return Object.keys(task.steps).length;
}

export const getNumStepsCompleted = (task) => {
    let numStepsCompleted = 0;

    Object.entries(task.steps).forEach(([_, step]) => {
        if (step.isCompleted) {
            numStepsCompleted++;
        }
    });

    return numStepsCompleted;
}

export const getEstimatedTimeCompleted = (task) => {
    let estimatedTimeCompleted = 0;

    Object.entries(task.steps).forEach(([_, step]) => {
        if (step.isCompleted) {
            estimatedTimeCompleted += step.estimatedCompletionTime;
        }
    });

    return estimatedTimeCompleted;
}

export const getTotalEstimatedTime = (task) => {
    let totalEstimatedTime = 0;

    Object.entries(task.steps).forEach(([_, step]) => {
        totalEstimatedTime += step.estimatedCompletionTime;
    });

    return totalEstimatedTime;
}

export const getTaskCompletionPercentage = (completedTime, totalTime) => {
    // completion percentage is based on estimated time to complete all tasks (not number of steps)
    return Math.round((completedTime / totalTime) * 100);
}

export const convertTime = (timeInMins) => {
    const hours = Math.floor(timeInMins / 60);
    const mins = timeInMins % 60;
    return `${hours > 0 ? hours + ` hour${hours > 1 ? 's' : ''}` : ''} ${mins > 0 ? mins + ` minute${mins > 1 ? 's' : ''}` : ''}`;
}

export const getUserFullName = (user) => {
    return user.firstName + ' ' + user.lastName;
}

export const getNumTasksWithStatus = (tasks, status) => {
    let numTasksWithStatus = 0;

    tasks.forEach((task) => {
        if (task.status.id === status) {
            numTasksWithStatus++;
        }
    });

    return numTasksWithStatus;
}

export async function getAzureSpeechTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');

    if (speechToken === undefined) {
        const speechKey = process.env.REACT_APP_SPEECH_KEY;
        const speechRegion = process.env.REACT_APP_SPEECH_REGION;
        
        const headers = {
            'Ocp-Apim-Subscription-Key': speechKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        try {
            const tokenResponse = await axios.post(
                `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
                null,
                { headers }
            );
            const token = tokenResponse.data;
            cookie.set('speech-token', speechRegion + ':' + token, {maxAge: 540, path: '/'});
            return { authToken: token, region: speechRegion };
        } catch (err) {
            throw new Error('There was an error authorizing your speech key.');
        }
    } else {
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
    }
}
