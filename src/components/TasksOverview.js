import React, { useEffect, useState } from 'react';
import './TasksOverview.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import { STATUSES } from '../global'; 
import TasksOverviewItem from './TasksOverviewItem';

// TODO: REMOVE THIS LINE AND PULL FROM DB
const PLACEHOLDER_TASKS = [
    {
        id: '1',
        title: 'Lorem ipsum this is a mock task that is overdue',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-20',
        dueDate: '2021-08-15',
        status: STATUSES.OVERDUE,
        percentageComplete: 80
    },
    {
        id: '2',
        title: 'Lorem ipsum this is a mock task that is due soon',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.DUE_SOON,
        percentageComplete: 70
    },
    {
        id: '1',
        title: 'Lorem ipsum this is a mock task that is behind',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.BEHIND,
        percentageComplete: 40
    },
    {
        id: '1',
        title: 'Lorem ipsum this is a mock task that is on track',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.ON_TRACK,
        percentageComplete: 50
    }
];

function TasksOverview({  }) {
    const [tasks, setTasks] = useState([]);
    const [taskStatusCounts, setTaskStatusCounts] = useState({});
    const [statusFilters, setStatusFilters] = useState(Object.entries(STATUSES).map(([_, status]) => status.id));

    const getTaskStatusCounts = (tasks) => {
        let counts = Object.fromEntries(Object.entries(STATUSES).map(([_, status]) => [status.id, 0]));

        tasks.forEach((task) => {
            counts[task.status.id] += 1;
        });

        setTaskStatusCounts(counts);
    }

    const handleFilterChange = (statusId) => {
        if (statusFilters.includes(statusId)) {
            setStatusFilters(statusFilters.filter((status) => status !== statusId));
        } else {
            setStatusFilters([...statusFilters, statusId]);
        }
    }

    const isFilterSelected = (statusId) => {
        return statusFilters.includes(statusId);
    }

    useEffect(() => {
        // TODO - pull tasks from DB & order by status
        setTasks(PLACEHOLDER_TASKS);
        getTaskStatusCounts(PLACEHOLDER_TASKS);
    }, [STATUSES, tasks]);

    return (
        <div id='tasks-overview-container-bg'>
            <div id='tasks-overview-container'>
                <h2 id='tasks-overview-title'>My Tasks</h2>
                <div id='tasks-overview-status-filters-container'>
                    <div id='tasks-overview-status-filters'>
                        <h3 id='tasks-overview-status-filters-title'>Filters:</h3>
                        { Object.entries(STATUSES).map(([id, status]) => {
                            return (
                                <FormControlLabel
                                    key={`tasks-overview-form-control-label-${id}`}
                                    control={
                                        <Checkbox 
                                            key={`tasks-overview-status-filter-${id}`}
                                            className='tasks-overview-status-filter'
                                            aria-label={`Filter by status ${status.label}, ${isFilterSelected(status.id) ? 'selected' : 'not selected'}, ${taskStatusCounts[status.id]} task${taskStatusCounts[status.id] === 1 ? '' : 's'}`}
                                            sx={{ fontSize: 'var(--default-font-size)', textTransform: 'none', margin: '0 20px' }}
                                            checked={isFilterSelected(status.id)}
                                            onChange={() => handleFilterChange(status.id)}
                                        />
                                    }
                                    label={
                                        <div className='tasks-overview-status-filter-label'>
                                            {status.icon} {status.label} ({taskStatusCounts[status.id]})
                                        </div>
                                    }
                                    sx={{ color: status.color}}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className='tasks-overview-task-items-container'>
                    { tasks.filter((task) => isFilterSelected(task.status.id)).map((task, idx) => {
                        return (
                            <TasksOverviewItem key={`tasks-overview-task-item-${idx}`} idx={idx + 1} task={task} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TasksOverview;