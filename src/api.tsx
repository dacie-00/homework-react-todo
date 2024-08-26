import {Task} from "@/components/taskList/Task.tsx";


export const addTask = async (task) => {
    return fetch('http://localhost:3004/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(task => task)
}

export const getTasks = async () => {
    const response = await fetch("http://localhost:3004/tasks");

    return await response.json();
}

export const updateTask = (task: Task) => {
    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}

export const toggleTaskCompleted = (task: Task, state: boolean) => {
    let completed_at = 0;
    if (state) {
        completed_at = Date.now()
    }

    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "completed_at": completed_at }),
    })
}

export const deleteTask = async (task: Task) => {
    const response = await fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

export const getComments = async (task: Task) => {
    const response = await fetch("http://localhost:3004/comments?task_id=" + task.id);

    return await response.json();
}