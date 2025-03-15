import React, { useEffect, useState } from 'react';
import './TasksOverview.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import { STATUSES, ICONS } from '../global'; 
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
        percentageComplete: 66,
        steps: {
            1: {
                title: 'Lorem ipsum this is step 1',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 1',
                estimatedCompletionTime: '20 minutes',
                isCompleted: true,
                linkToImage: 'https://freerangestock.com/sample/180605/cooking-ingredients-arranged-on-a-wooden-board..jpg'
            },
            2: {
                title: 'Lorem ipsum this is step 2',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 2',
                estimatedCompletionTime: '1 hour',
                isCompleted: true,
                linkToImage: 'https://freerangestock.com/sample/69394/person-in-yellow-gloves-cooking-food-in-a-wok.jpg'
            },
            3: {
                title: 'Lorem ipsum this is step 3',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 3',
                estimatedCompletionTime: '30 minutes',
                isCompleted: false,
                linkToImage: 'https://cdn.stocksnap.io/img-thumbs/960w/bread-serve_08XLVPG7EY.jpg'
            }
        }
    },
    {
        id: '2',
        title: 'Lorem ipsum this is a mock task that is due soon',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.DUE_SOON,
        percentageComplete: 50,
        steps: {
            1: {
                title: 'Lorem ipsum this is step 1',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 1',
                estimatedCompletionTime: '2 days',
                isCompleted: true,
                linkToImage: 'https://live.staticflickr.com/3298/3658147194_14bd5e4567_b.jpg'
            },
            2: {
                title: 'Lorem ipsum this is step 2',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 2',
                estimatedCompletionTime: '4 weeks',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Young_Man_in_a_Interview.jpg'
            }
        }
    },
    {
        id: '3',
        title: 'Lorem ipsum this is a mock task that is behind',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.BEHIND,
        percentageComplete: 25,
        steps: {
            1: {
                title: 'Lorem ipsum this is step 1',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 1',
                estimatedCompletionTime: '3 hours',
                isCompleted: true,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            2: {
                title: 'Lorem ipsum this is step 2',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 2',
                estimatedCompletionTime: '1 hour',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            3: {
                title: 'Lorem ipsum this is step 3',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 3',
                estimatedCompletionTime: '10 days',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            4: {
                title: 'Lorem ipsum this is step 4',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 4',
                estimatedCompletionTime: '2.5 hours',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            }
        }
    },
    {
        id: '4',
        title: 'Lorem ipsum this is a mock task that is on track',
        startedDate: '2021-08-01',
        lastUpdatedDate: '2021-08-25',
        dueDate: '2021-09-01',
        status: STATUSES.ON_TRACK,
        percentageComplete: 50,
        steps: {
            1: {
                title: 'Lorem ipsum this is step 1',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 1',
                estimatedCompletionTime: '3 hours',
                isCompleted: true,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            2: {
                title: 'Lorem ipsum this is step 2',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 2',
                estimatedCompletionTime: '1 hour',
                isCompleted: true,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            3: {
                title: 'Lorem ipsum this is step 3',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 3',
                estimatedCompletionTime: '10 days',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            },
            4: {
                title: 'Lorem ipsum this is step 4',
                description: 'Lorem ipsum dolor emit orem ipsum dolor emit orem ipsum dolor emit and that is how you complete step 4',
                estimatedCompletionTime: '2.5 hours',
                isCompleted: false,
                linkToImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png'
            }
        }
    }
];

function TasksOverview() {
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
    }, [tasks]);

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
                                            size='large'
                                        />
                                    }
                                    label={
                                        <div className='tasks-overview-status-filter-label'>
                                            {ICONS[status.icon]} {status.label} ({taskStatusCounts[status.id]})
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